# Self-Directing Agent System - Research & Recommendations

## Your Objective (Clarified)

**A Living Codebase with Self-Directing Agents:**

1. **Always a task list** - Agents continuously add, track, and complete tasks
2. **You work alongside** - Manual tasks, error fixing, architecture decisions
3. **Agents know what to do next** - When queue empty, figure out next steps autonomously
4. **Project awareness** - Always know current state of the living codebase
5. **First principles thinking** - Use "think loops" to determine direction

---

## Research Findings - What Exists in 2026

### Production-Ready Frameworks

| Framework | Maturity | Autonomous Capabilities | Best For |
|-----------|----------|------------------------|----------|
| **LangGraph** | High | Cyclic workflows, state machines, multi-agent orchestration | Complex workflows with loops and state persistence |
| **CrewAI** | High | Autonomous crews, task delegation, role-based collaboration | Teams of specialists working together |
| **AutoGen** | High | Conversational agents, human-in-the-loop, multi-agent dialog | Agent-to-agent communication patterns |
| **Pydantic AI** | Medium | Type-safe agents, structured outputs | Production codebases requiring type safety |

### Autonomous Software Engineer Systems

| System | Status | Key Capability | Production Ready? |
|--------|--------|----------------|-------------------|
| **SWE-agent** | Open Source | Takes GitHub issues → returns PRs | ✅ Yes (74% success rate) |
| **OpenDevin** | Open Source | End-to-end engineering tasks | ⚠️ Experimental |
| **Devin** | Commercial | First AI software engineer | 💰 Paid service |

### Self-Improving Patterns

| Pattern | Description | Status |
|---------|-------------|--------|
| **Think-Act-Learn** | Iterative loop: plan → execute → evaluate | Academic (arXiv 2025) |
| **Agent Loop** | Plan, act, observe, update | Well-documented |
| **Evolutionary Agents** | Self-improving through cycles | Emerging (EVOSEAL) |

---

## What Matches Your Needs

### Your Requirements vs. Available Solutions

| Your Need | Best Match | Why |
|-----------|------------|-----|
| Continuous task queue | **CrewAI** | Built-in task management and delegation |
| Agents figure out next steps | **LangGraph** | Cyclic workflows can implement "what's next" loops |
| Project state awareness | **Custom + LangGraph** | Need to build state layer on top |
| First principles thinking | **Custom** | Not built into any framework |
| Multi-model optimization | **LiteLLM + Custom** | Load balancing exists, routing logic needs build |
| Living codebase evolution | **SWE-agent pattern** | Issue → PR cycle, but needs adaptation |

---

## The Gap Analysis

### What Frameworks Provide
✅ Multi-agent orchestration
✅ Task delegation and routing
✅ State management (LangGraph)
✅ Role-based collaboration (CrewAI)
✅ Tool calling and execution

### What's Missing (What You Need to Build)
❌ **Autonomous task generation** when queue is empty
❌ **First principles thinking loops** for direction setting
❌ **Living codebase awareness** (deep project understanding)
❌ **Continuous improvement** detection (what can be improved)
❌ **Multi-model routing** based on task type and cost

---

## Recommended Architecture

### Hybrid Approach: Blackbox5 + LangGraph + Custom "Director" Agent

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code CLI                          │
│                    (Your Interface)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Blackbox5 Core                            │
│  (TaskRouter, AgentLoader, Safety, VibeKanbanManager)       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              LangGraph State Machine                        │
│         (Cyclic workflows, state persistence)               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌───────────────────────────┐  ┌──────────────────────────┐
│   "Director" Agent        │  │   Worker Agents          │
│   (CUSTOM - Key Missing)  │  │   (You have these)       │
│                           │  │                          │
│ • Checks task queue       │  │ • Architect (GLM 4.7)    │
│ • If empty: runs first    │  │ • Developer (GLM Flash)  │
│   principles thinking     │  │ • Analyst (Kimi 2.5)     │
│ • Generates new tasks     │  │ • Tester (GLM 4.7)       │
│ • Maintains project       │  │                          │
│   awareness state         │  │                          │
└───────────────────────────┘  └──────────────────────────┘
                │
                ▼
        ┌───────────────┐
        │  LiteLLM      │
        │  (Already     │
        │   setup)      │
        └───────────────┘
```

---

## The "Director" Agent - What You Need to Build

This is the **missing piece** that no framework provides. It needs to:

### 1. Continuous Queue Monitor
```python
while True:
    if task_queue.is_empty():
        run_thinking_loop()  # Figure out what to do next
    else:
        process_next_task()
```

### 2. First Principles Thinking Loop
```python
def run_thinking_loop():
    # 1. Assess current state
    state = get_project_state()  # From VibeKanban + codebase analysis

    # 2. Identify gaps/opportunities
    gaps = analyze_improvement_opportunities(state)

    # 3. Prioritize by impact
    tasks = prioritize_tasks(gaps)

    # 4. Add to queue
    task_queue.add_batch(tasks)
```

### 3. Project State Awareness
- Read VibeKanban for active/completed tasks
- Analyze codebase for:
  - Code coverage gaps
  - TODO comments
  - Tech debt indicators
  - Performance issues
  - Missing tests
  - Documentation gaps

### 4. Continuous Improvement Detection
- Pattern: "What would make this codebase better?"
- Sources:
  - Error logs
  - User feedback
  - Performance metrics
  - Security scans
  - Code review patterns

---

## Implementation Roadmap

### Phase 1: Foundation (1-2 weeks)
- [ ] Integrate LangGraph with Blackbox5
- [ ] Build state management layer (connect to VibeKanban)
- [ ] Create "Director" agent skeleton
- [ ] Setup multi-model routing (GLM, Kimi, Flash)

### Phase 2: Director Agent (2-3 weeks)
- [ ] Implement first principles thinking loop
- [ ] Build project state analyzer
- [ ] Create task generation logic
- [ ] Connect to VibeKanban for queue management

### Phase 3: Continuous Improvement (1-2 weeks)
- [ ] Add improvement opportunity detection
- [ ] Implement priority scoring
- [ ] Add autonomous task creation
- [ ] Build feedback loops from completed tasks

### Phase 4: Production Hardening (1 week)
- [ ] Safety limits (don't generate infinite tasks)
- [ ] Human approval gates for major changes
- [ ] Observability and monitoring
- [ ] Cost tracking and optimization

---

## Recommended Tech Stack

| Component | Technology | Why |
|-----------|------------|-----|
| **Orchestration** | LangGraph | Cyclic workflows, state persistence, production-ready |
| **Agent Coordination** | Blackbox5 | Already built, working, integrates with VibeKanban |
| **Model Routing** | LiteLLM | Already setup, supports multi-model load balancing |
| **State Management** | VibeKanban + Custom | VibeKanban for tasks, custom for project state |
| **First Principles** | Custom | No framework provides this, need to build |
| **Queue Management** | VibeKanban API | Already have it |

---

## Key Decision Points

### 1. Framework Choice: LangGraph vs CrewAI

**LangGraph** (Recommended):
- ✅ Cyclic workflows (can implement "what's next" loops)
- ✅ State persistence (resume after interruption)
- ✅ Fine-grained control
- ✅ Better for complex state machines
- ⚠️ More boilerplate

**CrewAI**:
- ✅ Higher-level, easier to setup
- ✅ Built-in role management
- ✅ Good for team collaboration
- ❌ Linear workflows (harder to do continuous loops)
- ❌ Less state control

**Recommendation**: LangGraph for the Director loop, CrewAI for worker coordination

### 2. Integration Approach

**Option A**: Extend Blackbox5 with LangGraph
- Pro: Leverage existing work
- Pro: VibeKanban already integrated
- Con: Need to integrate two systems

**Option B**: Build on LangGraph from scratch
- Pro: Cleaner architecture
- Pro: LangGraph designed for this
- Con: Lose existing Blackbox5 work

**Recommendation**: Option A - Use Blackbox5 for workers, LangGraph for Director

---

## Next Steps

1. **Validate**: Does this architecture match your vision?
2. **Prioritize**: Which phase to start with?
3. **Prototype**: Build a minimal Director agent
4. **Integrate**: Connect LangGraph + Blackbox5
5. **Iterate**: Add first principles thinking loop

---

## Sources

- [Top 7 Agentic AI Frameworks in 2026](https://www.alphamatch.ai/blog/top-agentic-ai-frameworks-2026)
- [Multi-Agent AI Systems in 2026: Comparing LangGraph, CrewAI, AutoGen](https://brlikhon.engineer/blog/multi-agent-ai-systems-in-2026-comparing-langgraph-crewai-autogen-and-pydantic-ai-for-production-use-cases)
- [LangGraph vs LangChain: Which Framework You Should Use in 2026](https://python.plainenglish.io/langgraph-vs-langchain-which-framework-you-should-use-in-2026-73128b617121)
- [Building AI Agents with LangGraph (2026 Edition)](https://ai.gopubby.com/building-ai-agents-with-langgraph-2026-edition-a-step-by-step-guide-494d36e801f9)
- [Agentic AI: The Agent Loop & Tools for Building](https://you.com/resources/the-agent-loop-how-ai-agents-actually-work-and-how-to-build-one)
- [AI Agents From First Principles - Deep (Learning) Focus](https://cameronrwolfe.substack.com/p/ai-agents)
- [How We Built Truly Autonomous Agents](https://vertesiahq.com/blog/truly-autonomous-agents)
- [SWE-agent GitHub Repository](https://github.com/SWE-agent/SWE-agent)
- [SWE-agent Documentation](https://swe-agent.com/)
- [AI-Driven Self-Evolving Software: The Rise of Autonomous Codebases by 2026](https://www.cogentinfo.com/resources/ai-driven-self-evolving-software-the-rise-of-autonomous-codebases-by-2026)
- [A Survey of Self-Evolving Agents: On Path to Artificial...](https://arxiv.org/html/2507.21046v1)
