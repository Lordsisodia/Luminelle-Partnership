#!/usr/bin/env node

/**
 * Quick Test Runner
 *
 * Simple script to verify the testing setup works
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Setup Verification');
console.log('=============================\n');

async function runTest(name, script, args = []) {
  return new Promise((resolve) => {
    console.log(`\n📋 Test: ${name}`);
    console.log('━'.repeat(50));

    const proc = spawn('node', [join(__dirname, script), ...args], {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ PASSED\n`);
        resolve(true);
      } else {
        console.log(`❌ FAILED (exit code: ${code})\n`);
        resolve(false);
      }
    });
  });
}

async function main() {
  const results = [];

  // Test 1: Quick headless check
  results.push(await runTest(
    'Quick Headless Console Check',
    'test-headless.mjs'
  ));

  console.log('\n' + '═'.repeat(50));
  console.log('📊 Summary');
  console.log('═'.repeat(50) + '\n');

  const passed = results.filter(r => r).length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${total - passed}\n`);

  if (passed === total) {
    console.log('🎉 All tests passed!\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Check the output above.\n');
    process.exit(1);
  }
}

main();
