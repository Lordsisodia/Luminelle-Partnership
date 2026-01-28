# LangGraph - How It Actually Works (Summary)

## The Short Version

**LangGraph is a state machine builder.** That's literally it.

You define:
1. **State** - Data that flows through the system
2. **Nodes** - Functions that process the state
3. **Edges** - Rules about which node runs next

## The Code Pattern

```python
from langgraph.graph import StateGraph, END

# 1. Define state (just a TypedDict)
class MyState(TypedDict):
    messages: list[str]
    count: int

# 2. Define nodes (just functions)
def my_node(state: MyState) -> dict:
    return {"count": state["count"] + 1}

# 3. Build graph
workflow = StateGraph(MyState)
workflow.add_node("node_a", my_node)
workflow.add_edge("node_a", END)
workflow.set_entry_point("node_a")

# 4. Compile and run
app = workflow.compile()
result = app.invoke({"messages": [], "count": 0})
```

## The 5 Flow Patterns You Can Code

### 1. Linear Pipeline
```
A → B → C → END
```
**Use for**: Data processing, sequential steps

### 2. Loop with Retry
```
    ┌─────┐
    ↓     │
A → B → C
```
**Use for**: Error handling, self-correction

### 3. Branching
```
      A
     / \
    B   C
```
**Use for**: Task routing, specialist agents

### 4. Cyclic Loop (Agent Pattern)
```
think → act → observe
   ↑             |
   └─────────────┘
```
**Use for**: Autonomous agents, continuous improvement

### 5. Human-in-the-Loop
```
A → B → [PAUSE for approval] → C
```
**Use for**: Approval workflows, interactive systems

## What Actually Ran (From Examples)

### Example 1: Linear Pipeline
```
Input: 5
Double → 10
Add 10 → 20
Square → 400
Output: 400
```

### Example 2: Loop with Retry
```
Attempt 1 → Failed
Attempt 2 → Failed
Attempt 3 → Success!
(Looped back automatically)
```

### Example 3: Branching
```
"Research user preferences" → Researcher node
"Implement login page" → Coder node
"Review PR #123" → Reviewer node
(Routed based on content)
```

### Example 4: Agent Loop
```
Step 1: Think (move 30) → Act (at 30) → Observe (not there)
Step 2: Think (move 30) → Act (at 60) → Observe (not there)
Step 3: Think (move 30) → Act (at 90) → Observe (not there)
Step 4: Think (move 5) → Act (at 95) → Observe (not there)
Step 5: Think (move 5) → Act (at 100) → Observe (DONE!)
(Looped until goal achieved)
```

### Example 5: State Persistence
```
Session 1: Count 0 → 3 (pause)
Session 2: Resume at 3 → Continue to 6 (pause)
Session 3: Resume at 6 → Continue to 10 (done)
(Picked up exactly where left off)
```

## The Key Insight

**LangGraph ≠ Intelligence**

LangGraph provides:
- ✅ State management
- ✅ Checkpoints (save/resume)
- ✅ Conditional routing
- ✅ Loop structure

**YOU provide:**
- ❌ What to think about
- ❌ How to make decisions
- ❌ What "done" means
- ❌ What actions to take

## For Your Use Case (Self-Directing Agents)

LangGraph helps with:
- **State persistence** - Remember project across sessions
- **Cyclic workflows** - The "check → think → act → repeat" loop
- **Checkpoints** - Pause/resume capability

But **you must write**:
- The thinking logic (first principles analysis)
- The task generation (what should be done next)
- The project awareness (codebase state)

## The Director Agent Flow We Built

```
check_queue
    │
    ├─ Has tasks → assign_task → execute_task → (loop back)
    │
    └─ Empty → director_thinking
                    │
                    ├── analyze codebase
                    ├── identify gaps
                    ├── LLM reasoning
                    ├── generate tasks
                    └── (loop back to check_queue)
```

**This loop runs forever**, continuously:
- Checking for work
- Thinking when idle
- Generating new tasks
- Never stopping

That's how you get a "living codebase."

## Run the Examples Yourself

```bash
python3 docs/05-planning/langgraph-examples.py
```

You'll see:
- Linear flows
- Loops with retry
- Branching/routing
- Agent think-act-observe cycles
- State persistence

## Final Takeaway

LangGraph is **infrastructure for building agent workflows**.

It's like React for agents - you define the components (nodes) and how they connect (edges), and LangGraph handles the execution.

The **intelligence** is in your node functions. LangGraph just orchestrates them.

**For your self-directing system:**
- LangGraph manages the loop structure
- Your "thinking node" provides the direction
- Your "task generation" creates the work
- The system keeps running forever

That's the combination for a living, improving codebase.
