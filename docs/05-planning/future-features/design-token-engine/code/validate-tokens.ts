// Token validation helper (not wired). Uses ajv to validate tokens JSON against tokens.schema.json.
import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const TOKENS_PATH = process.env.TOKENS_PATH || 'src/theme/tokens.json'
const SCHEMA_PATH = process.env.TOKENS_SCHEMA || 'src/theme/tokens.schema.json'

function main() {
  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'))
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'))
  const validate = ajv.compile(schema)
  const ok = validate(tokens)
  if (!ok) {
    console.error('Token validation failed:')
    console.error(validate.errors)
    process.exit(1)
  }
  console.log('Token file is valid.')
}

if (require.main === module) main()

export {}
