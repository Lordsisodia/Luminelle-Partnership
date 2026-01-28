/**
 * Lumelle Agent Hub - Main Entry Point
 * Multi-agent orchestration system for complex task execution
 */

import { OrchestratorAgent } from './core/orchestrator.js';
import { CodingAgent } from './workers/coding-agent.js';
import { getMessageBus } from './core/message-bus.js';
import { getLLMClient } from './core/llm-client.js';
import type { AgentRole, Task, AgentEvent, EventType } from './core/types.js';

export class AgentHub {
  private orchestrator: OrchestratorAgent;
  private agents: Map<AgentRole, any> = new Map();
  private started = false;

  constructor() {
    this.orchestrator = new OrchestratorAgent();
  }

  /**
   * Start the agent hub
   */
  async start(): Promise<void> {
    if (this.started) {
      console.log('[AgentHub] Already started');
      return;
    }

    console.log('[AgentHub] Starting...');

    // Initialize agents
    await this.orchestrator.start();
    this.agents.set(this.orchestrator.getRole(), this.orchestrator);

    // Start worker agents
    const codingAgent = new CodingAgent();
    await codingAgent.start();
    this.agents.set(codingAgent.getRole(), codingAgent);

    // TODO: Add more agents as they're implemented
    // const researchAgent = new ResearchAgent();
    // await researchAgent.start();
    // this.agents.set(researchAgent.getRole(), researchAgent);

    this.started = true;
    console.log('[AgentHub] Started with agents:', Array.from(this.agents.keys()));
  }

  /**
   * Stop the agent hub
   */
  async stop(): Promise<void> {
    if (!this.started) {
      return;
    }

    console.log('[AgentHub] Stopping...');

    for (const agent of this.agents.values()) {
      await agent.stop();
    }

    this.agents.clear();
    this.started = false;

    console.log('[AgentHub] Stopped');
  }

  /**
   * Process a user request - main API
   */
  async processRequest(
    userMessage: string,
    context?: Record<string, any>
  ): Promise<string> {
    if (!this.started) {
      throw new Error('AgentHub is not started. Call start() first.');
    }

    console.log(`[AgentHub] Processing request: ${userMessage.substring(0, 100)}...`);

    return await this.orchestrator.processRequest(userMessage, context);
  }

  /**
   * Get status of all agents
   */
  getStatus(): {
    started: boolean;
    agents: Array<{
      role: AgentRole;
      status: string;
      currentTask?: Task;
    }>;
    orchestratorTasks: any;
  } {
    return {
      started: this.started,
      agents: Array.from(this.agents.values()).map((agent) => ({
        role: agent.getRole(),
        status: agent.getStatus(),
        currentTask: agent.currentTask,
      })),
      orchestratorTasks: this.orchestrator.getStatusReport(),
    };
  }

  /**
   * Subscribe to events
   */
  on(eventType: EventType, callback: (event: AgentEvent) => void): void {
    const messageBus = getMessageBus();
    messageBus.addEventListener(
      `listener-${Date.now()}-${Math.random()}`,
      callback
    );
  }

  /**
   * Get usage statistics from the LLM client
   */
  getUsageStats() {
    const llmClient = getLLMClient();
    return {
      models: llmClient.getUsageStats(),
      totalCost: llmClient.getTotalCost(),
    };
  }
}

// =====================================================
// Singleton instance
// =====================================================

let agentHubInstance: AgentHub | null = null;

export async function getAgentHub(): Promise<AgentHub> {
  if (!agentHubInstance) {
    agentHubInstance = new AgentHub();
    await agentHubInstance.start();
  }
  return agentHubInstance;
}

export function resetAgentHub(): void {
  agentHubInstance = null;
}

// =====================================================
// CLI Interface
// =====================================================

export async function runAgentCLI() {
  const hub = await getAgentHub();

  console.log(`
╔═══════════════════════════════════════════════════════╗
║          Lumelle Agent Hub - Interactive Mode        ║
╚═══════════════════════════════════════════════════════╝

Type your tasks and the agent hub will coordinate
specialist agents to complete them.

Commands:
  /status    - Show agent status
  /usage     - Show usage statistics
  /quit      - Exit

Ready!
`);

  // Simple readline interface
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  };

  while (true) {
    const input = await askQuestion('\n> ');

    if (input.trim() === '/quit') {
      break;
    }

    if (input.trim() === '/status') {
      console.log('\nStatus:', JSON.stringify(hub.getStatus(), null, 2));
      continue;
    }

    if (input.trim() === '/usage') {
      console.log('\nUsage:', JSON.stringify(hub.getUsageStats(), null, 2));
      continue;
    }

    if (input.trim()) {
      try {
        console.log('\nProcessing...\n');
        const result = await hub.processRequest(input);
        console.log('\nResult:', result);
      } catch (error) {
        console.error('\nError:', error instanceof Error ? error.message : error);
      }
    }
  }

  rl.close();
  await hub.stop();
  console.log('\nGoodbye!');
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAgentCLI().catch(console.error);
}
