/**
 * Main Orchestrator
 * Coordinates task classification, breakdown, and delegation to Vibe Kanban
 */

import { TaskClassifier } from './classifier';
import { TaskGenerator } from './task-generator';
import { VibeKanbanClient } from './mcp-client';
import { SYSTEM_PROMPTS } from '../config/settings';
import type { TaskClassification, Subtask } from '../types';

export interface OrchestratorInput {
  userRequest: string;
  context?: string;
  projectPath?: string;
  autoStart?: boolean; // Automatically start task attempts
}

export class Orchestrator {
  private classifier: TaskClassifier;
  private generator: TaskGenerator;
  private vibeClient: VibeKanbanClient;
  private projectId: string;

  constructor(projectId?: string) {
    this.classifier = new TaskClassifier();
    this.generator = new TaskGenerator();
    this.vibeClient = new VibeKanbanClient();
    this.projectId = projectId || process.env.VIBE_KANBAN_PROJECT_ID || '';
  }

  /**
   * Main orchestration workflow
   */
  async orchestrate(input: OrchestratorInput): Promise<void> {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║   AI ORCHESTRATOR - TASK DELEGATION      ║');
    console.log('╚════════════════════════════════════════════╝\n');

    try {
      // Step 1: Get or create project
      if (!this.projectId) {
        this.projectId = await this.getDefaultProject();
      }

      // Step 2: Classify the task
      const classification = await this.classifier.classify({
        userRequest: input.userRequest,
        context: input.context,
        projectPath: input.projectPath,
      });

      // Step 3: Break down into subtasks
      const subtasks = await this.generator.breakdown({
        userRequest: input.userRequest,
        classification,
        context: input.context,
        projectPath: input.projectPath,
      });

      // Step 4: Create tasks in Vibe Kanban
      console.log('\n=== CREATING TASKS IN VIBE KANBAN ===\n');
      const taskIds: string[] = [];

      for (const subtask of subtasks) {
        const taskId = await this.vibeClient.createTask({
          project_id: this.projectId,
          title: subtask.title,
          description: this.formatTaskDescription(subtask),
        });

        taskIds.push(taskId);
        console.log(`✓ Created: "${subtask.title}" (${subtask.executor})`);
      }

      console.log(`\nCreated ${taskIds.length} task(s) successfully.`);

      // Step 5: Start task attempts if requested
      if (input.autoStart) {
        console.log('\n=== STARTING TASK EXECUTION ===\n');
        for (let i = 0; i < subtasks.length; i++) {
          const subtask = subtasks[i];
          const taskId = taskIds[i];

          // Skip if there are dependencies
          if (subtask.dependencies.length > 0) {
            console.log(`⊘ Waiting for dependencies: "${subtask.title}"`);
            continue;
          }

          const attemptId = await this.vibeClient.startTaskAttempt(
            taskId,
            subtask.executor === 'glm' ? 'codex' : subtask.executor // Use codex executor for now
          );
          console.log(`▶ Started: "${subtask.title}" (attempt: ${attemptId})`);
        }
      }

      // Step 6: Summary
      this.printSummary({
        classification,
        subtasks,
        taskIds,
      });

    } catch (error) {
      console.error('\n❌ Orchestrator error:', error);
      throw error;
    }
  }

  /**
   * Get the default project from Vibe Kanban
   */
  private async getDefaultProject(): Promise<string> {
    const projects = await this.vibeClient.listProjects();

    if (projects.length === 0) {
      throw new Error('No Vibe Kanban projects found. Please create one first.');
    }

    // Use the first project (or implement selection logic)
    const project = projects[0];
    console.log(`Using project: "${project.name}" (${project.id})`);
    return project.id;
  }

  /**
   * Format task description for Vibe Kanban
   */
  private formatTaskDescription(subtask: Subtask): string {
    let description = subtask.description;

    // Add acceptance criteria
    if (subtask.acceptanceCriteria.length > 0) {
      description += '\n\n### Acceptance Criteria\n';
      subtask.acceptanceCriteria.forEach((criteria, i) => {
        description += `${i + 1}. [ ] ${criteria}\n`;
      });
    }

    // Add dependencies
    if (subtask.dependencies.length > 0) {
      description += `\n### Dependencies\n`;
      subtask.dependencies.forEach((dep) => {
        description += `- ${dep}\n`;
      });
    }

    // Add executor recommendation
    description += `\n### Executor\n`;
    description += `Recommended: **${subtask.executor.toUpperCase()}**\n`;

    // Add complexity indicator
    description += `\n### Complexity\n`;
    description += `Level: ${subtask.complexity}/5\n`;

    return description;
  }

  /**
   * Print orchestration summary
   */
  private printSummary(data: {
    classification: TaskClassification;
    subtasks: Subtask[];
    taskIds: string[];
  }): void {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║            ORCHESTRATION SUMMARY          ║');
    console.log('╚════════════════════════════════════════════╝\n');

    console.log('Task Classification:');
    console.log(`  Complexity: ${data.classification.complexity}/5`);
    console.log(`  Category: ${data.classification.category}`);
    console.log(`  Executor: ${data.classification.recommendedExecutor}`);
    console.log(`  Estimated Time: ${data.classification.estimatedTime} minutes`);
    console.log(`  Estimated Tokens: ${data.classification.estimatedTokens}`);

    console.log('\nSubtasks Created:');
    data.subtasks.forEach((subtask, i) => {
      const taskId = data.taskIds[i];
      console.log(`\n  ${i + 1}. ${subtask.title}`);
      console.log(`     ID: ${taskId}`);
      console.log(`     Executor: ${subtask.executor}`);
      console.log(`     Complexity: ${subtask.complexity}/5`);
      console.log(`     Dependencies: ${subtask.dependencies.length || 'None'}`);
    });

    console.log('\n─────────────────────────────────────────────\n');

    if (!data.subtasks.some((st) => st.executor === 'glm')) {
      console.log('⚠️  Note: No tasks delegated to GLM. Consider breaking down further.');
    }

    const glmCount = data.subtasks.filter((st) => st.executor === 'glm').length;
    const codexCount = data.subtasks.filter((st) => st.executor === 'codex').length;
    const opusCount = data.subtasks.filter((st) => st.executor === 'opus').length;

    console.log(`\nExecutor Distribution:`);
    console.log(`  GLM: ${glmCount} task(s)`);
    console.log(`  Codex: ${codexCount} task(s)`);
    console.log(`  Opus: ${opusCount} task(s)`);

    console.log('\n💡 Next Steps:');
    console.log('  1. Review tasks in Vibe Kanban');
    console.log('  2. Start GLM worker(s) to claim tasks');
    console.log('  3. Monitor progress and review outputs');
    console.log('  4. Approve or request revisions\n');
  }

  /**
   * List all tasks in the project
   */
  async listTasks(status?: 'todo' | 'in_progress' | 'review_required' | 'done'): Promise<void> {
    if (!this.projectId) {
      this.projectId = await this.getDefaultProject();
    }

    const tasks = await this.vibeClient.listTasks(this.projectId, status);

    console.log(`\n=== TASKS ${status ? `(${status})` : ''} ===\n`);

    if (tasks.length === 0) {
      console.log('No tasks found.\n');
      return;
    }

    tasks.forEach((task, i) => {
      console.log(`${i + 1}. ${task.title}`);
      console.log(`   Status: ${task.status}`);
      console.log(`   ID: ${task.id}`);
      console.log(`   Created: ${new Date(task.created_at).toLocaleString()}`);
      console.log('');
    });
  }
}

/**
 * CLI entry point
 */
export async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage:
  npm run orchestrate "your task description"
  npm run orchestrate "your task" --auto-start
  npm run orchestrate status

Examples:
  npm run orchestrate "Add user authentication"
  npm run orchestrate "Write tests for the API" --auto-start
  npm run orchestrate status
    `);
    return;
  }

  const orchestrator = new Orchestrator();

  if (args[0] === 'status') {
    await orchestrator.listTasks();
    return;
  }

  const userRequest = args[0];
  const autoStart = args.includes('--auto-start');

  await orchestrator.orchestrate({
    userRequest,
    context: 'Lumelle affiliate landing project',
    projectPath: process.cwd(),
    autoStart,
  });
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
