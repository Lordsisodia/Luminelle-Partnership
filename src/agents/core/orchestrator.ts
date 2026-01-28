/**
 * Lumelle Agent Hub - Orchestrator Agent
 * Main coordinator for multi-agent task execution
 */

import { BaseAgent } from './agent.js';
import { getSystemPrompt } from './prompts.js';
import type { AgentConfig, Task, AgentRole, TaskStatus } from './types.js';
import { getMessageBus } from './message-bus.js';

interface AgentCapability {
  role: AgentRole;
  capabilities: string[];
  canHandle: (task: Task) => boolean;
}

export class OrchestratorAgent extends BaseAgent {
  private agentCapabilities: AgentCapability[] = [];
  private activeTasks: Map<string, Task> = new Map();
  private taskQueue: Task[] = [];

  constructor() {
    const config: AgentConfig = {
      role: 'orchestrator' as AgentRole,
      name: 'Orchestrator',
      description: 'Coordinates specialist agents to accomplish complex tasks',
      modelTier: 'smart',
      systemPrompt: getSystemPrompt('orchestrator'),
      tools: [],
      capabilities: [
        'task_decomposition',
        'agent_coordination',
        'result_aggregation',
        'progress_monitoring',
      ],
      maxConcurrentTasks: 10,
    };

    super(config);
    this.setupAgentCapabilities();
  }

  /**
   * Set up available agent capabilities
   */
  private setupAgentCapabilities(): void {
    this.agentCapabilities = [
      {
        role: 'coding' as AgentRole,
        capabilities: ['write_code', 'debug', 'refactor', 'file_operations', 'git_operations'],
        canHandle: (task) =>
          task.type === 'code' ||
          task.type === 'debug' ||
          task.type === 'refactor' ||
          task.description.toLowerCase().includes('code') ||
          task.description.toLowerCase().includes('implement') ||
          task.description.toLowerCase().includes('fix'),
      },
      {
        role: 'research' as AgentRole,
        capabilities: ['web_search', 'analyze', 'document', 'investigate'],
        canHandle: (task) =>
          task.type === 'research' ||
          task.type === 'analysis' ||
          task.description.toLowerCase().includes('search') ||
          task.description.toLowerCase().includes('find') ||
          task.description.toLowerCase().includes('research'),
      },
      {
        role: 'test' as AgentRole,
        capabilities: ['write_tests', 'run_tests', 'validate', 'quality_assurance'],
        canHandle: (task) =>
          task.type === 'test' ||
          task.type === 'validation' ||
          task.description.toLowerCase().includes('test') ||
          task.description.toLowerCase().includes('verify'),
      },
      {
        role: 'review' as AgentRole,
        capabilities: ['code_review', 'security_check', 'best_practices', 'quality_review'],
        canHandle: (task) =>
          task.type === 'review' ||
          task.description.toLowerCase().includes('review') ||
          task.description.toLowerCase().includes('check'),
      },
    ];
  }

  /**
   * Process a user request - main entry point
   */
  async processRequest(userMessage: string, context?: Record<string, any>): Promise<string> {
    console.log(`[Orchestrator] Processing request: ${userMessage.substring(0, 100)}...`);

    // Create main task
    const mainTask: Task = {
      id: crypto.randomUUID(),
      type: 'user_request',
      description: userMessage,
      context: context || {},
      status: 'pending' as TaskStatus,
      createdAt: new Date(),
    };

    this.activeTasks.set(mainTask.id, mainTask);

    try {
      // Analyze and decompose the task
      const plan = await this.analyzeAndPlan(mainTask);

      if (plan.subtasks.length === 0) {
        // Simple task, handle directly
        return await this.handleDirectly(mainTask);
      }

      // Execute subtasks (considering dependencies)
      const results = await this.executeSubtasks(plan.subtasks);

      // Aggregate results
      const response = await this.aggregateResults(mainTask, results);

      mainTask.status = 'completed' as TaskStatus;
      mainTask.completedAt = new Date();
      mainTask.result = response;

      return response;
    } catch (error) {
      mainTask.status = 'failed' as TaskStatus;
      mainTask.error = error instanceof Error ? error : new Error(String(error));
      throw error;
    } finally {
      this.activeTasks.delete(mainTask.id);
    }
  }

  /**
   * Analyze the task and create execution plan
   */
  private async analyzeAndPlan(task: Task): Promise { subtasks: Task[] }> {
    this.setStatus('thinking' as AgentStatus);

    const analysisPrompt: string = [
      'Analyze this task and break it down into subtasks if needed.',
      'If the task is simple enough for one agent, respond with: DIRECT: <agent_name>',
      'If multiple agents are needed, break it into subtasks with format:',
      'SUBTASK: <agent_name>',
      'DESCRIPTION: <what needs to be done>',
      'DEPENDS: <comma-separated subtask IDs if any>',
      '',
      `Task: ${task.description}`,
      '',
      'Available agents: CODING, RESEARCH, TEST, REVIEW',
    ].join('\n');

    const response = await this.callLLM([
      {
        role: 'user',
        content: analysisPrompt,
      },
    ]);

    return this.parsePlan(response);
  }

  /**
   * Parse the LLM response into a structured plan
   */
  private parsePlan(response: string): { subtasks: Task[] } {
    const subtasks: Task[] = [];
    const lines = response.split('\n').filter((l) => l.trim());

    let currentSubtask: Partial<Task> | null = null;
    let subtaskCounter = 0;

    for (const line of lines) {
      if (line.startsWith('DIRECT:')) {
        // Direct execution - no subtasks
        return { subtasks: [] };
      }

      if (line.startsWith('SUBTASK:')) {
        if (currentSubtask) {
          subtasks.push(this.finalizeSubtask(currentSubtask, subtaskCounter - 1));
        }
        subtaskCounter++;
        currentSubtask = {
          id: `${subtaskCounter}`,
          type: line.substring(8).trim().toLowerCase() as any,
          createdAt: new Date(),
          status: 'pending' as TaskStatus,
        };
      } else if (line.startsWith('DESCRIPTION:') && currentSubtask) {
        currentSubtask.description = line.substring(12).trim();
      } else if (line.startsWith('DEPENDS:') && currentSubtask) {
        const deps = line
          .substring(8)
          .split(',')
          .map((d) => d.trim())
          .filter((d) => d);
        currentSubtask.dependencies = deps;
      }
    }

    if (currentSubtask) {
      subtasks.push(this.finalizeSubtask(currentSubtask, subtaskCounter - 1));
    }

    return { subtasks };
  }

  /**
   * Finalize a subtask with defaults
   */
  private finalizeSubtask(partial: Partial<Task>, index: number): Task {
    return {
      id: partial.id || crypto.randomUUID(),
      type: partial.type || 'general',
      description: partial.description || 'No description',
      dependencies: partial.dependencies || [],
      status: 'pending' as TaskStatus,
      createdAt: partial.createdAt || new Date(),
      context: partial.context || {},
    };
  }

  /**
   * Handle a simple task directly without decomposition
   */
  private async handleDirectly(task: Task): Promise<string> {
    // Determine best agent for this task
    const bestAgent = this.findBestAgent(task);

    if (!bestAgent) {
      // Handle directly with LLM
      return await this.callLLM([
        {
          role: 'user',
          content: task.description,
        },
      ]);
    }

    // Delegate to the best agent
    return await this.delegateTo(bestAgent.role, task);
  }

  /**
   * Execute subtasks with dependency management
   */
  private async executeSubtasks(subtasks: Task[]): Promise<Map<string, any>> {
    const results = new Map<string, any>();
    const completed = new Set<string>();
    const pending = new Set<string>(subtasks.map((t) => t.id));

    while (pending.size > 0) {
      // Find tasks whose dependencies are satisfied
      const ready = subtasks.filter(
        (t) =>
          pending.has(t.id) &&
          t.dependencies?.every((dep) => completed.has(dep))
      );

      if (ready.length === 0 && pending.size > 0) {
        throw new Error('Circular dependency detected in subtasks');
      }

      // Execute ready tasks in parallel
      const executions = ready.map(async (task) => {
        const result = await this.delegateTo(this.getAgentForTask(task), task);
        return { taskId: task.id, result };
      });

      const completedTasks = await Promise.allSettled(executions);

      for (const completion of completedTasks) {
        if (completion.status === 'fulfilled') {
          results.set(completion.value.taskId, completion.value.result);
          completed.add(completion.value.taskId);
          pending.delete(completion.value.taskId);
        } else {
          // Handle failed task
          console.error('[Orchestrator] Subtask failed:', completion.reason);
          // Continue with other tasks, but note the failure
        }
      }
    }

    return results;
  }

  /**
   * Delegate a task to a specific agent
   */
  private async delegateTo(agentRole: AgentRole, task: Task): Promise<any> {
    console.log(`[Orchestrator] Delegating to ${agentRole}: ${task.description}`);

    return await this.messageBus.request(this.config.role, agentRole, task);
  }

  /**
   * Find the best agent for a task
   */
  private findBestAgent(task: Task): AgentCapability | undefined {
    return this.agentCapabilities.find((cap) => cap.canHandle(task));
  }

  /**
   * Get the agent role for a specific task type
   */
  private getAgentForTask(task: Task): AgentRole {
    const capable = this.agentCapabilities.find((cap) => cap.canHandle(task));
    return capable?.role || 'coding' as AgentRole; // Default to coding
  }

  /**
   * Aggregate results from multiple agents
   */
  private async aggregateResults(
    mainTask: Task,
    subtaskResults: Map<string, any>
  ): Promise<string> {
    const aggregationPrompt = [
      'Aggregate these agent results into a coherent response for the user.',
      '',
      `Original Task: ${mainTask.description}`,
      '',
      'Results from agents:',
      ...Array.from(subtaskResults.entries()).map(
        ([id, result]) => `- Subtask ${id}: ${JSON.stringify(result)}`
      ),
      '',
      'Provide a clear, organized summary that addresses the original task.',
    ].join('\n');

    return await this.callLLM([
      {
        role: 'user',
        content: aggregationPrompt,
      },
    ]);
  }

  /**
   * Execute a task (called by message bus when receiving requests)
   */
  protected async executeTask(task: Task): Promise<any> {
    return await this.processRequest(task.description, task.context);
  }

  /**
   * Get current status of all tasks
   */
  getStatusReport(): {
    activeTasks: number;
    queuedTasks: number;
    tasks: Task[];
  } {
    return {
      activeTasks: this.activeTasks.size,
      queuedTasks: this.taskQueue.length,
      tasks: Array.from(this.activeTasks.values()),
    };
  }
}
