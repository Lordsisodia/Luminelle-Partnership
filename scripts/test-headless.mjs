#!/usr/bin/env node

/**
 * Quick Headless Test
 *
 * Runs a fast console-only check in headless mode
 * Perfect for quick checks without disrupting your work
 */

import { chromium } from 'playwright';

const url = 'http://localhost:5174';

console.log('🔍 Quick Headless Console Check');
console.log('================================\n');
console.log(`Testing: ${url}\n`);

const browser = await chromium.launch({
  headless: true,  // Run headlessly - no window!
});

const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
});

let errorCount = 0;
let warningCount = 0;
const errors = [];
const warnings = [];

// Monitor console
page.on('console', (msg) => {
  const text = msg.text();
  const type = msg.type();

  if (type === 'error') {
    errorCount++;
    errors.push({
      text,
      location: msg.location(),
    });
    console.error(`❌ Error: ${text}`);
  } else if (type === 'warning') {
    warningCount++;
    warnings.push(text);
    console.warn(`⚠️  Warning: ${text}`);
  }
});

// Monitor page errors
page.on('pageerror', (error) => {
  errorCount++;
  errors.push({
    text: error.message,
    stack: error.stack,
  });
  console.error(`💥 Page Error: ${error.message}`);
});

// Monitor failed requests
page.on('requestfailed', (request) => {
  errorCount++;
  errors.push({
    text: `Failed: ${request.url()}`,
    failure: request.failure(),
  });
  console.error(`🔴 Request Failed: ${request.url()}`);
});

console.log('⏳ Loading page...\n');

try {
  await page.goto(url, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  console.log('✅ Page loaded successfully\n');
  console.log('⏳ Waiting for console messages...\n');

  // Wait a bit for any delayed console messages
  await page.waitForTimeout(3000);

} catch (error) {
  console.error(`❌ Failed to load page: ${error.message}\n`);
  await browser.close();
  process.exit(1);
}

console.log('\n📊 Results');
console.log('==========\n');
console.log(`Total Errors: ${errorCount}`);
console.log(`Total Warnings: ${warningCount}\n`);

if (errorCount > 0) {
  console.log('❌ Errors Found:\n');
  errors.forEach((err, i) => {
    console.log(`${i + 1}. ${err.text}`);
    if (err.location) {
      console.log(`   📍 ${err.location.url}:${err.location.lineNumber}`);
    }
  });
  console.log('');
}

if (warningCount > 0) {
  console.log('⚠️  Warnings Found:\n');
  warnings.forEach((warn, i) => {
    console.log(`${i + 1}. ${warn}`);
  });
  console.log('');
}

if (errorCount === 0 && warningCount === 0) {
  console.log('🎉 No errors or warnings detected!\n');
}

// Quick page info
console.log('📄 Page Info:');
console.log(`   Title: ${await page.title()}`);
console.log(`   URL: ${page.url()}\n`);

await browser.close();

console.log('✅ Test complete!\n');

process.exit(errorCount > 0 ? 1 : 0);
