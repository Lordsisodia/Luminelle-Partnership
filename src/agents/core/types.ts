/**
 * Lumelle Agent Hub - Core Type Definitions
 */

// =====================================================
// Agent Types
// =====================================================

export enum AgentRole {
  ORCHESTRATOR = 'orchestrator',
  CODING = 'coding',
  RESEARCH = 'research',
  TEST = 'test',
  REVIEW = 'review',
}

export enum AgentStatus {
  IDLE = 'idle',
  THINKING = 'thinking',
  WORKING = 'working',
  WAITING = 'waiting',
  ERROR = 'error',
}

export enum MessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
  BROADCAST = 'broadcast',
  ERROR = 'error',
  NOTIFICATION = 'notification',
}

// =====================================================
// Task Types
// =====================================================

export interface Task {
  id: string;
  type: string;
  description: string;
  context?: Record<string, any>;
  subtasks?: Task[];
  dependencies?: string[];
  status: TaskStatus;
  result?: any;
  error?: Error;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// =====================================================
// Message Types
// =====================================================

export interface AgentMessage {
  id: string;
  from: AgentRole;
  to: AgentRole | AgentRole[];
  type: MessageType;
  timestamp: Date;
  task?: Task;
  result?: any;
  error?: Error;
  metadata?: Record<string, any>;
}

export interface MessageRequest extends AgentMessage {
  type: MessageType.REQUEST;
  task: Task;
}

export interface MessageResponse extends AgentMessage {
  type: MessageType.RESPONSE;
  result?: any;
  originalMessageId: string;
}

// =====================================================
// LLM Client Types
// =====================================================

export enum ModelTier {
  SMART = 'smart',       // GLM Plan 1 - Orchestrator
  STANDARD = 'standard',  // GLM Plan 2 - Workers
  SPECIALIZED = 'specialized', // Gemini, etc.
  BACKUP = 'backup',
}

export interface ModelConfig {
  name: string;
  tier: ModelTier;
  provider: string;
  maxTokens: number;
  supportsTools: boolean;
  supportsVision: boolean;
}

export interface LLMRequest {
  model: string;
  messages: ChatMessage[];
  tools?: Tool[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  toolCallId?: string;
}

export interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface LLMResponse {
  content: string;
  toolCalls?: ToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

// =====================================================
// Tool Types
// =====================================================

export interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (params: any) => Promise<any>;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

// =====================================================
// Agent Config Types
// =====================================================

export interface AgentConfig {
  role: AgentRole;
  name: string;
  description: string;
  modelTier: ModelTier;
  systemPrompt: string;
  tools: Tool[];
  capabilities: string[];
  maxConcurrentTasks: number;
}

// =====================================================
// State Management Types
// =====================================================

export interface ConversationState {
  id: string;
  messages: ChatMessage[];
  currentTask?: Task;
  agentStates: Map<AgentRole, AgentState>;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentState {
  role: AgentRole;
  status: AgentStatus;
  currentTask?: Task;
  completedTasks: Task[];
  context: Record<string, any>;
}

// =====================================================
// Event Types
// =====================================================

export enum EventType {
  TASK_CREATED = 'task_created',
  TASK_STARTED = 'task_started',
  TASK_COMPLETED = 'task_completed',
  TASK_FAILED = 'task_failed',
  AGENT_STATUS_CHANGED = 'agent_status_changed',
  MESSAGE_SENT = 'message_sent',
  MESSAGE_RECEIVED = 'message_received',
  ERROR = 'error',
}

export interface AgentEvent {
  type: EventType;
  timestamp: Date;
  agent?: AgentRole;
  data?: any;
}

export type EventListener = (event: AgentEvent) => void;

// =====================================================
// Error Types
// =====================================================

export class AgentError extends Error {
  constructor(
    message: string,
    public role: AgentRole,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AgentError';
  }
}

export class TaskError extends Error {
  constructor(
    message: string,
    public task: Task,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'TaskError';
  }
}

export class RateLimitError extends Error {
  constructor(
    public model: string,
    public retryAfter?: number
  ) {
    super(`Rate limit exceeded for model: ${model}`);
    this.name = 'RateLimitError';
  }
}

// =====================================================
// Usage Tracking Types
// =====================================================

export interface UsageStats {
  model: string;
  tier: ModelTier;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

export interface AgentUsage {
  role: AgentRole;
  stats: UsageStats[];
  totalCost: number;
}
