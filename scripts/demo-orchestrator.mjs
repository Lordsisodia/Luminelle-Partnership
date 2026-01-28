#!/usr/bin/env node
/**
 * Demo: Agent Hub Orchestration (No API keys required)
 * Shows how the orchestrator breaks down tasks
 */

const ANSI_GREEN = '\x1b[32m';
const ANSI_BLUE = '\x1b[34m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_RESET = '\x1b[0m';

// Simulated Agent Hub
class DemoAgentHub {
  constructor() {
    this.agents = {
      ORCHESTRATOR: {
        name: 'Orchestrator',
        model: 'GLM Plan 1',
        color: ANSI_CYAN,
      },
      CODING: {
        name: 'Coding Agent',
        model: 'GLM Plan 2',
        color: ANSI_GREEN,
      },
      RESEARCH: {
        name: 'Research Agent',
        model: 'Gemini',
        color: ANSI_BLUE,
      },
      TEST: {
        name: 'Test Agent',
        model: 'GLM Plan 2',
        color: ANSI_YELLOW,
      },
      REVIEW: {
        name: 'Review Agent',
        model: 'GLM Plan 2',
        color: ANSI_RESET,
      },
    };
  }

  async processRequest(userTask) {
    console.log(`\n${this.agents.ORCHESTRATOR.color}╔════════════════════════════════════════════════════════════╗${ANSI_RESET}`);
    console.log(`${this.agents.ORCHESTRATOR.color}║  ORCHESTRATOR: Processing Request                          ║${ANSI_RESET}`);
    console.log(`${this.agents.ORCHESTRATOR.color}╚════════════════════════════════════════════════════════════╝${ANSI_RESET}`);
    console.log(`\n📝 Task: "${userTask}"`);

    // Step 1: Analyze and decompose
    console.log(`\n${this.agents.ORCHESTRATOR.color}[ORCHESTRATOR]${ANSI_RESET} 🤔 Analyzing task...`);

    const plan = this.decomposeTask(userTask);
    console.log(`\n${this.agents.ORCHESTRATOR.color}[ORCHESTRATOR]${ANSI_RESET} ✅ Plan created with ${plan.length} subtasks:\n`);

    for (const [i, step] of plan.entries()) {
      const agent = this.agents[step.agent];
      const dependency = step.dependsOn ? ` (after: ${step.dependsOn.join(', ')})` : '';
      console.log(`   ${ANSI_CYAN}[${i + 1}]${ANSI_RESET} ${agent.color}${step.agent}${ANSI_RESET}: ${step.description}${dependency}`);
    }

    // Step 2: Execute with dependency management
    console.log(`\n${this.agents.ORCHESTRATOR.color}[ORCHESTRATOR]${ANSI_RESET} 🚀 Executing plan...\n`);

    const results = [];
    const completed = new Set();

    for (const step of plan) {
      // Wait for dependencies
      if (step.dependsOn) {
        while (!step.dependsOn.every(d => completed.has(d))) {
          await this.sleep(100);
        }
      }

      const agent = this.agents[step.agent];
      console.log(`${agent.color}[${step.agent}]${ANSI_RESET} ⚡ Executing: ${step.description}`);

      // Simulate work
      await this.sleep(500 + Math.random() * 500);

      const result = this.simulateAgentWork(step);
      results.push(result);
      completed.add(step.id);

      console.log(`${agent.color}[${step.agent}]${ANSI_RESET} ✅ Complete\n`);
    }

    // Step 3: Aggregate results
    console.log(`${this.agents.ORCHESTRATOR.color}[ORCHESTRATOR]${ANSI_RESET} 📊 Aggregating results...\n`);

    const summary = this.createSummary(userTask, results);
    console.log(`${ANSI_GREEN}═══════════════════════════════════════════════════════════${ANSI_RESET}`);
    console.log(`${ANSI_GREEN}                    SUMMARY${ANSI_RESET}`);
    console.log(`${ANSI_GREEN}═══════════════════════════════════════════════════════════${ANSI_RESET}\n`);
    console.log(summary);

    return summary;
  }

  decomposeTask(task) {
    // Predefined patterns for demo
    const patterns = [
      {
        keywords: ['form', 'signup', 'contact'],
        plan: [
          { id: '1', agent: 'RESEARCH', description: 'Research form best practices', dependsOn: [] },
          { id: '2', agent: 'CODING', description: 'Create form component', dependsOn: ['1'] },
          { id: '3', agent: 'CODING', description: 'Add form validation', dependsOn: ['2'] },
          { id: '4', agent: 'TEST', description: 'Write form tests', dependsOn: ['3'] },
          { id: '5', agent: 'REVIEW', description: 'Review accessibility', dependsOn: ['4'] },
        ]
      },
      {
        keywords: ['api', 'endpoint', 'backend'],
        plan: [
          { id: '1', agent: 'RESEARCH', description: 'Research API patterns', dependsOn: [] },
          { id: '2', agent: 'CODING', description: 'Create endpoint handler', dependsOn: ['1'] },
          { id: '3', agent: 'CODING', description: 'Add error handling', dependsOn: ['2'] },
          { id: '4', agent: 'TEST', description: 'Write API tests', dependsOn: ['3'] },
          { id: '5', agent: 'REVIEW', description: 'Review security', dependsOn: ['4'] },
        ]
      },
      {
        keywords: ['component', 'ui', 'feature'],
        plan: [
          { id: '1', agent: 'RESEARCH', description: 'Research component patterns', dependsOn: [] },
          { id: '2', agent: 'CODING', description: 'Build component structure', dependsOn: ['1'] },
          { id: '3', agent: 'CODING', description: 'Add styling', dependsOn: ['2'] },
          { id: '4', agent: 'TEST', description: 'Write component tests', dependsOn: ['3'] },
          { id: '5', agent: 'REVIEW', description: 'Review code quality', dependsOn: ['4'] },
        ]
      }
    ];

    const taskLower = task.toLowerCase();
    for (const pattern of patterns) {
      if (pattern.keywords.some(k => taskLower.includes(k))) {
        return pattern.plan;
      }
    }

    // Default plan
    return [
      { id: '1', agent: 'RESEARCH', description: 'Research requirements', dependsOn: [] },
      { id: '2', agent: 'CODING', description: 'Implement solution', dependsOn: ['1'] },
      { id: '3', agent: 'TEST', description: 'Test implementation', dependsOn: ['2'] },
      { id: '4', agent: 'REVIEW', description: 'Review and finalize', dependsOn: ['3'] },
    ];
  }

  simulateAgentWork(step) {
    const outputs = {
      RESEARCH: [
        '✓ Found 5 relevant documentation sources',
        '✓ Analyzed 3 similar implementations',
        '✓ Documented best practices and patterns',
      ],
      CODING: [
        '✓ Created TypeScript interfaces',
        '✓ Implemented core functionality',
        '✓ Added error handling',
      ],
      TEST: [
        '✓ Wrote 3 unit tests',
        '✓ Added edge case coverage',
        '✓ All tests passing',
      ],
      REVIEW: [
        '✓ Code follows project conventions',
        '✓ No security issues found',
        '✓ Ready for deployment',
      ],
    };

    return {
      agent: step.agent,
      output: outputs[step.agent] || ['✓ Task completed'],
    };
  }

  createSummary(task, results) {
    return `${ANSI_CYAN}Task:${ANSI_RESET} ${task}

${ANSI_GREEN}✨ Completed Subtasks:${ANSI_RESET} ${results.length}

${ANSI_BLUE}📊 Agent Usage:${ANSI_RESET}
${Object.entries(this.agents).map(([key, agent]) => {
  const count = results.filter(r => r.agent === key).length;
  return `   ${agent.color}${key}${ANSI_RESET}: ${count} task(s) using ${agent.model}`;
}).join('\n')}

${ANSI_YELLOW}🔄 Parallel Execution:${ANSI_RESET}
   Tasks were executed based on dependencies for optimal performance.

${ANSI_GREEN}💡 Next Steps:${ANSI_RESET}
   • Review generated code in src/
   • Run tests with: npm test
   • Commit changes with: git commit
`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Demo scenarios
const scenarios = [
  "Add a newsletter signup form to the homepage",
  "Create a user authentication endpoint",
  "Build a dark mode toggle component",
];

async function main() {
  console.log(`\n╔══════════════════════════════════════════════════════════════╗`);
  console.log(`║     🤖 Lumelle Agent Hub - Orchestration Demo             ║`);
  console.log(`║     (No API keys required - shows workflow only)          ║`);
  console.log(`╚══════════════════════════════════════════════════════════════╝`);

  const hub = new DemoAgentHub();

  // Run first scenario
  await hub.processRequest(scenarios[0]);

  console.log(`\n${ANSI_CYAN}─────────────────────────────────────────────────────────────────${ANSI_RESET}`);
  console.log(`${ANSI_YELLOW}💡 Try other scenarios:${ANSI_RESET}`);
  scenarios.slice(1).forEach(s => console.log(`   • "${s}"`));
  console.log(`${ANSI_CYAN}─────────────────────────────────────────────────────────────────${ANSI_RESET}\n`);
}

main().catch(console.error);
