# LiteLLM Setup Guide

## Overview

LiteLLM is configured to load balance multiple GLM (XZAI) API keys, allowing you to bypass rate limits and increase concurrency for your AI-powered features.

## Quick Start

### 1. Configure Your API Keys

Edit `litellm-config.yaml` and add your GLM API keys:

```yaml
model_list:
  - model_name: glm-pool
    litellm_params:
      model: openai/glm-4
      api_key: YOUR_GLM_API_KEY_1
      api_base: "https://api.z.ai/v1"

  - model_name: glm-pool
    litellm_params:
      model: openai/glm-4
      api_key: YOUR_GLM_API_KEY_2
      api_base: "https://api.z.ai/v1"

  # Add more keys as needed...
```

### 2. Start the Proxy

```bash
# Start the proxy
./scripts/start-litellm-proxy.sh start

# Check status
./scripts/start-litellm-proxy.sh status

# Stop the proxy
./scripts/start-litellm-proxy.sh stop
```

The proxy will run on `http://localhost:4000` by default.

### 3. Use the Proxy

#### With cURL:

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer anything" \
  -d '{
    "model": "glm-pool",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

#### With JavaScript/TypeScript:

```typescript
const response = await fetch('http://localhost:4000/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer anything'
  },
  body: JSON.stringify({
    model: 'glm-pool',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const data = await response.json();
```

#### With Python:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000/v1",
    api_key="anything"  # LiteLLM doesn't require a real key
)

response = client.chat.completions.create(
    model="glm-pool",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

#### With Claude Code:

Set the environment variable before starting Claude Code:

```bash
export ANTHROPIC_API_BASE=http://localhost:4000
export ANTHROPIC_API_KEY=anything
claude
```

## How It Works

### Load Balancing Strategy

The proxy uses **round-robin** routing by default, which:
- Distributes requests evenly across all configured API keys
- Automatically retries failed requests with different keys
- Puts keys on cooldown when they hit rate limits (60 seconds default)

### Key Features

1. **Automatic Failover**: If one key hits a rate limit, the request is automatically retried with another key
2. **Usage Tracking**: Monitor which keys are being used most heavily
3. **Cooldown Period**: Rate-limited keys are temporarily removed from the pool
4. **Detailed Logging**: All requests and errors are logged to `.litellm-proxy.log`

## Configuration Options

### Router Settings

Edit `litellm-config.yaml` to customize behavior:

```yaml
router_settings:
  # Options: round-robin, usage-based-routing, least-connections
  routing_strategy: "round-robin"

  # Number of retries for failed requests
  num_retries: 3

  # Cooldown time (seconds) when a key hits rate limits
  cooldown_time: 60

  # Request timeout (seconds)
  request_timeout: 300
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LITELLM_PORT` | Port for the proxy | `4000` |
| `LITELLM_PROXY_URL` | Proxy URL | `http://localhost:4000` |

## Troubleshooting

### Proxy won't start

1. Check if port 4000 is already in use:
   ```bash
   lsof -i :4000
   ```

2. Check the logs:
   ```bash
   tail -f .litellm-proxy.log
   ```

### Rate limit errors

1. Verify your API keys are valid in `litellm-config.yaml`
2. Increase the `cooldown_time` in router settings
3. Add more API keys to the pool

### Connection refused

1. Ensure the proxy is running:
   ```bash
   ./scripts/start-litellm-proxy.sh status
   ```

2. Check the proxy is accessible:
   ```bash
   curl http://localhost:4000/health
   ```

## Adding More API Keys

1. Get additional GLM API keys from [XZAI](https://z.ai)
2. Add them to `litellm-config.yaml`:

```yaml
model_list:
  - model_name: glm-pool
    litellm_params:
      model: openai/glm-4
      api_key: NEW_API_KEY_HERE
      api_base: "https://api.z.ai/v1"
```

3. Restart the proxy:
   ```bash
   ./scripts/start-litellm-proxy.sh restart
   ```

## Production Deployment

For production, consider:

1. **Use a process manager** like PM2 or systemd to keep the proxy running
2. **Set up a database** for virtual keys and usage tracking
3. **Enable caching** to reduce API calls
4. **Use HTTPS** with a reverse proxy (nginx, Caddy)
5. **Monitor usage** with the LiteLLM dashboard

## Resources

- [LiteLLM Documentation](https://docs.litellm.ai/)
- [GLM API Documentation](https://github.com/THUDM/GLM-4)
- [XZAI Platform](https://z.ai)
