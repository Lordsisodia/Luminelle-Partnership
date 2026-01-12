/**
 * Type definitions for AI Orchestrator system
 */

export interface TaskClassification {
  complexity: number; // 1-5
  category: 'boilerplate' | 'feature' | 'bugfix' | 'refactor' | 'docs' | 'test' | 'architecture';
  estimatedTokens: number;
  estimatedTime: number; // minutes
  recommendedExecutor: 'codex' | 'glm' | 'opus';
  reasoning: string;
}

export interface Subtask {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  files: string[];
  dependencies: string[];
  estimatedTokens: number;
  complexity: number;
  executor: 'codex' | 'glm' | 'opus';
}

export interface VibeKanbanProject {
  id: string;
  name: string;
  description?: string;
}

export interface VibeKanbanTask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review_required' | 'done' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  project_id: string;
  title: string;
  description: string;
}

export interface TaskUpdates {
  title?: string;
  description?: string;
  status?: VibeKanbanTask['status'];
}

export interface TaskAttempt {
  id: string;
  task_id: string;
  executor: string;
  base_branch: string;
  status: string;
}

export interface OrchestratorConfig {
  vibeKanban: {
    enabled: boolean;
    projectId?: string;
    pollingInterval: number;
  };
  models: {
    orchestrator: {
      provider: string;
      model: string;
      maxTokens: number;
    };
    worker: {
      provider: string;
      model: string;
      maxTokens: number;
    };
  };
}

export interface WorkerConfig {
  model: 'glm' | 'codex' | 'opus';
  pollingInterval: number;
  maxConcurrentTasks: number;
}
