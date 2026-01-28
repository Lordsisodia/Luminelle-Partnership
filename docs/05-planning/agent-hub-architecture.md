# Lumelle Agent Hub Architecture

## Overview

A hybrid multi-agent orchestration system combining the best elements of LiteLLM, LangGraph, CrewAI, and AutoGen.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LITELLM PROXY                           │
│  (Load Balancer: 2x GLM Plans + Gemini + other providers)       │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR AGENT                         │
│  (GLM-4.7 Plan 1 - Primary "Smart" Model)                       │
│  - Task decomposition                                           │
│  - Agent coordination                                           │
│  - State management                                             │
│  - Decision routing                                             │
└─────────────────────────────────────────────────────────────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                ▼                 ▼                 ▼
    ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
    │  CODING AGENT │  │ RESEARCH AGENT│  │  TEST AGENT   │
    │  (GLM-4.7)    │  │   (Gemini)    │  │  (GLM-4.7)    │
    │               │  │               │  │               │
    │ - Write code  │  │ - Search web  │  │ - Run tests   │
    │ - Debug       │  │ - Analyze     │  │ - Validate    │
    │ - Refactor    │  │ - Document    │  │ - Report      │
    └───────────────┘  └───────────────┘  └───────────────┘
                │                 │                 │
                └─────────────────┼─────────────────┘
                                  ▼
                    ┌─────────────────────────┐
                    │     MESSAGE BUS         │
                    │  (Event Communication)  │
                    └─────────────────────────┘
```

## Component Design

### 1. LiteLLM Proxy Layer

**Purpose:** Centralized API key management and load balancing

**Configuration:**
```yaml
# litellm-config-agents.yaml
model_list:
  # Orchestrator pool (GLM Plan 1)
  - model_name: orchestrator
    litellm_params:
      model: openai/glm-4
      api_key: GLM_PLAN_1_KEY

  # Worker pool (GLM Plan 2 + additional keys)
  - model_name: worker
    litellm_params:
      model: openai/glm-4
      api_key: GLM_PLAN_2_KEY_1

  - model_name: worker
    litellm_params:
      model: openai/glm-4
      api_key: GLM_PLAN_2_KEY_2

  # Gemini for research/vision tasks
  - model_name: researcher
    litellm_params:
      model: openai/gemini-2.0-flash-exp
      api_key: GEMINI_API_KEY

router_settings:
  routing_strategy: "usage-based-routing"
  num_retries: 3
  cooldown_time: 60
```

### 2. Orchestrator Agent

**Responsibilities:**
- Receive user tasks
- Decompose complex tasks into subtasks
- Route subtasks to appropriate worker agents
- Aggregate results
- Manage conversation state
- Handle errors and retries

**System Prompt:**
```
You are the Orchestrator. Your role is to:
1. Understand the user's goal
2. Break down complex tasks into subtasks
3. Delegate subtasks to specialist agents
4. Coordinate agent execution
5. Aggregate and present results

Available Agents:
- CODING: Write, debug, and refactor code
- RESEARCH: Search, analyze, and document information
- TEST: Write and run tests, validate functionality
- REVIEW: Review code for quality, security, and best practices

When delegating, use the format:
AGENT: <agent_name>
TASK: <clear_description>
CONTEXT: <relevant_information>

After delegation, wait for agent results before proceeding.
```

### 3. Worker Agents

Each worker agent has:
- **Specialization** - Domain expertise
- **Model assignment** - Optimized for their task
- **System prompt** - Tailored instructions
- **Tools** - Domain-specific capabilities

#### Coding Agent
```
Model: GLM-4.7
Focus: Implementation, debugging, refactoring
Tools: File operations, code execution, git
```

#### Research Agent
```
Model: Gemini 2.0 Flash (multimodal)
Focus: Information gathering, analysis, documentation
Tools: Web search, file reading, context analysis
```

#### Test Agent
```
Model: GLM-4.7
Focus: Testing, validation, quality assurance
Tools: Test runners, assertion libraries, coverage
```

### 4. Message Bus

**Purpose:** Event-driven communication between agents

**Features:**
- Request/response pattern
- Broadcast notifications
- State synchronization
- Error propagation

**Implementation:**
```typescript
interface AgentMessage {
  from: string;
  to: string;
  type: 'request' | 'response' | 'broadcast' | 'error';
  task: Task;
  result?: any;
  error?: Error;
}

class MessageBus {
  private agents: Map<string, Agent>;
  private middleware: Middleware[];

  async send(message: AgentMessage): Promise<AgentMessage>;
  subscribe(agent: Agent): void;
  broadcast(message: AgentMessage): void;
}
```

## Task Execution Flow

### 1. Simple Task (Single Agent)
```
User → Orchestrator → Direct to Agent → Response
```

### 2. Complex Task (Multi-Agent)
```
User
  ↓
Orchestrator (decompose task)
  ↓
├─→ Coding Agent (implement feature)
├─→ Test Agent (write tests)
└─→ Review Agent (validate)
  ↓
Orchestrator (aggregate results)
  ↓
User
```

### 3. Parallel Task
```
User
  ↓
Orchestrator (identify parallel subtasks)
  ↓
├─→ Agent A (subtask 1) ─┐
├─→ Agent B (subtask 2) ─┤→ Wait for all
└─→ Agent C (subtask 3) ─┘
  ↓
Orchestrator (combine results)
  ↓
User
```

## Implementation Strategy

### Phase 1: Core Infrastructure (Current)
- [x] LiteLLM proxy setup
- [ ] Agent base class and message types
- [ ] Message bus implementation
- [ ] Orchestrator skeleton

### Phase 2: Worker Agents
- [ ] Coding agent implementation
- [ ] Research agent implementation
- [ ] Test agent implementation
- [ ] Review agent implementation

### Phase 3: Integration
- [ ] Tool integration (file ops, git, etc.)
- [ ] State management
- [ ] Error handling and retry logic
- [ ] Usage monitoring

### Phase 4: Optimization
- [ ] Caching strategies
- [ ] Parallel execution
- [ ] Cost tracking
- [ ] Performance tuning

## File Structure

```
src/agents/
├── core/
│   ├── types.ts              # Agent message types, task types
│   ├── message-bus.ts        # Message bus implementation
│   ├── agent.ts              # Base agent class
│   └── orchestrator.ts       # Main orchestrator
├── workers/
│   ├── coding-agent.ts       # Coding specialist
│   ├── research-agent.ts     # Research specialist
│   ├── test-agent.ts         # Testing specialist
│   └── review-agent.ts       # Review specialist
├── tools/
│   ├── file-operations.ts    # File read/write tools
│   ├── git-operations.ts     # Git integration
│   ├── web-search.ts         # Web search tools
│   └── code-execution.ts     # Code execution
├── utils/
│   ├── llm-client.ts         # LiteLLM client wrapper
│   ├── state-manager.ts      # Conversation state
│   └── logger.ts             # Structured logging
└── config/
    ├── agents.yaml           # Agent configurations
    └── prompts.ts            # System prompts
```

## API Key Distribution

**GLM Plan 1 ($30):**
- Orchestrator: Primary usage
- Backup for critical worker tasks

**GLM Plan 2 ($30):**
- Coding agent: ~40%
- Test agent: ~30%
- Review agent: ~30%

**Gemini:**
- Research agent: Primary
- Multimodal tasks (images, documents)
- Fallback for other agents

**Future Providers:**
- Can be easily added to LiteLLM config
- Assign to appropriate agents based on capabilities

## Next Steps

1. **Update LiteLLM config** for multi-model setup
2. **Create agent framework** in `src/agents/`
3. **Implement orchestrator** with basic routing
4. **Create first worker agent** (Coding agent)
5. **Test end-to-end flow**
6. **Add remaining workers** one at a time

## Usage Example

```bash
# Start LiteLLM proxy with agent config
npm run litellm:proxy:start

# Run a task
npm run agent:exec -- "Add user authentication to the checkout flow"

# The orchestrator will:
# 1. Break down the task
# 2. Delegate to coding agent for implementation
# 3. Delegate to test agent for tests
# 4. Delegate to review agent for validation
# 5. Return aggregated results
```
