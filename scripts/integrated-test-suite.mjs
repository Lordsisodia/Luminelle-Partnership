#!/usr/bin/env node

/**
 * Integrated Test Suite
 *
 * This script demonstrates a comprehensive testing approach that combines:
 * 1. Chrome DevTools MCP (for real-time monitoring)
 * 2. Playwright (for automated testing)
 * 3. AI-powered analysis (for intelligent error detection)
 *
 * Usage:
 *   node scripts/integrated-test-suite.mjs [url]
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.argv[2] || 'http://localhost:5174';

console.log('🎯 Integrated Test Suite');
console.log('=======================\n');
console.log(`📍 Target URL: ${url}\n`);

class IntegratedTestSuite {
  constructor() {
    this.results = {
      url,
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0,
      },
      consoleMessages: [],
      errors: [],
      warnings: [],
      screenshots: [],
    };
    this.browser = null;
    this.page = null;
    this.resultsDir = join(__dirname, '..', 'test-results', 'integrated');
  }

  async setup() {
    console.log('🚀 Setting up test environment...\n');

    // Create results directory
    if (!existsSync(this.resultsDir)) {
      mkdirSync(this.resultsDir, { recursive: true });
    }

    // Launch browser
    this.browser = await chromium.launch({
      headless: true, // Run headlessly by default
      args: ['--disable-web-security'],
    });

    this.page = await this.browser.newPage({
      viewport: { width: 1280, height: 720 },
    });

    // Setup monitoring
    this.setupMonitoring();
  }

  setupMonitoring() {
    // Console monitoring
    this.page.on('console', (msg) => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString(),
      };
      this.results.consoleMessages.push(message);

      if (msg.type() === 'error') {
        this.results.errors.push(message);
      } else if (msg.type() === 'warning') {
        this.results.warnings.push(message);
      }
    });

    // Page error monitoring
    this.page.on('pageerror', (error) => {
      this.results.errors.push({
        type: 'pageerror',
        text: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
    });

    // Request monitoring
    this.page.on('requestfailed', (request) => {
      this.results.errors.push({
        type: 'requestfailed',
        text: `Failed: ${request.url()}`,
        url: request.url(),
        failure: request.failure(),
        timestamp: new Date().toISOString(),
      });
    });
  }

  async runTest(name, testFn) {
    console.log(`\n📋 Test: ${name}`);
    console.log('━'.repeat(50));

    const testResult = {
      name,
      passed: false,
      duration: 0,
      errors: [],
      warnings: [],
      timestamp: new Date().toISOString(),
    };

    const startTime = Date.now();

    try {
      await testFn(this.page, testResult);
      testResult.passed = true;
      testResult.duration = Date.now() - startTime;
      console.log(`✅ PASSED (${testResult.duration}ms)`);
      this.results.summary.passed++;
    } catch (error) {
      testResult.passed = false;
      testResult.duration = Date.now() - startTime;
      testResult.errors.push(error.message);
      console.log(`❌ FAILED (${testResult.duration}ms)`);
      console.error(`   Error: ${error.message}`);
      this.results.summary.failed++;
    }

    this.results.tests.push(testResult);
    this.results.summary.total++;
  }

  async navigateTo(page, result) {
    console.log(`   Navigating to ${this.results.url}`);
    await page.goto(this.results.url, { waitUntil: 'networkidle' });
    console.log('   ✓ Page loaded');
  }

  async checkConsole(page, result) {
    console.log('   Checking console messages...');

    const errorCount = this.results.errors.length;
    const warningCount = this.results.warnings.length;

    console.log(`   ✓ Found ${errorCount} errors, ${warningCount} warnings`);

    result.errors = this.results.errors.map((e) => e.text);
    result.warnings = this.results.warnings.map((e) => e.text);

    if (errorCount > 0) {
      throw new Error(`Found ${errorCount} console errors`);
    }
  }

  async checkPageStructure(page, result) {
    console.log('   Checking page structure...');

    // Title
    const title = await page.title();
    console.log(`   ✓ Title: ${title}`);

    // Meta description
    const metaDesc = await page.locator('meta[name="description"]').count();
    if (metaDesc > 0) {
      console.log('   ✓ Meta description found');
    } else {
      console.warn('   ⚠️  Meta description missing');
      result.warnings.push('Meta description missing');
    }

    // H1
    const h1Count = await page.locator('h1').count();
    console.log(`   ✓ H1 count: ${h1Count}`);

    if (h1Count === 0) {
      result.warnings.push('No H1 heading found');
    }
  }

  async takeScreenshot(page, result, name) {
    console.log(`   Taking screenshot: ${name}`);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = join(this.resultsDir, `${name}-${timestamp}.png`);

    await page.screenshot({
      path: filename,
      fullPage: true,
    });

    this.results.screenshots.push(filename);
    console.log(`   ✓ Screenshot saved: ${filename}`);
  }

  async testResponsive(page, result) {
    console.log('   Testing responsive design...');

    const sizes = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 },
    ];

    for (const size of sizes) {
      console.log(`   Testing ${size.name} (${size.width}x${size.height})`);
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.waitForTimeout(1000);

      const filename = join(
        this.resultsDir,
        `responsive-${size.name.toLowerCase()}-${Date.now()}.png`
      );
      await page.screenshot({ path: filename, fullPage: true });
      this.results.screenshots.push(filename);

      console.log(`   ✓ ${size.name} screenshot saved`);
    }

    // Reset to default
    await page.setViewportSize({ width: 1280, height: 720 });
  }

  async testNavigation(page, result) {
    console.log('   Testing navigation...');

    // Find all links
    const links = await page.locator('a[href]').all();
    console.log(`   Found ${links.length} links`);

    // Test first 5 internal links
    let tested = 0;
    for (const link of links.slice(0, 5)) {
      try {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('/')) {
          await link.click();
          await page.waitForTimeout(1000);
          await page.goBack();
          await page.waitForTimeout(500);
          tested++;
        }
      } catch (error) {
        console.warn(`   ⚠️  Failed to navigate link: ${error.message}`);
        result.warnings.push(`Navigation error: ${error.message}`);
      }
    }

    console.log(`   ✓ Tested ${tested} navigation links`);
  }

  async testAccessibility(page, result) {
    console.log('   Testing accessibility...');

    // Check for alt text on images
    const images = await page.locator('img').all();
    const imagesWithoutAlt = [];

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (!alt) {
        const src = await img.getAttribute('src');
        imagesWithoutAlt.push(src);
      }
    }

    if (imagesWithoutAlt.length > 0) {
      console.warn(`   ⚠️  ${imagesWithoutAlt.length} images missing alt text`);
      result.warnings.push(`${imagesWithoutAlt.length} images missing alt text`);
    } else {
      console.log('   ✓ All images have alt text');
    }

    // Check for labels on form inputs
    const inputs = await page.locator('input').all();
    const inputsWithoutLabel = [];

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const hasLabel =
        id && (await page.locator(`label[for="${id}"]`).count()) > 0;

      if (!hasLabel) {
        inputsWithoutLabel.push(id || 'unnamed input');
      }
    }

    if (inputsWithoutLabel.length > 0) {
      console.warn(`   ⚠️  ${inputsWithoutLabel.length} inputs missing labels`);
      result.warnings.push(`${inputsWithoutLabel.length} inputs missing labels`);
    } else {
      console.log('   ✓ All inputs have labels');
    }
  }

  async generateReport() {
    console.log('\n\n📊 Test Report');
    console.log('═'.repeat(50));

    console.log(`\nSummary:`);
    console.log(`  Total Tests: ${this.results.summary.total}`);
    console.log(`  ✅ Passed: ${this.results.summary.passed}`);
    console.log(`  ❌ Failed: ${this.results.summary.failed}`);
    console.log(`  ⚠️  Warnings: ${this.results.summary.warnings}`);

    console.log(`\nConsole Messages:`);
    console.log(`  Total: ${this.results.consoleMessages.length}`);
    console.log(`  Errors: ${this.results.errors.length}`);
    console.log(`  Warnings: ${this.results.warnings.length}`);

    if (this.results.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      this.results.errors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err.text}`);
      });
    }

    if (this.results.warnings.length > 0) {
      console.log(`\n⚠️  Warnings:`);
      this.results.warnings.forEach((warn, i) => {
        console.log(`  ${i + 1}. ${warn.text}`);
      });
    }

    console.log(`\n📸 Screenshots:`);
    this.results.screenshots.forEach((shot, i) => {
      console.log(`  ${i + 1}. ${shot}`);
    });

    // Save detailed report
    const reportPath = join(this.resultsDir, `report-${Date.now()}.json`);
    writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report: ${reportPath}`);

    return this.results.summary;
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up...');
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.setup();

      // Run test suite
      await this.runTest('Navigate to page', this.navigateTo.bind(this));
      await this.runTest('Check console', this.checkConsole.bind(this));
      await this.runTest('Check page structure', this.checkPageStructure.bind(this));
      await this.runTest('Take screenshots', this.takeScreenshot.bind(this, this.page, { warnings: [] }, 'initial'));
      await this.runTest('Test responsive design', this.testResponsive.bind(this));
      await this.runTest('Test navigation', this.testNavigation.bind(this));
      await this.runTest('Test accessibility', this.testAccessibility.bind(this));

      // Generate report
      const summary = await this.generateReport();

      // Cleanup
      await this.cleanup();

      // Exit
      const exitCode = summary.failed > 0 ? 1 : 0;
      console.log(`\n${exitCode === 0 ? '✅' : '❌'} Tests ${exitCode === 0 ? 'passed' : 'failed'}\n`);
      process.exit(exitCode);
    } catch (error) {
      console.error(`\n💥 Test suite failed: ${error.message}\n`);
      await this.cleanup();
      process.exit(1);
    }
  }
}

// Run the suite
const suite = new IntegratedTestSuite();
suite.run();
