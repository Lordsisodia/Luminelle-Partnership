import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { build } from 'esbuild'

// Load environment variables from .env file
const loadEnv = () => {
  try {
    const envPath = join(process.cwd(), '.env')
    const envContent = readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=')
      const value = valueParts.join('=').trim()
      if (key && value && !key.startsWith('#')) {
        process.env[key] = value
      }
    })
    console.log('[API Routes] Loaded environment variables, SHOPIFY_STORE_DOMAIN:', process.env.SHOPIFY_STORE_DOMAIN?.substring(0, 20))
  } catch (err) {
    console.log('[API Routes] Failed to load .env:', err)
    // .env file not found, ignore
  }
}

/**
 * Vite plugin to serve API routes during development.
 * This allows Netlify Functions in /api to work in development.
 */
export function apiRoutes(): Plugin {
  const transpiledCache = new Map<string, any>()

  return {
    name: 'api-routes',
    configureServer(server) {
      // Load environment variables for API routes
      loadEnv()

      server.middlewares.use(async (req, res, next) => {
        // Only handle API requests
        if (!req.url?.startsWith('/api/')) {
          return next()
        }

        // Build the file path from the URL
        // /api/storefront/cart/add-lines -> api/storefront/cart/add-lines.ts
        const urlPath = req.url!
        const fsPath = join(process.cwd(), urlPath + '.ts')

        // Check if the API file exists
        if (!existsSync(fsPath)) {
          res.statusCode = 404
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'Not Found', path: urlPath }))
          return
        }

        try {
          // Transpile and load the API route handler
          let handlerModule = transpiledCache.get(fsPath)

          if (!handlerModule) {
            // Transpile TypeScript to JavaScript on-the-fly
            const tempOutPath = fsPath + '.js'
            await build({
              entryPoints: [fsPath],
              bundle: true,
              format: 'esm',
              target: 'node18',
              outfile: tempOutPath,
              platform: 'node',
              write: true,
              external: ['node:*'],
              define: {
                'process.env.SHOPIFY_API_VERSION': JSON.stringify(process.env.SHOPIFY_API_VERSION || '2025-10'),
                'process.env.SHOPIFY_STORE_DOMAIN': JSON.stringify(process.env.SHOPIFY_STORE_DOMAIN || ''),
                'process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN': JSON.stringify(process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || ''),
                'process.env.VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN': JSON.stringify(process.env.VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN || ''),
              },
            })

            // Import the transpiled module
            const moduleUrl = `file://${tempOutPath}?t=${Date.now()}`
            handlerModule = await import(moduleUrl)
            transpiledCache.set(fsPath, handlerModule)
          }

          if (!handlerModule.default || typeof handlerModule.default !== 'function') {
            res.statusCode = 500
          res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid API handler' }))
            return
          }

          // Create a Request object from the Node.js req
          const requestBody = await getRequestJson(req)
          const origin = req.headers.origin || `http://${req.headers.host}`
          const fullUrl = new URL(urlPath, origin)
          const request = new Request(fullUrl.toString(), {
            method: req.method,
            headers: req.headers as any,
            body: req.method !== 'GET' && req.method !== 'HEAD'
              ? JSON.stringify(requestBody)
              : undefined,
          })

          // Call the API handler
          const response = await handlerModule.default(request)

          // Send the response
          const responseData = await response.text()
          res.statusCode = response.status
          ;(response.headers as any).forEach((value: string, key: string) => {
            res.setHeader(key, value)
          })
          res.end(responseData)
        } catch (error) {
          console.error('API route error:', error)
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
          }))
        }
      })
    },
  }
}

async function getRequestJson(req: any): Promise<any> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk: any) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}
