/**
 * Lumelle Agent Hub - Message Bus for Agent Communication
 */

import type {
  AgentMessage,
  AgentRole,
  MessageType,
  EventListener,
  AgentEvent,
  EventType,
} from './types.js';

type MessageHandler = (message: AgentMessage) => void | Promise<void>;

export class MessageBus {
  private agents: Map<AgentRole, MessageHandler> = new Map();
  private eventListeners: Map<EventType, EventListener[]> = new Map();
  private messageHistory: AgentMessage[] = [];
  private maxHistorySize = 1000;

  /**
   * Register an agent to receive messages
   */
  register(role: AgentRole, handler: MessageHandler): void {
    this.agents.set(role, handler);
    this.emit({
      type: 'agent_status_changed' as EventType,
      timestamp: new Date(),
      agent: role,
      data: { status: 'registered' },
    });
  }

  /**
   * Unregister an agent
   */
  unregister(role: AgentRole): void {
    this.agents.delete(role);
    this.emit({
      type: 'agent_status_changed' as EventType,
      timestamp: new Date(),
      agent: role,
      data: { status: 'unregistered' },
    });
  }

  /**
   * Send a message to specific agent(s)
   */
  async send(message: AgentMessage): Promise<void> {
    this.addToHistory(message);
    this.emit({
      type: 'message_sent' as EventType,
      timestamp: new Date(),
      agent: message.from,
      data: { to: message.to, messageType: message.type },
    });

    const recipients = Array.isArray(message.to) ? message.to : [message.to];

    for (const recipient of recipients) {
      const handler = this.agents.get(recipient);

      if (!handler) {
        console.warn(`[MessageBus] No handler registered for agent: ${recipient}`);
        continue;
      }

      try {
        await handler(message);
      } catch (error) {
        console.error(`[MessageBus] Error in ${recipient} handler:`, error);
        this.emit({
          type: 'error' as EventType,
          timestamp: new Date(),
          agent: recipient,
          data: { error, message },
        });
      }
    }
  }

  /**
   * Broadcast a message to all registered agents
   */
  async broadcast(message: Omit<AgentMessage, 'to'>): Promise<void> {
    const broadcastMessage: AgentMessage = {
      ...message,
      to: Array.from(this.agents.keys()),
    };

    await this.send(broadcastMessage);
  }

  /**
   * Send a request and wait for a response
   */
  async request<T = any>(
    from: AgentRole,
    to: AgentRole,
    task: any,
    timeout: number = 60000
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const messageId = crypto.randomUUID();
      const timeoutId = setTimeout(() => {
        this.removeEventListener(messageId);
        reject(new Error(`Request timeout: ${task.description || 'unnamed task'}`));
      }, timeout);

      // One-time listener for the response
      const responseListener = (event: AgentEvent) => {
        if (
          event.type === 'message_received' &&
          event.data?.originalMessageId === messageId
        ) {
          clearTimeout(timeoutId);
          this.removeEventListener(messageId);

          if (event.data?.error) {
            reject(event.data.error);
          } else {
            resolve(event.data.result);
          }
        }
      };

      this.addEventListener(messageId, responseListener);

      // Send the request
      this.send({
        id: messageId,
        from,
        to,
        type: 'request' as MessageType,
        timestamp: new Date(),
        task,
      }).catch((error) => {
        clearTimeout(timeoutId);
        this.removeEventListener(messageId);
        reject(error);
      });
    });
  }

  /**
   * Add an event listener
   */
  addEventListener(label: string, listener: EventListener): void {
    // Store listener with a unique label for removal
    if (!this.eventListeners.has(label)) {
      this.eventListeners.set(label, []);
    }
    this.eventListeners.get(label)!.push(listener);
  }

  /**
   * Remove an event listener by label
   */
  removeEventListener(label: string): void {
    this.eventListeners.delete(label);
  }

  /**
   * Emit an event to all listeners
   */
  private emit(event: AgentEvent): void {
    for (const listeners of this.eventListeners.values()) {
      for (const listener of listeners) {
        try {
          listener(event);
        } catch (error) {
          console.error('[MessageBus] Error in event listener:', error);
        }
      }
    }
  }

  /**
   * Add message to history
   */
  private addToHistory(message: AgentMessage): void {
    this.messageHistory.push(message);

    // Keep only the last N messages
    if (this.messageHistory.length > this.maxHistorySize) {
      this.messageHistory.shift();
    }
  }

  /**
   * Get message history
   */
  getHistory(limit?: number): AgentMessage[] {
    if (limit) {
      return this.messageHistory.slice(-limit);
    }
    return [...this.messageHistory];
  }

  /**
   * Get messages involving a specific agent
   */
  getAgentHistory(role: AgentRole, limit?: number): AgentMessage[] {
    const filtered = this.messageHistory.filter(
      (msg) =>
        msg.from === role ||
        (Array.isArray(msg.to) ? msg.to.includes(role) : msg.to === role)
    );

    return limit ? filtered.slice(-limit) : filtered;
  }

  /**
   * Get messages for a specific conversation/task
   */
  getConversation(taskId: string): AgentMessage[] {
    return this.messageHistory.filter(
      (msg) => msg.task?.id === taskId || msg.metadata?.taskId === taskId
    );
  }

  /**
   * Clear message history
   */
  clearHistory(): void {
    this.messageHistory = [];
  }

  /**
   * Get registered agents
   */
  getRegisteredAgents(): AgentRole[] {
    return Array.from(this.agents.keys());
  }

  /**
   * Check if an agent is registered
   */
  hasAgent(role: AgentRole): boolean {
    return this.agents.has(role);
  }
}

// =====================================================
// Singleton instance
// =====================================================

let messageBusInstance: MessageBus | null = null;

export function getMessageBus(): MessageBus {
  if (!messageBusInstance) {
    messageBusInstance = new MessageBus();
  }
  return messageBusInstance;
}

export function resetMessageBus(): void {
  messageBusInstance = null;
}
