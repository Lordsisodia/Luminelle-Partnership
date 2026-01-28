#!/usr/bin/env python3
"""
LangGraph Examples - Concrete, Runnable Flows

Run these to see LangGraph in action!
"""

import asyncio
from typing import TypedDict, Literal
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver


# =====================================================
# Example 1: Simple Linear Pipeline
# =====================================================

print("\n" + "="*60)
print("EXAMPLE 1: Linear Pipeline")
print("="*60)

class LinearState(TypedDict):
    value: int
    history: list[str]

def double(state: LinearState) -> dict:
    new_value = state["value"] * 2
    print(f"  Double: {state['value']} → {new_value}")
    return {"value": new_value, "history": state["history"] + ["doubled"]}

def add_ten(state: LinearState) -> dict:
    new_value = state["value"] + 10
    print(f"  Add 10: {state['value'] - 10} → {new_value}")
    return {"value": new_value, "history": state["history"] + ["added 10"]}

def square(state: LinearState) -> dict:
    new_value = state["value"] ** 2
    print(f"  Square: {state['value']} → {new_value}")
    return {"value": new_value, "history": state["history"] + ["squared"]}

# Build graph
workflow = StateGraph(LinearState)
workflow.add_node("double", double)
workflow.add_node("add_ten", add_ten)
workflow.add_node("square", square)

workflow.add_edge("double", "add_ten")
workflow.add_edge("add_ten", "square")
workflow.add_edge("square", END)

workflow.set_entry_point("double")

app = workflow.compile()

# Run it
initial = {"value": 5, "history": []}
print("\nRunning: double → add_ten → square")
print(f"Input: {initial}")
result = app.invoke(initial)
print(f"Output: {result}")
print(f"Math check: ((5 * 2) + 10) ^ 2 = {((5 * 2) + 10) ** 2}")


# =====================================================
# Example 2: Loop with Retry (Self-Correcting)
# =====================================================

print("\n" + "="*60)
print("EXAMPLE 2: Loop with Retry")
print("="*60)

class RetryState(TypedDict):
    attempts: int
    max_attempts: int
    success: bool
    message: str

def try_work(state: RetryState) -> dict:
    attempts = state["attempts"] + 1
    print(f"  Attempt {attempts}... ", end="")

    # Simulate: fails first 2 times, succeeds on 3rd
    if attempts < 3:
        print("❌ Failed")
        return {"attempts": attempts, "success": False}
    else:
        print("✅ Success!")
        return {"attempts": attempts, "success": True, "message": "Work complete!"}

def should_retry(state: RetryState) -> str:
    if state["success"]:
        return "done"
    if state["attempts"] >= state["max_attempts"]:
        return "give_up"
    return "retry"

def done(state: RetryState) -> dict:
    print(f"  → {state['message']}")
    return {}

def give_up(state: RetryState) -> dict:
    print(f"  → Giving up after {state['attempts']} attempts")
    return {"message": "Failed after max attempts"}

# Build graph with loop
workflow = StateGraph(RetryState)
workflow.add_node("try_work", try_work)
workflow.add_node("done", done)
workflow.add_node("give_up", give_up)

workflow.add_conditional_edges(
    "try_work",
    should_retry,
    {
        "retry": "try_work",  # LOOP BACK!
        "done": "done",
        "give_up": "give_up"
    }
)

workflow.set_entry_point("try_work")
app = workflow.compile()

# Run it
initial = {"attempts": 0, "max_attempts": 5, "success": False, "message": ""}
print("\nRunning: try_work (loops until success or max attempts)")
result = app.invoke(initial)
print(f"Result: {result}")


# =====================================================
# Example 3: Branching (Task Routing)
# =====================================================

print("\n" + "="*60)
print("EXAMPLE 3: Branching (Task Routing)")
print("="*60)

class BranchState(TypedDict):
    task_type: str
    result: str

def router(state: BranchState) -> dict:
    task = state["task_type"]
    print(f"  Router received: {task}")
    return {}

def researcher(state: BranchState) -> dict:
    print(f"  🔬 Researcher analyzing {state['task_type']}")
    return {"result": "Research complete: found relevant information"}

def coder(state: BranchState) -> dict:
    print(f"  💻 Coder implementing {state['task_type']}")
    return {"result": "Code complete: feature implemented"}

def reviewer(state: BranchState) -> dict:
    print(f"  👁️  Reviewer checking {state['task_type']}")
    return {"result": "Review complete: looks good"}

def decide_branch(state: BranchState) -> str:
    task = state["task_type"].lower()
    if "research" in task or "analysis" in task:
        return "to_researcher"
    elif "code" in task or "implement" in task:
        return "to_coder"
    else:
        return "to_reviewer"

# Build graph with branches
workflow = StateGraph(BranchState)
workflow.add_node("router", router)
workflow.add_node("researcher", researcher)
workflow.add_node("coder", coder)
workflow.add_node("reviewer", reviewer)

workflow.add_conditional_edges(
    "router",
    decide_branch,
    {
        "to_researcher": "researcher",
        "to_coder": "coder",
        "to_reviewer": "reviewer"
    }
)

workflow.add_edge("researcher", END)
workflow.add_edge("coder", END)
workflow.add_edge("reviewer", END)

workflow.set_entry_point("router")
app = workflow.compile()

# Test different routes
for task in ["Research user preferences", "Implement login page", "Review PR #123"]:
    print(f"\n--- Routing: {task} ---")
    result = app.invoke({"task_type": task, "result": ""})
    print(f"  → {result['result']}")


# =====================================================
# Example 4: Agent Loop (Think-Act-Observe)
# =====================================================

print("\n" + "="*60)
print("EXAMPLE 4: Agent Loop (Think-Act-Observe)")
print("="*60)

class AgentState(TypedDict):
    goal: str
    position: int
    steps: list[str]
    done: bool

def think(state: AgentState) -> dict:
    step_num = len(state["steps"]) + 1
    print(f"  🤔 Thinking (Step {step_num}): How to reach goal '{state['goal']}'?")
    print(f"     Current position: {state['position']}, Goal: 100")

    # Simple logic: decide how much to move
    if state["position"] < 50:
        move = 30  # Big moves at start
    elif state["position"] < 80:
        move = 15  # Medium moves
    else:
        move = 5   # Small moves near goal

    print(f"     → Will move {move} steps forward")
    return {"planned_move": move}

def act(state: AgentState) -> dict:
    move = state.get("planned_move", 0)
    new_pos = state["position"] + move
    print(f"  ⚡ Acting: Moving {move} steps")
    print(f"     Position: {state['position']} → {new_pos}")
    return {"position": new_pos, "steps": state["steps"] + [f"Moved {move} to position {new_pos}"]}

def observe(state: AgentState) -> dict:
    pos = state["position"]
    print(f"  👁️  Observing: Now at position {pos}")

    if pos >= 100:
        print(f"     ✅ Goal achieved!")
        return {"done": True, "message": "Goal reached!"}
    elif pos > 95:
        print(f"     → Almost there, need small adjustment")
        return {"done": False}
    else:
        print(f"     → Still {100 - pos} steps to go")
        return {"done": False}

def should_continue(state: AgentState) -> str:
    if state["done"]:
        return "end"
    return "think"  # LOOP BACK to think!

# Build the agent loop
workflow = StateGraph(AgentState)
workflow.add_node("think", think)
workflow.add_node("act", act)
workflow.add_node("observe", observe)

workflow.add_edge("think", "act")
workflow.add_edge("act", "observe")

workflow.add_conditional_edges(
    "observe",
    should_continue,
    {
        "think": "think",  # THE LOOP!
        "end": END
    }
)

workflow.set_entry_point("think")
app = workflow.compile()

# Run the agent
print("\nRunning: Think → Act → Observe (loops until goal)")
initial = {"goal": "Reach position 100", "position": 0, "steps": [], "done": False}
result = app.invoke(initial)

print(f"\n📊 Agent Stats:")
print(f"  Final position: {result['position']}")
print(f"  Steps taken: {len(result['steps'])}")
print(f"  History: {result['steps']}")


# =====================================================
# Example 5: State Persistence (Resume Later)
# =====================================================

print("\n" + "="*60)
print("EXAMPLE 5: State Persistence (Save & Resume)")
print("="*60)

class PersistState(TypedDict):
    counter: int
    max_count: int

def increment(state: PersistState) -> dict:
    new_count = state["counter"] + 1
    print(f"  Increment: {state['counter']} → {new_count}")
    return {"counter": new_count}

def should_stop(state: PersistState) -> str:
    if state["counter"] >= state["max_count"]:
        return "end"
    return "continue"

# Build graph
workflow = StateGraph(PersistState)
workflow.add_node("increment", increment)

workflow.add_conditional_edges(
    "increment",
    should_stop,
    {
        "continue": "increment",  # Loop
        "end": END
    }
)

workflow.set_entry_point("increment")

# Add checkpointing for persistence
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# Run in "sessions"
thread_id = "example_session"
config = {"configurable": {"thread_id": thread_id}}

print("\n--- Session 1: Run to 3 ---")
initial = {"counter": 0, "max_count": 10}
result = app.invoke(initial, config)
print(f"Paused at: {result['counter']}")

print("\n--- Simulating pause, doing other work... ---")
print("  (You could close the program here)")

print("\n--- Session 2: Resume from checkpoint ---")
# Resume by passing None as state (continues from checkpoint)
result = app.invoke(None, config)
print(f"Resumed from: {result['counter'] - 1}, Now at: {result['counter']}")

print("\n--- Session 3: Finish ---")
result = app.invoke(None, config)
print(f"Final value: {result['counter']}")


# =====================================================
# Summary
# =====================================================

print("\n" + "="*60)
print("LANGGRAPH PATTERNS SUMMARY")
print("="*60)

patterns = """
1. LINEAR PIPELINE
   A → B → C → END
   Use for: Sequential processing, ETL

2. LOOP WITH RETRY
   A → B → (if fail, go back to A)
   Use for: Error handling, self-correction

3. BRANCHING
       A
      / \\
     B   C
      \\ /
       D
   Use for: Task routing, parallel processing

4. AGENT LOOP (Cyclic)
   think → act → observe → (if not done, back to think)
   Use for: Autonomous agents, iterative improvement

5. STATE PERSISTENCE
   Save checkpoint, resume later
   Use for: Long-running tasks, human-in-the-loop
"""

print(patterns)

print("\n" + "="*60)
print("KEY INSIGHT: LangGraph gives you the PLUMBING")
print("="*60)

insight = """
The nodes/functions YOU write provide the intelligence:
- What to think about
- How to make decisions
- When to loop back
- When to finish

LangGraph provides:
- State management
- Checkpoints (save/resume)
- Edge routing
- Visualization

You're not building an "AI agent" with LangGraph.
You're building a STATE MACHINE that uses LLMs.
"""

print(insight)
