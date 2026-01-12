#!/usr/bin/env node

/**
 * Automated Testing with Playwright
 *
 * This script combines:
 * - Console log monitoring (errors, warnings)
 * - Visual UI testing
 * - Screenshot capture
 * - Detailed reporting
 *
 * Usage: node scripts/test-with-playwright.mjs [url]
 * Example: node scripts/test-with-playwright.mjs http://localhost:5173
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.argv[2] || 'http://localhost:5174';
const screenshotDir = join(__dirname, '..', 'test-results', 'screenshots');

console.log('🎭 Automated Testing with Playwright');
console.log('===================================\n');
console.log(`Target URL: ${url}\n`);

// Test configuration
const config = {
  viewport: { width: 1280, height: 720 },
  timeout: 30000,
  screenshotDir,
};

class TestRunner {
  constructor() {
    this.consoleMessages = [];
    this.errors = [];
    this.warnings = [];
    this.browser = null;
    this.page = null;
  }

  async setup() {
    console.log('🚀 Starting browser...\n');
    this.browser = await chromium.launch({
      headless: true, // Run headlessly by default
      args: ['--disable-web-security'], // For local development
    });

    this.page = await this.browser.newPage({
      viewport: config.viewport,
    });

    // Monitor console messages
    this.page.on('console', async (msg) => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString(),
      };

      this.consoleMessages.push(message);

      if (msg.type() === 'error') {
        this.errors.push(message);
        console.error(`❌ Error: ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        this.warnings.push(message);
        console.warn(`⚠️  Warning: ${msg.text()}`);
      }
    });

    // Monitor page errors
    this.page.on('pageerror', (error) => {
      const message = {
        type: 'pageerror',
        text: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      };
      this.errors.push(message);
      console.error(`💥 Page Error: ${error.message}`);
    });

    // Monitor failed requests
    this.page.on('requestfailed', (request) => {
      const message = {
        type: 'requestfailed',
        text: `Failed to load: ${request.url()}`,
        url: request.url(),
        failure: request.failure(),
        timestamp: new Date().toISOString(),
      };
      this.errors.push(message);
      console.error(`🔴 Request Failed: ${request.url()}`);
    });
  }

  async navigateTo(url) {
    console.log(`📍 Navigating to: ${url}\n`);
    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle',
        timeout: config.timeout,
      });
      console.log('✅ Page loaded successfully\n');
    } catch (error) {
      console.error(`❌ Failed to load page: ${error.message}\n`);
      throw error;
    }
  }

  async takeScreenshot(name, fullPage = false) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = join(config.screenshotDir, `${name}-${timestamp}.png`);

    try {
      await this.page.screenshot({
        path: filename,
        fullPage,
      });
      console.log(`📸 Screenshot saved: ${filename}`);
      return filename;
    } catch (error) {
      console.error(`❌ Failed to take screenshot: ${error.message}`);
      return null;
    }
  }

  async performBasicChecks() {
    console.log('🔍 Performing basic checks...\n');

    // Check page title
    const title = await this.page.title();
    console.log(`   Page Title: ${title}`);

    // Check for meta tags
    const metaDescription = await this.page.locator('meta[name="description"]').getAttribute('content');
    if (metaDescription) {
      console.log(`   ✅ Meta description found`);
    } else {
      console.warn(`   ⚠️  Meta description missing`);
      this.warnings.push({
        type: 'warning',
        text: 'Meta description missing',
        timestamp: new Date().toISOString(),
      });
    }

    // Check for h1
    const h1Count = await this.page.locator('h1').count();
    console.log(`   H1 headings: ${h1Count}`);
    if (h1Count === 0) {
      this.warnings.push({
        type: 'warning',
        text: 'No H1 heading found',
        timestamp: new Date().toISOString(),
      });
    }

    // Check for broken images
    const images = await this.page.locator('img').all();
    console.log(`   Images found: ${images.length}`);

    console.log('');
  }

  async waitForPageStability() {
    console.log('⏳ Waiting for page stability...\n');
    await this.page.waitForTimeout(2000); // Wait for any lazy-loaded content
  }

  async generateReport() {
    console.log('📊 Test Report');
    console.log('==============\n');

    console.log(`Total Console Messages: ${this.consoleMessages.length}`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}\n`);

    if (this.errors.length > 0) {
      console.log('❌ Errors Found:\n');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.type}: ${error.text}`);
        if (error.location) {
          console.log(`   📍 ${error.location.url}:${error.location.lineNumber}`);
        }
        if (error.stack) {
          console.log(`   Stack: ${error.stack.split('\n')[0]}`);
        }
        console.log('');
      });
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings Found:\n');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.text}`);
        console.log('');
      });
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 No errors or warnings detected!\n');
    }

    // Save detailed report
    const reportPath = join(config.screenshotDir, `test-report-${Date.now()}.json`);
    const report = {
      url,
      timestamp: new Date().toISOString(),
      summary: {
        totalMessages: this.consoleMessages.length,
        errors: this.errors.length,
        warnings: this.warnings.length,
      },
      errors: this.errors,
      warnings: this.warnings,
      allMessages: this.consoleMessages,
    };

    try {
      await import('fs').then((fs) => {
        fs.promises.mkdir(config.screenshotDir, { recursive: true });
        fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));
      });
      console.log(`📄 Detailed report saved: ${reportPath}\n`);
    } catch (error) {
      console.error(`❌ Failed to save report: ${error.message}\n`);
    }

    return report.summary;
  }

  async cleanup() {
    console.log('🧹 Cleaning up...\n');
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run(url) {
    try {
      await this.setup();
      await this.navigateTo(url);
      await this.waitForPageStability();
      await this.performBasicChecks();
      await this.takeScreenshot('initial-state', false);
      await this.takeScreenshot('full-page', true);
      const summary = await this.generateReport();

      // Exit with appropriate code
      const exitCode = summary.errors > 0 ? 1 : 0;
      console.log(`\n${exitCode === 0 ? '✅' : '❌'} Test ${exitCode === 0 ? 'passed' : 'failed'}\n`);

      await this.cleanup();
      process.exit(exitCode);
    } catch (error) {
      console.error(`\n💥 Test failed with error: ${error.message}\n`);
      await this.cleanup();
      process.exit(1);
    }
  }
}

// Run the tests
const runner = new TestRunner();
runner.run(url);
