/**
 * Demo Script
 * Shows how the AI Orchestrator works with example tasks
 */

import { Orchestrator } from './orchestrator/index';

async function runDemo() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     AI ORCHESTRATOR - DEMO                            ║');
  console.log('║     Hierarchical LLM Task Delegation System           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const orchestrator = new Orchestrator();

  // Example 1: Simple task (GLM)
  console.log('📋 Example 1: Simple Task');
  console.log('─'.repeat(60));
  await orchestrator.orchestrate({
    userRequest: 'Write unit tests for the email validation function',
    context: 'Lumelle affiliate landing project',
    projectPath: process.cwd(),
  });

  console.log('\n⏸️  Pausing for 5 seconds...\n');
  await sleep(5000);

  // Example 2: Medium complexity task
  console.log('\n\n📋 Example 2: Medium Complexity Task');
  console.log('─'.repeat(60));
  await orchestrator.orchestrate({
    userRequest: 'Add user profile page with avatar upload and bio editing',
    context: 'Lumelle affiliate landing project',
    projectPath: process.cwd(),
  });

  console.log('\n⏸️  Pausing for 5 seconds...\n');
  await sleep(5000);

  // Example 3: Complex task (breakdown)
  console.log('\n\n📋 Example 3: Complex Task (Full Breakdown)');
  console.log('─'.repeat(60));
  await orchestrator.orchestrate({
    userRequest: 'Add user authentication system with registration, login, logout, and password reset',
    context: 'Lumelle affiliate landing project',
    projectPath: process.cwd(),
  });

  console.log('\n\n✅ Demo complete!\n');
  console.log('Next steps:');
  console.log('1. Check Vibe Kanban to see the created tasks');
  console.log('2. Run "npm run worker" to start GLM workers');
  console.log('3. Monitor task execution and review outputs\n');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Run demo
runDemo().catch(console.error);
