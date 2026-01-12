#!/usr/bin/env node

/**
 * Test App Skill Implementation
 *
 * This skill provides automated testing for web applications
 * using Chrome DevTools MCP and Playwright.
 *
 * Usage: /test-app [type] [url]
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const testType = args[0] || 'headless';
const url = args[1] || 'http://localhost:5174';

console.log('🎭 Test App Skill');
console.log('==================\n');
console.log(`Type: ${testType}`);
console.log(`URL: ${url}\n`);

const scriptsDir = join(__dirname, '..', '..', '..', 'scripts');

async function runScript(scriptName, scriptArgs = []) {
  return new Promise((resolve, reject) => {
    const scriptPath = join(scriptsDir, scriptName);
    const proc = spawn('node', [scriptPath, ...scriptArgs], {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });

    proc.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    switch (testType) {
      case 'console':
      case 'headless':
        console.log('🔍 Running quick headless console check...\n');
        await runScript('test-headless.mjs', [url]);
        break;

      case 'full':
        console.log('🔬 Running full Playwright test suite...\n');
        await runScript('test-with-playwright.mjs', [url]);
        break;

      case 'integrated':
        console.log('🎯 Running integrated test suite...\n');
        await runScript('integrated-test-suite.mjs', [url]);
        break;

      case 'demo':
        console.log('📚 Showing testing capabilities...\n');
        await runScript('demo-chrome-devtools.mjs');
        break;

      default:
        console.log(`❌ Unknown test type: ${testType}\n`);
        console.log('Available types:');
        console.log('  headless   - Quick console check (default)');
        console.log('  console    - Check console errors');
        console.log('  full       - Comprehensive Playwright tests');
        console.log('  integrated - Full test suite with accessibility');
        console.log('  demo       - Show capabilities\n');
        process.exit(1);
    }

    console.log('\n✅ Test completed!\n');
  } catch (error) {
    console.error(`\n❌ Test failed: ${error.message}\n`);
    process.exit(1);
  }
}

main();
