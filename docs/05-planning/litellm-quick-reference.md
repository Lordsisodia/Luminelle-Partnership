# LiteLLM Quick Reference

## NPM Scripts

```bash
# Start the proxy
npm run litellm:proxy:start

# Stop the proxy
npm run litellm:proxy:stop

# Check status
npm run litellm:proxy:status

# Update config from .env.litellm
npm run litellm:config
```

## Setup Steps

### 1. Add Your API Keys

Create `.env.litellm` from the example:

```bash
cp .env.litellm.example .env.litellm
```

Edit `.env.litellm` and add your GLM API keys:

```bash
GLM_API_KEY_1=sk-your-first-key-here
GLM_API_KEY_2=sk-your-second-key-here
GLM_API_KEY_3=sk-your-third-key-here
```

### 2. Generate Config

```bash
npm run litellm:config
```

### 3. Start Proxy

```bash
npm run litellm:proxy:start
```

## Proxy Endpoints

| Endpoint | Description |
|----------|-------------|
| `http://localhost:4000/v1/chat/completions` | Chat completions |
| `http://localhost:4000/v1/completions` | Text completions |
| `http://localhost:4000/health` | Health check |
| `http://localhost:4000/model/list` | List available models |

## Request Format

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer anything" \
  -d '{
    "model": "glm-pool",
    "messages": [{"role": "user", "content": "Your prompt here"}]
  }'
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Proxy not starting | Check port 4000: `lsof -i :4000` |
| Rate limit errors | Add more API keys to `.env.litellm` |
| Connection refused | Check proxy is running: `npm run litellm:proxy:status` |
| View logs | `tail -f .litellm-proxy.log` |
