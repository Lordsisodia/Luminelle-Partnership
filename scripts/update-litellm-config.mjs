#!/usr/bin/env node
/**
 * Update LiteLLM config from environment variables
 * Run this script after adding API keys to .env.litellm
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Read environment variables from .env.litellm
function loadEnv() {
  const envPath = resolve(projectRoot, '.env.litellm');
  try {
    const content = readFileSync(envPath, 'utf-8');
    const env = {};
    for (const line of content.split('\n')) {
      const match = line.match(/^([^#][^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        env[key.trim()] = value.trim();
      }
    }
    return env;
  } catch (error) {
    console.error('Error reading .env.litellm:', error.message);
    return {};
  }
}

// Generate LiteLLM config
function generateConfig(env) {
  const keys = [];

  // Collect all GLM_API_KEY_* values
  let index = 1;
  while (env[`GLM_API_KEY_${index}`]) {
    const key = env[`GLM_API_KEY_${index}`];
    if (key && key !== 'your_glm_api_key_here' && !key.startsWith('your_')) {
      keys.push(key);
    }
    index++;
  }

  if (keys.length === 0) {
    console.error('No valid GLM API keys found in .env.litellm');
    console.error('Add your keys with the format: GLM_API_KEY_1=your_key_here');
    process.exit(1);
  }

  console.log(`Found ${keys.length} GLM API key(s)`);

  // Generate the model_list configuration
  const modelList = keys.map((key, i) => `
  - model_name: glm-pool
    litellm_params:
      model: openai/glm-4
      api_key: ${key}
      api_base: "https://api.z.ai/v1"`).join('\n');

  const config = `# LiteLLM Configuration for GLM API Load Balancing
# Auto-generated from .env.litellm - DO NOT EDIT MANUALLY
# Run: node scripts/update-litellm-config.mjs to regenerate

model_list:${modelList}

router_settings:
  # Round-robin distributes requests evenly across all keys
  routing_strategy: "round-robin"

  # Enable pre-call checks to detect rate limits before making requests
  enable_pre_call_checks: true

  # Retry failed requests with different keys
  num_retries: 3

  # Cooldown period (seconds) when a key hits rate limits
  cooldown_time: 60

  # Set timeouts (in seconds)
  request_timeout: 300
  max_timeout: 600

litellm_settings:
  # Drop parameters that GLM doesn't support
  drop_params: true

  # Set to true to see detailed logs
  set_verbose: false

  # Cache responses to reduce API calls (optional)
  cache: false

  # Enable usage tracking to see which keys are being used
  track_usage: true
`;

  return config;
}

// Main execution
const env = loadEnv();
const config = generateConfig(env);

const configPath = resolve(projectRoot, 'litellm-config.yaml');
writeFileSync(configPath, config);

console.log(`✓ Updated ${configPath}`);
console.log(`\nNext steps:`);
console.log(`  1. Review the configuration: cat litellm-config.yaml`);
console.log(`  2. Start the proxy: ./scripts/start-litellm-proxy.sh start`);
