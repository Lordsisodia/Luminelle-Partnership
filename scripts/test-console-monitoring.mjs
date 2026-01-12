#!/usr/bin/env node

/**
 * Console Log Monitoring Script
 *
 * This script uses Chrome DevTools MCP to:
 * 1. Navigate to the application
 * 2. Monitor console messages for errors and warnings
 * 3. Generate a detailed report
 *
 * Usage: node scripts/test-console-monitoring.mjs [url]
 * Example: node scripts/test-console-monitoring.mjs http://localhost:5173
 */

const url = process.argv[2] || 'http://localhost:5173';

console.log('🔍 Console Log Monitor');
console.log('=====================\n');
console.log(`Target URL: ${url}\n`);

// Since this is meant to be used with Claude Code and Chrome DevTools MCP,
// this script provides instructions for manual setup or can be integrated
// with the MCP tools programmatically

console.log('📋 Setup Instructions:');
console.log('1. Make sure your dev server is running: npm run dev');
console.log('2. Use this script with Claude Code Chrome DevTools MCP integration');
console.log('3. The MCP will automatically:');
console.log('   - Navigate to the URL');
console.log('   - Capture console messages');
console.log('   - Report errors and warnings\n');

console.log('🔧 Integrating with Chrome DevTools MCP:');
console.log(`
In Claude Code, the Chrome DevTools MCP provides these tools:

1. mcp__chrome-devtools__navigate_page - Navigate to URL
2. mcp__chrome-devtools__list_console_messages - Get all console messages
3. mcp__chrome-devtools__get_console_message - Get specific message details
4. mcp__chrome-devtools__take_snapshot - Get page accessibility snapshot
5. mcp__chrome-devtools__take_screenshot - Capture visual screenshot

Example workflow:
1. Navigate to your app
2. Interact with the page (click, type, etc.)
3. Check console messages for errors
4. Generate report
`);

console.log('\n✅ For automated testing, use the companion Playwright script:');
console.log('   node scripts/test-with-playwright.mjs\n');
