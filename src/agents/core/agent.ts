/**
 * Lumelle Agent Hub - Base Agent Class
 */

import type {
  AgentConfig,
  AgentRole,
  AgentStatus,
  Task,
  TaskStatus,
  ChatMessage,
  Tool,
  AgentMessage,
  MessageType,
} from './types.js';
import { getLLMClient } from './llm-client.js';
import { getMessageBus } from './message-bus.js';

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected status: AgentStatus = 'idle' as AgentStatus;
  protected currentTask: Task | null = null;
  protected conversationHistory: ChatMessage[] = [];
  protected messageBus = getMessageBus();
  protected llmClient = getLLMClient();

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * Get the agent's role
   */
  getRole(): AgentRole {
    return this.config.role;
  }

  /**
   * Get the agent's current status
   */
  getStatus(): AgentStatus {
    return this.status;
  }

  /**
   * Update the agent's status
   */
  protected setStatus(status: AgentStatus): void {
    const oldStatus = this.status;
    this.status = status;
    console.log(`[${this.config.name}] Status: ${oldStatus} -> ${status}`);
  }

  /**
   * Get the agent's configuration
   */
  getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Start the agent - register with message bus
   */
  async start(): Promise<void> {
    this.messageBus.register(this.config.role, this.handleMessage.bind(this));
    this.setStatus('idle' as AgentStatus);
    console.log(`[${this.config.name}] Agent started`);
  }

  /**
   * Stop the agent - unregister from message bus
   */
  async stop(): Promise<void> {
    this.messageBus.unregister(this.config.role);
    this.setStatus('idle' as AgentStatus);
    console.log(`[${this.config.name}] Agent stopped`);
  }

  /**
   * Handle incoming message from message bus
   */
  protected async handleMessage(message: AgentMessage): Promise<void> {
    console.log(`[${this.config.name}] Received message from ${message.from}`);

    try {
      switch (message.type) {
        case 'request':
          await this.handleRequest(message);
          break;
        case 'response':
          await this.handleResponse(message);
          break;
        case 'broadcast':
          await this.handleBroadcast(message);
          break;
        case 'notification':
          await this.handleNotification(message);
          break;
        default:
          console.warn(`[${this.config.name}] Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error(`[${this.config.name}] Error handling message:`, error);

      // Send error response back
      if (message.type === 'request') {
        await this.messageBus.send({
          id: crypto.randomUUID(),
          from: this.config.role,
          to: message.from,
          type: 'error' as MessageType,
          timestamp: new Date(),
          task: message.task,
          error: error instanceof Error ? error : new Error(String(error)),
          metadata: { originalMessageId: message.id },
        });
      }
    }
  }

  /**
   * Handle a request message
   */
  protected async handleRequest(message: AgentMessage): Promise<void> {
    if (!message.task) {
      console.warn(`[${this.config.name}] Request message has no task`);
      return;
    }

    this.setStatus('working' as AgentStatus);
    this.currentTask = message.task;

    try {
      const result = await this.executeTask(message.task);

      // Send response back
      await this.messageBus.send({
        id: crypto.randomUUID(),
        from: this.config.role,
        to: message.from,
        type: 'response' as MessageType,
        timestamp: new Date(),
        task: message.task,
        result,
        metadata: { originalMessageId: message.id },
      });
    } finally {
      this.currentTask = null;
      this.setStatus('idle' as AgentStatus);
    }
  }

  /**
   * Handle a response message
   */
  protected async handleResponse(message: AgentMessage): Promise<void> {
    // Default implementation - override in subclasses if needed
    console.log(`[${this.config.name}] Received response:`, message.result);
  }

  /**
   * Handle a broadcast message
   */
  protected async handleBroadcast(message: AgentMessage): Promise<void> {
    // Default implementation - override in subclasses if needed
    console.log(`[${this.config.name}] Received broadcast:`, message.metadata);
  }

  /**
   * Handle a notification message
   */
  protected async handleNotification(message: AgentMessage): Promise<void> {
    // Default implementation - override in subclasses if needed
    console.log(`[${this.config.name}] Received notification:`, message.metadata);
  }

  /**
   * Execute a task - to be implemented by subclasses
   */
  protected abstract executeTask(task: Task): Promise<any>;

  /**
   * Make an LLM call with the agent's model
   */
  protected async callLLM(
    messages: ChatMessage[],
    options?: {
      tools?: Tool[];
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const modelName = this.getModelForTier();

    const response = await this.llmClient.chatCompletion({
      model: modelName,
      messages: [
        { role: 'system', content: this.config.systemPrompt },
        ...messages,
      ],
      tools: options?.tools || this.config.tools,
      temperature: options?.temperature,
      maxTokens: options?.maxTokens,
    });

    // Handle tool calls if present
    if (response.toolCalls && response.toolCalls.length > 0) {
      return await this.handleToolCalls(response.toolCalls, messages);
    }

    return response.content;
  }

  /**
   * Handle tool calls from LLM response
   */
  protected async handleToolCalls(
    toolCalls: any[],
    previousMessages: ChatMessage[]
  ): Promise<string> {
    const toolResults: any[] = [];

    for (const toolCall of toolCalls) {
      const tool = this.config.tools.find((t) => t.name === toolCall.function.name);

      if (!tool) {
        console.warn(`[${this.config.name}] Tool not found: ${toolCall.function.name}`);
        continue;
      }

      try {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await tool.handler(args);
        toolResults.push({
          tool_call_id: toolCall.id,
          result,
        });
      } catch (error) {
        toolResults.push({
          tool_call_id: toolCall.id,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Make another call with tool results
    const response = await this.llmClient.chatCompletion({
      model: this.getModelForTier(),
      messages: [
        { role: 'system', content: this.config.systemPrompt },
        ...previousMessages,
        {
          role: 'assistant',
          content: '',
          toolCalls: toolCalls,
        },
        ...toolResults.map((r) => ({
          role: 'tool' as const,
          content: r.error ? JSON.stringify({ error: r.error }) : JSON.stringify(r.result),
          toolCallId: r.tool_call_id,
        })),
      ],
      tools: this.config.tools,
    });

    return response.content;
  }

  /**
   * Get the model name for this agent's tier
   */
  protected getModelForTier(): string {
    switch (this.config.modelTier) {
      case 'smart':
        return 'orchestrator';
      case 'standard':
        return 'worker';
      case 'specialized':
        return 'researcher';
      case 'backup':
        return 'fallback';
      default:
        return 'worker';
    }
  }

  /**
   * Send a message to another agent
   */
  protected async sendTo(
    to: AgentRole | AgentRole[],
    messageType: MessageType,
    data?: any
  ): Promise<void> {
    await this.messageBus.send({
      id: crypto.randomUUID(),
      from: this.config.role,
      to,
      type: messageType,
      timestamp: new Date(),
      ...data,
    });
  }

  /**
   * Request another agent to perform a task
   */
  protected async requestFrom<T = any>(
    from: AgentRole,
    task: Task,
    timeout?: number
  ): Promise<T> {
    return this.messageBus.request(this.config.role, from, task, timeout);
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}
