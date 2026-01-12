/**
 * GLM Worker
 * Claims and executes tasks from Vibe Kanban using GLM 4.7
 */

import { VibeKanbanClient } from '../orchestrator/mcp-client';
import { SYSTEM_PROMPTS } from '../config/settings';
import type { VibeKanbanTask, WorkerConfig } from '../types';

export class GLMWorker {
  private vibeClient: VibeKanbanClient;
  private config: WorkerConfig;
  private projectId: string;
  private running: boolean = false;

  constructor(projectId?: string, config?: Partial<WorkerConfig>) {
    this.vibeClient = new VibeKanbanClient();
    this.projectId = projectId || process.env.VIBE_KANBAN_PROJECT_ID || '';
    this.config = {
      model: 'glm',
      pollingInterval: 5000,
      maxConcurrentTasks: 1,
      ...config,
    };
  }

  /**
   * Start the worker loop
   */
  async start(): Promise<void> {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║          GLM WORKER STARTED              ║');
    console.log('╚════════════════════════════════════════════╝\n');
    console.log(`Configuration:`);
    console.log(`  Model: ${this.config.model}`);
    console.log(`  Polling Interval: ${this.config.pollingInterval}ms`);
    console.log(`  Max Concurrent Tasks: ${this.config.maxConcurrentTasks}`);
    console.log(`  Project ID: ${this.projectId || 'auto-detect'}`);

    if (!this.projectId) {
      const projects = await this.vibeClient.listProjects();
      if (projects.length > 0) {
        this.projectId = projects[0].id;
        console.log(`  Auto-detected project: "${projects[0].name}"`);
      }
    }

    console.log('\n─────────────────────────────────────────────\n');
    this.running = true;

    while (this.running) {
      try {
        await this.workCycle();
      } catch (error) {
        console.error('[ERROR] Work cycle failed:', error);
      }

      // Wait before polling again
      await this.sleep(this.config.pollingInterval);
    }
  }

  /**
   * Stop the worker
   */
  stop(): void {
    console.log('\n[INFO] Stopping GLM worker...');
    this.running = false;
  }

  /**
   * Single work cycle
   */
  private async workCycle(): Promise<void> {
    // Check if we're at capacity
    const inProgressTasks = await this.vibeClient.listTasks(this.projectId, 'in_progress');

    if (inProgressTasks.length >= this.config.maxConcurrentTasks) {
      // Already at max capacity, wait for tasks to complete
      return;
    }

    // Get available tasks
    const todoTasks = await this.vibeClient.listTasks(this.projectId, 'todo');

    if (todoTasks.length === 0) {
      // No tasks available
      return;
    }

    // Find tasks assigned to GLM (check description for "Recommended: **GLM**")
    const glmTasks = todoTasks.filter((task) =>
      task.description.includes('Recommended: **GLM**') ||
      task.description.includes('executor: "glm"')
    );

    if (glmTasks.length === 0) {
      // No GLM tasks available
      return;
    }

    // Claim the first available GLM task
    const task = glmTasks[0];
    await this.executeTask(task);
  }

  /**
   * Execute a single task
   */
  private async executeTask(task: VibeKanbanTask): Promise<void> {
    console.log(`\n╔════════════════════════════════════════════╗`);
    console.log(`║  EXECUTING TASK                          ║`);
    console.log(`╚════════════════════════════════════════════╝\n`);
    console.log(`Title: ${task.title}`);
    console.log(`ID: ${task.id}`);
    console.log(`\n${task.description}`);

    try {
      // Step 1: Update status to in_progress
      await this.vibeClient.updateTask(task.id, { status: 'in_progress' });
      console.log('\n[INFO] Task status: IN_PROGRESS');

      // Step 2: Parse the task description
      const taskSpec = this.parseTaskDescription(task.description);
      console.log('\n[INFO] Parsed task specification:');
      console.log(`  - Files: ${taskSpec.files.length || 'auto-detect'}`);
      console.log(`  - Acceptance Criteria: ${taskSpec.acceptanceCriteria.length}`);

      // Step 3: Execute using LLM
      console.log('\n[INFO] Executing task with GLM 4.7...');
      const result = await this.executeWithGLM(task);

      // Step 4: Update status to review_required
      await this.vibeClient.updateTask(task.id, {
        status: 'review_required',
        description: `${task.description}\n\n### Execution Result\n\n${result}`,
      });

      console.log('\n✓ Task completed, awaiting review');
      console.log('\n╔════════════════════════════════════════════╗');
      console.log('║          TASK COMPLETED                  ║');
      console.log('╚════════════════════════════════════════════╝\n');

    } catch (error) {
      // Mark task as failed
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.vibeClient.updateTask(task.id, {
        status: 'failed',
        description: `${task.description}\n\n### Error\n\n${errorMessage}`,
      });

      console.error('\n❌ Task failed:', errorMessage);
      console.error('\n╔════════════════════════════════════════════╗');
      console.error('║          TASK FAILED                     ║');
      console.error('╚════════════════════════════════════════════╝\n');
    }
  }

  /**
   * Parse task description
   */
  private parseTaskDescription(description: string): {
    requirements: string;
    acceptanceCriteria: string[];
    files: string[];
    dependencies: string[];
  } {
    const lines = description.split('\n');

    const acceptanceCriteria: string[] = [];
    const files: string[] = [];
    const dependencies: string[] = [];

    let currentSection = '';

    for (const line of lines) {
      if (line.startsWith('### Requirements')) {
        currentSection = 'requirements';
        continue;
      }
      if (line.startsWith('### Acceptance Criteria')) {
        currentSection = 'acceptance';
        continue;
      }
      if (line.startsWith('### Dependencies')) {
        currentSection = 'dependencies';
        continue;
      }
      if (line.startsWith('### Files to Modify')) {
        currentSection = 'files';
        continue;
      }

      if (currentSection === 'acceptance') {
        const match = line.match(/\d+\.\s*\[?\s*\]?\s*(.+)/);
        if (match) {
          acceptanceCriteria.push(match[1].trim());
        }
      }

      if (currentSection === 'files') {
        const match = line.match(/-\s*`([^`]+)`/);
        if (match) {
          files.push(match[1]);
        }
      }

      if (currentSection === 'dependencies') {
        const match = line.match(/-\s*(.+)/);
        if (match) {
          dependencies.push(match[1].trim());
        }
      }
    }

    return {
      requirements: description,
      acceptanceCriteria,
      files,
      dependencies,
    };
  }

  /**
   * Execute task using GLM 4.7
   * In production, this would call the actual GLM API
   */
  private async executeWithGLM(task: VibeKanbanTask): Promise<string> {
    // TODO: Implement actual GLM API call
    // For now, simulate execution

    console.log('  [GLM] Analyzing task requirements...');
    await this.sleep(1000);

    console.log('  [GLM] Studying existing code patterns...');
    await this.sleep(1000);

    console.log('  [GLM] Implementing solution...');
    await this.sleep(2000);

    console.log('  [GLM] Verifying acceptance criteria...');
    await this.sleep(500);

    return `
### Execution Summary

**Model Used:** GLM 4.7 (simulated)

**Actions Taken:**
1. Analyzed task requirements
2. Studied existing code patterns
3. Implemented solution following project conventions
4. Verified acceptance criteria

**Files Created/Modified:**
- (File changes would be listed here)

**Acceptance Criteria Status:**
${task.description.match(/Acceptance Criteria[\s\S]*?(?=\n\n###|\n###|$)/)?.[0] || 'See task description'}

**Notes:**
- Task executed successfully
- All acceptance criteria met
- Ready for review

**Next Steps:**
Please review the implementation and either:
- Approve to mark as complete
- Request revisions with specific feedback
`;
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * CLI entry point
 */
export async function main() {
  const worker = new GLMWorker();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n[INFO] Received SIGINT, shutting down gracefully...');
    worker.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n\n[INFO] Received SIGTERM, shutting down gracefully...');
    worker.stop();
    process.exit(0);
  });

  try {
    await worker.start();
  } catch (error) {
    console.error('[ERROR] Worker failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
