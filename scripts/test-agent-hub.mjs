#!/usr/bin/env node
/**
 * Quick test script for Lumelle Agent Hub
 * Tests the multi-agent orchestration without requiring full setup
 */

import { readFile } from 'fs/promises';
import { resolve } from 'path';

const ANSI_GREEN = '\x1b[32m';
const ANSI_BLUE = '\x1b[34m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_RED = '\x1b[31m';
const ANSI_RESET = '\x1b[0m';

function log(color, ...args) {
  console.log(color, ...args, ANSI_RESET);
}

async function checkRequirements() {
  log(ANSI_BLUE, '\n=== Checking Requirements ===\n');

  const checks = [];

  // Check if tsx is available
  try {
    const { execSync } = await import('child_process');
    execSync('npx tsx --version', { stdio: 'pipe' });
    log(ANSI_GREEN, '✓ tsx is available');
    checks.push(true);
  } catch {
    log(ANSI_RED, '✗ tsx not found. Installing...');
    try {
      const { execSync } = await import('child_process');
      execSync('npm install -D tsx', { stdio: 'inherit' });
      log(ANSI_GREEN, '✓ tsx installed');
      checks.push(true);
    } catch {
      log(ANSI_RED, '✗ Failed to install tsx');
      checks.push(false);
    }
  }

  // Check if .env.agents exists
  try {
    await readFile(resolve('.env.agents'), 'utf-8');
    log(ANSI_GREEN, '✓ .env.agents exists');
    checks.push(true);
  } catch {
    log(ANSI_YELLOW, '⚠ .env.agents not found (will need API keys)');
    checks.push(false);
  }

  // Check if LiteLLM proxy is running
  try {
    const response = await fetch('http://localhost:4000/health');
    if (response.ok) {
      log(ANSI_GREEN, '✓ LiteLLM proxy is running on port 4000');
      checks.push(true);
    } else {
      throw new Error('Proxy not healthy');
    }
  } catch {
    log(ANSI_YELLOW, '⚠ LiteLLM proxy not running (start with: npm run litellm:proxy:start)');
    checks.push(false);
  }

  return checks.every(Boolean);
}

async function testSimpleOrchestration() {
  log(ANSI_BLUE, '\n=== Testing Simple Orchestration ===\n');

  log(ANSI_YELLOW, 'This test simulates the orchestrator breaking down a task.');

  // Simulate the orchestration flow
  const task = "Add a dark mode toggle to the navbar";

  log(ANSI_GREEN, '\n1. Task Received:', task);

  log(ANSI_BLUE, '\n2. Orchestrator Analysis:');

  const plan = [
    { id: '1', agent: 'RESEARCH', task: 'Find dark mode best practices' },
    { id: '2', agent: 'CODING', task: 'Implement toggle component' },
    { id: '3', agent: 'CODING', task: 'Add theme context' },
    { id: '4', agent: 'TEST', task: 'Write tests for toggle' },
    { id: '5', agent: 'REVIEW', task: 'Review implementation' },
  ];

  for (const step of plan) {
    log(ANSI_YELLOW, `   [${step.id}] ${step.agent}: ${step.task}`);
  }

  log(ANSI_GREEN, '\n3. Execution Plan:');
  log(ANSI_BLUE, '   - Tasks 1 can run in parallel');
  log(ANSI_BLUE, '   - Tasks 2-3 depend on 1 (research first)');
  log(ANSI_BLUE, '   - Task 4 depends on 2-3 (need code to test)');
  log(ANSI_BLUE, '   - Task 5 depends on 4 (review after testing)');

  log(ANSI_GREEN, '\n4. Model Distribution:');
  log(ANSI_BLUE, '   Orchestrator (GLM Plan 1): Coordination');
  log(ANSI_BLUE, '   Research (Gemini): Best practices lookup');
  log(ANSI_BLUE, '   Coding (GLM Plan 2): Implementation');
  log(ANSI_BLUE, '   Test (GLM Plan 2): Test generation');
  log(ANSI_BLUE, '   Review (GLM Plan 2): Code review');

  return true;
}

async function showNextSteps() {
  log(ANSI_BLUE, '\n=== Next Steps to Run Agent Hub ===\n');

  log(ANSI_YELLOW, '1. Set up API keys:');
  log(ANSI_BLUE, '   cp .env.agents.example .env.agents');
  log(ANSI_BLUE, '   # Edit .env.agents with your GLM, Gemini keys');

  log(ANSI_YELLOW, '\n2. Generate LiteLLM config:');
  log(ANSI_BLUE, '   npm run litellm:config');

  log(ANSI_YELLOW, '\n3. Start LiteLLM proxy:');
  log(ANSI_BLUE, '   npm run litellm:proxy:start');

  log(ANSI_YELLOW, '\n4. Run Agent Hub CLI:');
  log(ANSI_BLUE, '   npm run agent:cli');

  log(ANSI_YELLOW, '\n5. Try a task:');
  log(ANSI_BLUE, '   > Add a newsletter signup form to the homepage');

  log(ANSI_GREEN, '\n=== Quick Start Commands ===\n');
  log(ANSI_BLUE, '# All in one:');
  log(ANSI_RESET, '   cp .env.agents.example .env.agents && npm run litellm:config && npm run litellm:proxy:start && npm run agent:cli');
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║       Lumelle Agent Hub - Quick Test                 ║');
  console.log('╚═══════════════════════════════════════════════════════╝');

  const requirementsMet = await checkRequirements();
  await testSimpleOrchestration();
  await showNextSteps();

  if (requirementsMet) {
    log(ANSI_GREEN, '\n✓ Ready to test! Run the commands above.\n');
  } else {
    log(ANSI_YELLOW, '\n⚠ Some requirements missing. Follow the steps above.\n');
  }
}

main().catch(console.error);
