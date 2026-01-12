/**
 * Task Classifier
 * Uses LLM to analyze and classify task complexity
 */

import type { TaskClassification } from '../types';
import { SYSTEM_PROMPTS } from '../config/settings';

export interface ClassificationInput {
  userRequest: string;
  context?: string;
  projectPath?: string;
}

export class TaskClassifier {
  private model: string;

  constructor(model: string = 'gpt-5.1-codex-max') {
    this.model = model;
  }

  /**
   * Classify a task's complexity and determine execution strategy
   */
  async classify(input: ClassificationInput): Promise<TaskClassification> {
    console.log('\n=== CLASSIFYING TASK ===');
    console.log(`Request: "${input.userRequest}"`);
    console.log(`Model: ${this.model}`);

    // In a real implementation, this would call the LLM API
    // For now, we'll use a simple heuristic classification
    const classification = this.heuristicClassify(input);

    console.log(`\nClassification Result:`);
    console.log(`- Complexity: ${classification.complexity}/5`);
    console.log(`- Category: ${classification.category}`);
    console.log(`- Executor: ${classification.recommendedExecutor}`);
    console.log(`- Estimated Time: ${classification.estimatedTime}min`);
    console.log(`- Reasoning: ${classification.reasoning}`);
    console.log('=====================\n');

    return classification;
  }

  /**
   * Heuristic classification (fallback for prototype)
   * In production, this would use an LLM call
   */
  private heuristicClassify(input: ClassificationInput): TaskClassification {
    const request = input.userRequest.toLowerCase();
    const words = request.split(/\s+/);

    // Count complexity indicators
    const complexityScore = this.calculateComplexityScore(request);

    // Determine category
    const category = this.determineCategory(request);

    // Determine executor based on complexity
    let recommendedExecutor: 'codex' | 'glm' | 'opus';
    if (complexityScore <= 2) {
      recommendedExecutor = 'glm';
    } else if (complexityScore <= 4) {
      recommendedExecutor = 'codex';
    } else {
      recommendedExecutor = 'opus';
    }

    // Estimate tokens
    const estimatedTokens = Math.max(1000, words.length * 2 + complexityScore * 500);

    // Estimate time (minutes)
    const estimatedTime = Math.max(5, complexityScore * 10);

    return {
      complexity: complexityScore,
      category,
      estimatedTokens,
      estimatedTime,
      recommendedExecutor,
      reasoning: this.generateReasoning(request, complexityScore, category),
    };
  }

  /**
   * Calculate complexity score from 1-5
   */
  private calculateComplexityScore(request: string): number {
    let score = 1;

    // Simple indicators
    if (/write|create|add|implement|generate/.test(request)) score += 0.5;
    if (/function|component|page|endpoint/.test(request)) score += 0.5;

    // Medium complexity
    if (/refactor|optimize|improve|update|modify/.test(request)) score += 1;
    if (/api|database|integration|authentication/.test(request)) score += 1;

    // High complexity
    if (/architecture|design|system|security|performance/.test(request)) score += 1.5;
    if (/multiple|several|various|complex/.test(request)) score += 1;

    return Math.min(5, Math.max(1, Math.round(score)));
  }

  /**
   * Determine task category
   */
  private determineCategory(request: string): TaskClassification['category'] {
    if (/test|spec|coverage/.test(request)) return 'test';
    if (/doc|readme|comment|documentation/.test(request)) return 'docs';
    if (/boilerplate|template|scaffold/.test(request)) return 'boilerplate';
    if (/bug|fix|issue|error/.test(request)) return 'bugfix';
    if (/refactor|clean|improve.*code/.test(request)) return 'refactor';
    if (/architecture|design|structure/.test(request)) return 'architecture';
    return 'feature';
  }

  /**
   * Generate reasoning for classification
   */
  private generateReasoning(
    request: string,
    complexity: number,
    category: TaskClassification['category']
  ): string {
    const reasons = [];

    if (complexity <= 2) {
      reasons.push('Task appears well-defined and straightforward');
      reasons.push('Follows common patterns');
      reasons.push('Suitable for delegation to GLM worker');
    } else if (complexity <= 4) {
      reasons.push('Task requires some context and decision-making');
      reasons.push('May involve multiple components');
      reasons.push('Best handled by Codex with clear specifications');
    } else {
      reasons.push('High complexity requiring architectural thinking');
      reasons.push('May have security or performance implications');
      reasons.push('Requires senior model (Codex or Opus)');
    }

    return reasons.join('. ');
  }

  /**
   * In production, call the actual LLM for classification
   */
  private async llmClassify(input: ClassificationInput): Promise<TaskClassification> {
    // TODO: Implement actual LLM API call
    // This would use OpenAI SDK or similar
    const prompt = `
Classify this task:
${input.userRequest}

${input.context ? `Context: ${input.context}` : ''}

${input.projectPath ? `Project: ${input.projectPath}` : ''}

Return JSON with complexity, category, reasoning, estimatedTokens, estimatedTime, recommendedExecutor.
`;

    // Mock response for now
    return this.heuristicClassify(input);
  }
}
