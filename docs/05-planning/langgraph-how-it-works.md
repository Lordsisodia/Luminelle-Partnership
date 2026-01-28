# LangGraph - How It Actually Works

## The Core Concept

**LangGraph is just a state machine with edges.** That's it.

Think of it like a game board:
- **Nodes** = Spaces on the board (functions that do something)
- **Edges** = Paths between spaces (which node happens next)
- **State** = The game pieces (data that travels between nodes)

## The Mechanics

### Basic Structure

```python
from langgraph.graph import StateGraph, END

# 1. Define your state (the "game pieces")
class MyState(TypedDict):
    messages: list[str]
    count: int
    status: str

# 2. Create the graph (the "game board")
workflow = StateGraph(MyState)

# 3. Add nodes (the "spaces")
workflow.add_node("node_a", node_a_function)
workflow.add_node("node_b", node_b_function)
workflow.add_node("node_c", node_c_function)

# 4. Connect nodes (the "paths")
workflow.add_edge("node_a", "node_b")  # A always goes to B
workflow.add_conditional_edges(      # B might go to C or END
    "node_b",
    decide_next_node,
    {
        "continue": "node_c",
        "stop": END
    }
)

# 5. Set starting point
workflow.set_entry_point("node_a")

# 6. Compile it
app = workflow.compile()

# 7. Run it
result = app.invoke({"messages": [], "count": 0, "status": "start"})
```

### What Each Node Does

A node is just a function that:
1. Receives the current state
2. Does something (call LLM, use tool, calculate)
3. Returns state updates

```python
def node_a_function(state: MyState) -> dict:
    """A node does work and updates state"""

    # Do something
    new_message = "Hello from node A"
    new_count = state["count"] + 1

    # Return updates (merged into state)
    return {
        "messages": state["messages"] + [new_message],
        "count": new_count,
        "status": "node_a_complete"
    }
```

### Conditional Edges (The Decision Points)

This is where LangGraph gets powerful - nodes can decide where to go next:

```python
def decide_next_node(state: MyState) -> str:
    """Decide which node to run next"""

    if state["count"] > 5:
        return "stop"  # Go to END
    else:
        return "continue"  # Go to node_c

# Connect with conditional edge
workflow.add_conditional_edges(
    "node_b",
    decide_next_node,
    {
        "continue": "node_c",
        "stop": END
    }
)
```

## Flow Patterns You Can Code

### Pattern 1: Linear Pipeline (DAG)

```
A → B → C → D → END
```

```python
workflow = StateGraph(MyState)
workflow.add_node("extract", extract_data)
workflow.add_node("transform", transform_data)
workflow.add_node("load", load_data)

workflow.add_edge("extract", "transform")
workflow.add_edge("transform", "load")
workflow.add_edge("load", END)
```

**Use for**: ETL pipelines, data processing, sequential steps

### Pattern 2: Loop with Retry

```
    ┌─────────┐
    ↓         │
A → B → C → D
    ↓   (if fail, go back to B)
   END
```

```python
def should_retry(state: MyState) -> str:
    if state.get("error"):
        return "retry"
    return "continue"

workflow.add_conditional_edges(
    "process",
    should_retry,
    {
        "retry": "extract",  # Go back
        "continue": "load"
    }
)
```

**Use for**: Error handling, retry logic, self-correcting systems

### Pattern 3: Branching (Split)

```
        A
       / \
      B   C
       \ /
        D
```

```python
def route_task(state: MyState) -> str:
    if state["task_type"] == "research":
        return "researcher"
    else:
        return "coder"

workflow.add_conditional_edges(
    "router",
    route_task,
    {
        "researcher": "node_b",
        "coder": "node_c"
    }
)

workflow.add_edge("node_b", "node_d")
workflow.add_edge("node_c", "node_d")
```

**Use for**: Task routing, parallel processing, specialist agents

### Pattern 4: Cyclic Loop (The Agent Loop)

```
    ┌─────────────────┐
    │                 │
    ↓                 │
A → B → C → D → (condition)
              ↓
          (if done) END
```

```python
def should_continue(state: MyState) -> str:
    if state["done"]:
        return "end"
    return "think"

workflow = StateGraph(AgentState)
workflow.add_node("think", think_node)
workflow.add_node("act", act_node)
workflow.add_node("observe", observe_node)

workflow.add_conditional_edges(
    "observe",
    should_continue,
    {
        "think": "think",  # Loop back!
        "end": END
    }
)
```

**Use for**: Agents that plan, act, and iterate

### Pattern 5: Human-in-the-Loop

```
A → B → (WAIT for human) → C → END
```

```python
from langgraph.checkpoint.memory import MemorySaver

# Add checkpointing
memory = MemorySaver()
workflow = StateGraph(MyState)
# ... add nodes and edges ...

app = workflow.compile(checkpointer=memory)

# Run with thread ID (for persistence)
config = {"configurable": {"thread_id": "session_1"}}
result = app.invoke(initial_state, config)

# Later, resume from checkpoint
result = app.invoke(None, config)
```

**Use for**: Approval workflows, interactive agents

### Pattern 6: Parallel Execution

```
    A
   / \
  B   C
   \ /
    D
```

```python
# LangGraph doesn't have native parallel yet
# But you can simulate it:
async def parallel_node(state: MyState) -> dict:
    results = await asyncio.gather(
        task_b(state),
        task_c(state)
    )
    return {"parallel_results": results}
```

**Use for**: Multi-agent collaboration, concurrent tasks

### Pattern 7: Hierarchical Agents

```
Orchestrator
    ├── Agent A (sub-graph)
    ├── Agent B (sub-graph)
    └── Agent C (sub-graph)
```

```python
# Create sub-graphs
agent_a_graph = create_agent_a_graph()
agent_b_graph = create_agent_b_graph()

# Add as nodes in main graph
workflow.add_node("agent_a", agent_a_graph.compile())
workflow.add_node("agent_b", agent_b_graph.compile())
```

**Use for**: Multi-agent systems, specialist teams

## The Director Agent's Flow

Here's the actual flow we built:

```
┌─────────────────────────────────────────────────────────┐
│                    The Director Loop                    │
└─────────────────────────────────────────────────────────┘

check_queue
    │
    ├─ Has tasks? → assign_task → execute_task → (back to check)
    │
    └─ No tasks? → director_thinking
                        │
                        ├── analyze_project_state
                        ├── identify_improvements
                        ├── llm_reasoning (first principles)
                        ├── generate_tasks
                        └── (back to check)
```

The key insight: **It's a loop that never stops unless you tell it to.**

## State Persistence (How It Remembers)

```python
from langgraph.checkpoint.memory import MemorySaver

# Create checkpointer
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# Run with a thread ID
config = {"configurable": {"thread_id": "my_session"}}

# Run for a while
result = app.invoke(state, config)

# Pause, save state to disk if you want

# Later, resume exactly where you left off
result = app.invoke(None, config)  # None = continue from last state
```

**What gets saved:**
- All state variables
- Current position in the graph
- History of all nodes executed
- Can resume from any checkpoint

## The Secret Sauce: Update Pattern

LangGraph uses an **immutable update pattern**:

```python
def my_node(state: MyState) -> dict:
    # DON'T modify state directly:
    # state["count"] += 1  # ❌ This won't work!

    # DO return updates:
    return {"count": state["count"] + 1}  # ✅ This merges into state
```

LangGraph automatically:
1. Takes your returned dict
2. Merges it into the existing state
3. Passes updated state to next node

## Real Example: Coding Agent Flow

```python
def analyze_task(state: CodingState) -> dict:
    """Understand what needs to be built"""
    prompt = f"Analyze this task: {state['task']}"
    analysis = llm.call(prompt)
    return {"analysis": analysis}

def write_code(state: CodingState) -> dict:
    """Write the actual code"""
    code = llm.call(f"Write code for: {state['analysis']}")
    return {"code": code}

def test_code(state: CodingState) -> dict:
    """Test the code"""
    test_result = run_tests(state["code"])
    return {"test_result": test_result}

def decide_next(state: CodingState) -> str:
    """Decide what to do next"""
    if state["test_result"]["failed"]:
        return "fix"  # Go back to coding
    else:
        return "done"  # Finish

# Wire it up
workflow = StateGraph(CodingState)
workflow.add_node("analyze", analyze_task)
workflow.add_node("code", write_code)
workflow.add_node("test", test_code)

workflow.add_edge("analyze", "code")
workflow.add_edge("code", "test")

workflow.add_conditional_edges(
    "test",
    decide_next,
    {
        "fix": "code",  # Loop back to fix
        "done": END
    }
)
```

This creates an agent that:
1. Analyzes the task
2. Writes code
3. Tests it
4. If tests fail → goes back and fixes
5. If tests pass → finishes

**It's a self-correcting loop!**

## Why LangGraph for Your Use Case?

Your requirement: "Agents that figure out what to do when queue is empty"

LangGraph helps because:

1. **State persistence** - Remember project state across sessions
2. **Cyclic workflows** - Can loop: check queue → think → generate tasks → repeat
3. **Checkpoints** - Can pause and resume
4. **Visualization** - Can see the flow

**But the thinking logic? You still write that.**

## The Truth About LangGraph

**LangGraph ≠ Autonomous Agents**

LangGraph is:
- ✅ A way to define flows
- ✅ A state machine with persistence
- ✅ Infrastructure for agent workflows

LangGraph is NOT:
- ❌ A thinking system
- ❌ An autonomous agent
- ❌ A solution to "what should I do next"

**You provide the intelligence, LangGraph provides the plumbing.**

## How We Used It for Director

The Director uses LangGraph for:

```python
# The loop that makes it self-directing
workflow.add_conditional_edges(
    "check_queue",
    lambda s: "think" if not s["pending_tasks"] else "work",
    {
        "think": "director_thinking",  # Generate new tasks
        "work": "assign_task"          # Do existing tasks
    }
)
```

The cycle:
1. Check queue
2. If empty → think → generate tasks → repeat
3. If tasks → do them → repeat
4. Never stops!

That's how you get a "living codebase" that continuously improves itself.
