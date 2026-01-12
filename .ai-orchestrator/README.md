# AI Orchestrator

Hierarchical LLM orchestration system that optimizes costs by using smart models (Codex/Opus) for planning and cheap models (GLM 4.7) for execution.

## 🎯 Purpose

Stretch your AI coding budget by:
- Using **GPT-5.1-Codex-Max** for strategic planning and decision-making
- Delegating routine work to **GLM 4.7** (10x cheaper)
- Coordinating everything through **Vibe Kanban** via MCP

## 📋 Features

- **Task Classification**: Automatically analyzes complexity (1-5 scale)
- **Smart Delegation**: Routes tasks to appropriate models
- **Task Breakdown**: Decomposes complex work into subtasks
- **Vibe Kanban Integration**: Creates and manages tasks via MCP
- **GLM Workers**: Automated workers that claim and execute tasks
- **Quality Control**: Codex reviews all GLM outputs

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd .ai-orchestrator
npm install
```

### 2. Configure Vibe Kanban MCP

Make sure Vibe Kanban MCP is configured in your Claude/MCP config:

```json
{
  "mcpServers": {
    "vibe-kanban": {
      "command": "npx",
      "args": ["-y", "vibe-kanban@latest", "--mcp"]
    }
  }
}
```

### 3. Use the Orchestrator

```bash
# Create a new task (analyze and delegate)
npm run orchestrate "Add user authentication to the app"

# Create and auto-start tasks
npm run orchestrate "Implement user profile page" --auto-start

# Check task status
npm run status
```

### 4. Start GLM Workers

```bash
# Start a GLM worker (in a separate terminal)
npm run worker
```

## 📊 How It Works

### Task Classification

```
Complexity 1-2 → GLM 4.7 (simple, well-defined)
Complexity 3-4 → Codex (medium complexity)
Complexity 5   → Opus Pro (architecture, security)
```

### Example Workflow

```
You: "Add user authentication with login, registration, and password reset"

↓ Codex analyzes (complexity: 4/5)

↓ Creates 5 tasks in Vibe Kanban:
  1. Set up database schema (GLM)
  2. Registration endpoint (GLM)
  3. Login endpoint (GLM)
  4. Password reset flow (GLM)
  5. Security review (Codex)

↓ GLM workers claim tasks 1-4

↓ Codex reviews outputs

↓ You approve final results
```

## 🎨 Usage Examples

### Example 1: Simple Task

```bash
npm run orchestrate "Write unit tests for the auth module"
```

**Result:** Creates 1 GLM task for writing tests.

### Example 2: Medium Complexity

```bash
npm run orchestrate "Add user profile page with avatar upload"
```

**Result:** Creates 3-4 tasks mixed between GLM and Codex.

### Example 3: Complex Feature

```bash
npm run orchestrate "Implement real-time chat with WebSocket and online status"
```

**Result:** Creates 5-7 tasks with Codex handling architecture and GLM handling implementation.

## 📁 Project Structure

```
.ai-orchestrator/
├── orchestrator/
│   ├── index.ts           # Main orchestrator
│   ├── classifier.ts      # Task classification
│   ├── task-generator.ts  # Task breakdown
│   └── mcp-client.ts      # Vibe Kanban wrapper
├── workers/
│   └── glm-worker.ts      # GLM worker loop
├── config/
│   └── settings.ts        # Configuration & prompts
├── types/
│   └── index.d.ts         # TypeScript definitions
└── package.json
```

## ⚙️ Configuration

### Environment Variables

```bash
# Optional: Set Vibe Kanban project ID
export VIBE_KANBAN_PROJECT_ID="your-project-id"

# Optional: Override model settings
export ORCHESTRATOR_MODEL="gpt-5.1-codex-max"
export WORKER_MODEL="glm-4.7"
```

### Worker Configuration

Edit `config/settings.ts` to customize:

```typescript
export const DEFAULT_WORKER_CONFIG = {
  model: 'glm',
  pollingInterval: 5000,      // Check for tasks every 5 seconds
  maxConcurrentTasks: 1,      // Only work on 1 task at a time
};
```

## 🔧 Development

### Build

```bash
npm run build
```

### Run with TypeScript

```bash
npm run dev
```

## 📈 Cost Savings

### Without Orchestrator
- All tasks: GPT-5.1-Codex-Max ($$$)
- 100 tasks × $0.50 = **$50**

### With Orchestrator
- Planning (10%): Codex = $5
- Execution (70%): GLM = $7
- Review (20%): Codex = $10
- **Total: $22 (56% savings)**

## 🚦 Roadmap

- [ ] Real GLM API integration (currently simulated)
- [ ] Multi-worker parallelization
- [ ] Metrics and cost tracking dashboard
- [ ] Automatic retry on failures
- [ ] Integration with other MCP servers
- [ ] Web UI for task monitoring

## 🤝 Contributing

This is a prototype. Contributions welcome!

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Vibe Kanban](https://www.vibekanban.com/)
- Uses Model Context Protocol (MCP)
- Inspired by hierarchical agent systems
