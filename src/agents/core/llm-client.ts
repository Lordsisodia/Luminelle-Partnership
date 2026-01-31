/**
 * Lumelle Agent Hub - LiteLLM Client Wrapper
 */

import type {
  LLMRequest,
  LLMResponse,
  ChatMessage,
  ModelTier,
  UsageStats,
  RateLimitError,
} from './types.js';

interface LiteLLMConfig {
  baseURL: string;
  apiKey: string;
  timeout?: number;
}

interface LiteLLMErrorResponse {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

export class LLMClient {
  private config: LiteLLMConfig;
  private usageStats: Map<string, UsageStats>;

  constructor(config: LiteLLMConfig) {
    this.config = {
      ...config,
      timeout: config.timeout || 300000, // 5 minutes default
    };
    this.usageStats = new Map();
  }

  /**
   * Make a chat completion request to LiteLLM proxy
   */
  async chatCompletion(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.config.baseURL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          tools: request.tools,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens,
          stream: request.stream ?? false,
        }),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        const errorData = await response.json() as LiteLLMErrorResponse;
        this.handleErrorResponse(response.status, errorData);
      }

      const data = await response.json();
      const choice = data.choices[0];

      // Update usage stats
      this.updateUsageStats(request.model, data.usage);

      return {
        content: choice.message.content || '',
        toolCalls: choice.message.tool_calls,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        model: data.model,
      };
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw error;
      }
      throw new Error(`LLM request failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      const duration = Date.now() - startTime;
      console.log(`[LLMClient] Request to ${request.model} completed in ${duration}ms`);
    }
  }

  /**
   * Handle error responses from LiteLLM
   */
  private handleErrorResponse(status: number, errorData: LiteLLMErrorResponse): never {
    const { message, type, code } = errorData.error;

    if (status === 429 || code === 'rate_limit_exceeded') {
      // Extract retry-after if available
      const retryAfter = this.extractRetryAfter(message);
      throw new RateLimitError(errorData.error.type, retryAfter);
    }

    if (status === 500 || status === 502 || status === 503) {
      throw new Error(`LiteLLM proxy error: ${message}`);
    }

    throw new Error(`LLM API error (${status}): ${message}`);
  }

  /**
   * Extract retry-after duration from error message
   */
  private extractRetryAfter(message: string): number | undefined {
    const match = message.match(/retry after (\d+)/i);
    return match ? parseInt(match[1], 10) * 1000 : undefined;
  }

  /**
   * Update usage statistics for a model
   */
  private updateUsageStats(model: string, usage: any): void {
    const existing = this.usageStats.get(model) || {
      model,
      tier: this.inferTier(model),
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      estimatedCost: 0,
    };

    existing.requests++;
    existing.promptTokens += usage?.prompt_tokens || 0;
    existing.completionTokens += usage?.completion_tokens || 0;
    existing.totalTokens += usage?.total_tokens || 0;
    existing.estimatedCost = this.calculateCost(existing);

    this.usageStats.set(model, existing);
  }

  /**
   * Infer model tier from model name
   */
  private inferTier(model: string): ModelTier {
    if (model.includes('orchestrator')) return 'smart' as ModelTier;
    if (model.includes('gemini')) return 'specialized' as ModelTier;
    if (model.includes('kimi') || model.includes('claude')) return 'smart' as ModelTier;
    return 'standard' as ModelTier;
  }

  /**
   * Calculate estimated cost (rough estimates)
   */
  private calculateCost(stats: UsageStats): number {
    // GLM-4 pricing (approximate)
    const glmInputCost = 0.00015; // per 1K tokens
    const glmOutputCost = 0.0006; // per 1K tokens

    // Gemini pricing (approximate)
    const geminiInputCost = 0.000075;
    const geminiOutputCost = 0.0003;

    // Kimi 2.5 / Claude 3.5 Sonnet pricing (approximate)
    const kimiInputCost = 0.003; // per 1K tokens
    const kimiOutputCost = 0.015; // per 1K tokens

    const model = stats.model.toLowerCase();
    const isGemini = model.includes('gemini');
    const isKimi = model.includes('kimi') || model.includes('claude') || model.includes('sonnet');

    let inputCost = glmInputCost;
    let outputCost = glmOutputCost;

    if (isGemini) {
      inputCost = geminiInputCost;
      outputCost = geminiOutputCost;
    } else if (isKimi) {
      inputCost = kimiInputCost;
      outputCost = kimiOutputCost;
    }

    return (
      (stats.promptTokens / 1000) * inputCost +
      (stats.completionTokens / 1000) * outputCost
    );
  }

  /**
   * Get usage statistics for all models
   */
  getUsageStats(): UsageStats[] {
    return Array.from(this.usageStats.values());
  }

  /**
   * Get usage statistics for a specific model
   */
  getModelUsage(model: string): UsageStats | undefined {
    return this.usageStats.get(model);
  }

  /**
   * Get total estimated cost across all models
   */
  getTotalCost(): number {
    return Array.from(this.usageStats.values())
      .reduce((sum, stats) => sum + stats.estimatedCost, 0);
  }

  /**
   * Reset usage statistics
   */
  resetUsageStats(): void {
    this.usageStats.clear();
  }
}

// =====================================================
// Singleton instance
// =====================================================

let llmClientInstance: LLMClient | null = null;

export function getLLMClient(): LLMClient {
  if (!llmClientInstance) {
    const baseURL = process.env.LITELLM_PROXY_URL || 'http://localhost:4000';
    const apiKey = process.env.LITELLM_API_KEY || 'proxy-key';

    llmClientInstance = new LLMClient({ baseURL, apiKey });
  }

  return llmClientInstance;
}

export function resetLLMClient(): void {
  llmClientInstance = null;
}
