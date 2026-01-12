import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { build } from 'esbuild'

/**
 * Vite plugin to serve API routes during development.
 * This allows Netlify Functions in /api to work in development.
 */
export function apiRoutes(): Plugin {
  const transpiledCache = new Map<string, any>()

  return {
    name: 'api-routes',
    configureServer(server) {
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
              bundle: false,
              format: 'esm',
              target: 'node18',
              outfile: tempOutPath,
              platform: 'node',
              write: true,
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
          const request = new Request(urlPath, {
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
