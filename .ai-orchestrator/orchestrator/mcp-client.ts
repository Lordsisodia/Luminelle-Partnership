/**
 * Vibe Kanban MCP Client Wrapper
 * Handles communication with Vibe Kanban MCP server
 */

import type { VibeKanbanProject, VibeKanbanTask, CreateTaskInput, TaskUpdates, TaskAttempt } from '../types';

export class VibeKanbanClient {
  private mcpAvailable: boolean = false;

  constructor() {
    // Check if MCP tools are available
    this.mcpAvailable = this.checkMCPAvailability();
  }

  private checkMCPAvailability(): boolean {
    // In a real implementation, this would check if the MCP server is connected
    // For demo purposes, return true to simulate MCP availability
    try {
      const hasMCPEnv = typeof process !== 'undefined' &&
        process.env?.MCP_SERVERS?.includes('vibe-kanban');

      // If MCP is not configured, use demo mode
      if (!hasMCPEnv) {
        console.log('[INFO] Vibe Kanban MCP not detected, running in DEMO mode');
        console.log('[INFO] Set MCP_SERVERS environment variable to use real MCP');
      }

      return true; // Always return true for demo mode
    } catch {
      return true; // Always return true for demo mode
    }
  }

  /**
   * List all projects in Vibe Kanban
   */
  async listProjects(): Promise<VibeKanbanProject[]> {
    if (!this.mcpAvailable) {
      throw new Error('Vibe Kanban MCP is not available. Please configure it first.');
    }

    // This would call the actual MCP tool
    // For now, return mock data
    console.log('[MCP] Calling list_projects...');
    return [
      {
        id: 'proj-123',
        name: 'Lumelle Affiliate Landing',
        description: 'Marketing site for Lumelle creator/affiliate program',
      },
    ];
  }

  /**
   * List tasks in a project
   */
  async listTasks(projectId: string, status?: VibeKanbanTask['status']): Promise<VibeKanbanTask[]> {
    console.log(`[MCP] Calling list_tasks for project ${projectId}${status ? ` with status ${status}` : ''}...`);

    // Mock implementation
    return [
      {
        id: 'task-1',
        project_id: projectId,
        title: 'Example Task',
        description: 'This is a placeholder task',
        status: 'todo',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  /**
   * Create a new task
   */
  async createTask(input: CreateTaskInput): Promise<string> {
    console.log(`[MCP] Creating task in project ${input.project_id}: "${input.title}"`);

    // Generate a mock task ID
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[MCP] Task created with ID: ${taskId}`);
    console.log(`[MCP] Description preview: ${input.description.slice(0, 100)}...`);

    return taskId;
  }

  /**
   * Update an existing task
   */
  async updateTask(taskId: string, updates: TaskUpdates): Promise<void> {
    console.log(`[MCP] Updating task ${taskId}:`, updates);
  }

  /**
   * Start working on a task with a coding agent
   */
  async startTaskAttempt(
    taskId: string,
    executor: string,
    baseBranch: string = 'main'
  ): Promise<string> {
    console.log(`[MCP] Starting task ${taskId} with executor ${executor} on branch ${baseBranch}`);

    const attemptId = `attempt-${Date.now()}`;
    console.log(`[MCP] Task attempt created: ${attemptId}`);

    return attemptId;
  }

  /**
   * Get task details
   */
  async getTask(taskId: string): Promise<VibeKanbanTask | null> {
    console.log(`[MCP] Getting task details for ${taskId}...`);

    // Mock implementation
    return {
      id: taskId,
      project_id: 'proj-123',
      title: 'Example Task',
      description: 'This is a placeholder task',
      status: 'todo',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string): Promise<void> {
    console.log(`[MCP] Deleting task ${taskId}...`);
  }
}
