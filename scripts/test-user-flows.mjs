#!/usr/bin/env node

/**
 * User Flow Testing Script
 *
 * Test complete user journeys with step-by-step validation,
 * screenshot capture, and AI analysis.
 *
 * Usage:
 *   node scripts/test-user-flows.mjs <flow-name>
 *   node scripts/test-user-flows.mjs checkout
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Flow definitions
const flows = {
  checkout: {
    name: 'Guest Checkout',
    baseUrl: 'http://localhost:5173',
    steps: [
      {
        name: 'Navigate to products',
        action: 'navigate',
        path: '/products',
        waitFor: 'networkidle',
        screenshot: true
      },
      {
        name: 'Add product to cart',
        action: 'click',
        selector: '.product-card:first-child .add-to-cart',
        waitFor: { selector: '.cart-badge.updated', timeout: 3000 },
        screenshot: true
      },
      {
        name: 'Open cart',
        action: 'click',
        selector: '.cart-icon',
        waitFor: { selector: '.cart-modal', timeout: 2000 },
        screenshot: true
      },
      {
        name: 'Verify item in cart',
        action: 'assert',
        check: 'visible',
        selector: '.cart-item',
        expect: true
      },
      {
        name: 'Proceed to checkout',
        action: 'click',
        selector: '.checkout-button',
        waitFor: { selector: 'form[name="checkout"]', timeout: 3000 },
        screenshot: true
      },
      {
        name: 'Fill email',
        action: 'fill',
        selector: 'input[name="email"]',
        value: 'test@example.com'
      },
      {
        name: 'Fill shipping name',
        action: 'fill',
        selector: 'input[name="shipping.name"]',
        value: 'Test User'
      },
      {
        name: 'Fill shipping address',
        action: 'fill',
        selector: 'input[name="shipping.address"]',
        value: '123 Test Street'
      },
      {
        name: 'Fill shipping city',
        action: 'fill',
        selector: 'input[name="shipping.city"]',
        value: 'Test City'
      },
      {
        name: 'Select shipping country',
        action: 'select',
        selector: 'select[name="shipping.country"]',
        value: 'US'
      },
      {
        name: 'Submit order',
        action: 'click',
        selector: 'button[type="submit"]',
        waitFor: { selector: '.order-confirmation', timeout: 5000 },
        screenshot: true
      },
      {
        name: 'Verify confirmation',
        action: 'assert',
        check: 'text',
        text: 'Thank you for your order',
        expect: true,
        screenshot: true
      }
    ]
  },

  'user-registration': {
    name: 'User Registration',
    baseUrl: 'http://localhost:5173',
    steps: [
      {
        name: 'Navigate to register',
        action: 'navigate',
        path: '/register',
        waitFor: 'networkidle',
        screenshot: true
      },
      {
        name: 'Fill name',
        action: 'fill',
        selector: 'input[name="name"]',
        value: 'Test User'
      },
      {
        name: 'Fill email',
        action: 'fill',
        selector: 'input[name="email"]',
        value: `test-${Date.now()}@example.com`
      },
      {
        name: 'Fill password',
        action: 'fill',
        selector: 'input[name="password"]',
        value: 'SecurePassword123!'
      },
      {
        name: 'Accept terms',
        action: 'check',
        selector: 'input[name="terms"]'
      },
      {
        name: 'Submit registration',
        action: 'click',
        selector: 'button[type="submit"]',
        waitFor: { selector: '.dashboard', timeout: 5000 },
        screenshot: true
      },
      {
        name: 'Verify dashboard',
        action: 'assert',
        check: 'url',
        expect: '/dashboard'
      }
    ]
  },

  'product-search': {
    name: 'Product Search',
    baseUrl: 'http://localhost:5173',
    steps: [
      {
        name: 'Navigate to home',
        action: 'navigate',
        path: '/',
        waitFor: 'networkidle',
        screenshot: true
      },
      {
        name: 'Click search',
        action: 'click',
        selector: '.search-icon',
        waitFor: { selector: '.search-modal', timeout: 2000 },
        screenshot: true
      },
      {
        name: 'Enter search query',
        action: 'fill',
        selector: 'input[name="search"]',
        value: 'product'
      },
      {
        name: 'Submit search',
        action: 'press',
        key: 'Enter',
        waitFor: { selector: '.search-results', timeout: 3000 },
        screenshot: true
      },
      {
        name: 'Verify results',
        action: 'assert',
        check: 'visible',
        selector: '.search-results .product-card',
        expect: true
      },
      {
        name: 'Click first result',
        action: 'click',
        selector: '.search-results .product-card:first-child',
        waitFor: { selector: '.product-detail', timeout: 3000 },
        screenshot: true
      },
      {
        name: 'Verify product page',
        action: 'assert',
        check: 'visible',
        selector: '.product-detail h1',
        expect: true
      }
    ]
  }
};

class FlowTester {
  constructor(flowName) {
    this.flow = flows[flowName];
    if (!this.flow) {
      throw new Error(`Unknown flow: ${flowName}. Available: ${Object.keys(flows).join(', ')}`);
    }

    this.flowName = flowName;
    this.browser = null;
    this.page = null;
    this.resultsDir = join(__dirname, '..', 'test-results', 'flows', flowName);
    this.results = {
      flowName,
      flowTitle: this.flow.name,
      startTime: new Date(),
      steps: [],
      status: 'running'
    };

    // Create results directory
    if (!existsSync(this.resultsDir)) {
      mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  async setup() {
    console.log('\n🔄 User Flow Testing');
    console.log('====================\n');
    console.log(`📋 Flow: ${this.flow.name}`);
    console.log(`📍 Base URL: ${this.flow.baseUrl}`);
    console.log(`📁 Results: ${this.resultsDir}\n`);
    console.log(`👣 Steps: ${this.flow.steps.length}\n`);

    // Launch browser
    console.log('🚀 Launching browser...');
    this.browser = await chromium.launch({
      headless: true,
      args: ['--disable-web-security']
    });

    this.page = await this.browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    // Monitor console
    this.consoleMessages = [];
    this.page.on('console', msg => {
      this.consoleMessages.push({
        type: msg.type(),
        text: msg.text()
      });
    });
  }

  async executeStep(step, index) {
    const stepNum = index + 1;
    const startTime = Date.now();

    console.log(`\n${stepNum}. ${step.name}`);
    console.log(`   Action: ${step.action}`);

    const stepResult = {
      step: stepNum,
      name: step.name,
      action: step.action,
      startTime: new Date(startTime),
      status: 'running'
    };

    try {
      switch (step.action) {
        case 'navigate':
          await this.page.goto(`${this.flow.baseUrl}${step.path}`, {
            waitUntil: step.waitFor || 'load'
          });
          break;

        case 'click':
          await this.page.click(step.selector);
          break;

        case 'fill':
          await this.page.fill(step.selector, step.value);
          break;

        case 'select':
          await this.page.selectOption(step.selector, step.value);
          break;

        case 'check':
          await this.page.check(step.selector);
          break;

        case 'press':
          await this.page.keyboard.press(step.key);
          break;

        case 'assert':
          await this.runAssertion(step);
          break;

        default:
          throw new Error(`Unknown action: ${step.action}`);
      }

      // Handle wait conditions
      if (step.waitFor) {
        if (typeof step.waitFor === 'string') {
          await this.page.waitForLoadState(step.waitFor);
        } else {
          await this.page.waitForSelector(step.waitFor.selector, {
            timeout: step.waitFor.timeout || 5000
          });
        }
      }

      // Take screenshot if requested
      if (step.screenshot) {
        const screenshotPath = join(this.resultsDir, `step-${stepNum}-${step.name.replace(/\s+/g, '-').toLowerCase()}.png`);
        await this.page.screenshot({
          path: screenshotPath,
          fullPage: true
        });
        console.log(`   ✅ Screenshot saved`);
        stepResult.screenshot = screenshotPath;
      }

      stepResult.status = 'passed';
      stepResult.duration = Date.now() - startTime;
      console.log(`   ✅ Passed (${stepResult.duration}ms)`);

    } catch (error) {
      stepResult.status = 'failed';
      stepResult.error = error.message;
      stepResult.duration = Date.now() - startTime;

      // Screenshot error state
      const errorScreenshot = join(this.resultsDir, `step-${stepNum}-error.png`);
      await this.page.screenshot({
        path: errorScreenshot,
        fullPage: true
      });

      console.error(`   ❌ Failed: ${error.message}`);
      console.log(`   📸 Error screenshot saved`);

      this.results.status = 'failed';
      this.results.failedAt = stepNum;

      throw error;
    }

    this.results.steps.push(stepResult);
  }

  async runAssertion(step) {
    console.log(`   ⚖️  Assert: ${step.check}`);

    let actual;

    switch (step.check) {
      case 'visible':
        actual = await this.page.isVisible(step.selector);
        break;

      case 'text':
        actual = await this.page.textContent('body')
          .then(text => text.includes(step.text));
        break;

      case 'url':
        actual = this.page.url().includes(step.expect);
        break;

      default:
        throw new Error(`Unknown assertion: ${step.check}`);
    }

    if (actual !== step.expect) {
      throw new Error(
        `Assertion failed: expected ${step.expect} but got ${actual}`
      );
    }

    console.log(`   ✅ Assertion passed`);
  }

  async run() {
    try {
      await this.setup();

      // Execute each step
      for (let i = 0; i < this.flow.steps.length; i++) {
        await this.executeStep(this.flow.steps[i], i);
      }

      this.results.status = 'passed';
      this.results.endTime = new Date();
      this.results.duration = this.results.endTime - this.results.startTime;

      console.log('\n✅ Flow completed successfully!\n');

    } catch (error) {
      console.error(`\n❌ Flow failed at step ${this.results.failedAt}\n`);
      console.error(`Error: ${error.message}\n`);

      this.results.endTime = new Date();
      this.results.error = error.message;

    } finally {
      await this.generateReport();
      await this.cleanup();
    }
  }

  async generateReport() {
    // Summary
    const summary = {
      totalSteps: this.flow.steps.length,
      passed: this.results.steps.filter(s => s.status === 'passed').length,
      failed: this.results.steps.filter(s => s.status === 'failed').length,
      duration: this.results.duration || Date.now() - this.results.startTime
    };

    this.results.summary = summary;

    // Console errors
    const errors = this.consoleMessages.filter(m => m.type === 'error');
    if (errors.length > 0) {
      this.results.consoleErrors = errors;
    }

    // Save JSON report
    const reportPath = join(this.resultsDir, 'report.json');
    writeFileSync(reportPath, JSON.stringify({
      ...this.results,
      summary
    }, null, 2));

    // Print summary
    console.log('📊 Flow Summary:');
    console.log(`   Status: ${this.results.status}`);
    console.log(`   Steps: ${summary.passed}/${summary.totalSteps} passed`);
    console.log(`   Duration: ${(summary.duration / 1000).toFixed(2)}s`);
    if (errors.length > 0) {
      console.log(`   Console Errors: ${errors.length}`);
    }
    console.log(`\n📄 Report: ${reportPath}\n`);

    // Generate AI analysis prompt
    this.generateAnalysisPrompt();
  }

  generateAnalysisPrompt() {
    const promptPath = join(this.resultsDir, 'analysis-prompt.md');

    let prompt = '# Flow Analysis Prompt\n\n';
    prompt += `**Flow:** ${this.flow.name}\n`;
    prompt += `**Status:** ${this.results.status}\n`;
    prompt += `**Steps:** ${this.results.summary.totalSteps}\n`;
    prompt += `**Duration:** ${(this.results.summary.duration / 1000).toFixed(2)}s\n\n`;

    if (this.results.failedAt) {
      prompt += `## Failed at Step ${this.results.failedAt}\n\n`;
      const failedStep = this.results.steps.find(s => s.step === this.results.failedAt);
      prompt += `**Step:** ${failedStep.name}\n`;
      prompt += `**Action:** ${failedStep.action}\n`;
      prompt += `**Error:** ${failedStep.error}\n\n`;
      prompt += 'Analyze the error screenshot at:\n';
      prompt += `- \`${this.resultsDir}/step-${this.results.failedAt}-error.png\`\n\n`;
    }

    prompt += '## Analysis Tasks\n\n';
    prompt += '1. **Review Screenshots**\n';
    prompt += '   - Check each step screenshot for visual issues\n';
    prompt += '   - Verify UI renders correctly at each step\n';
    prompt += '   - Look for layout or design problems\n\n';

    prompt += '2. **Analyze Failure** (if any)\n';
    prompt += '   - Identify root cause\n';
    prompt += '   - Suggest specific fix\n';
    prompt += '   - Provide code example if applicable\n\n';

    prompt += '3. **Console Errors**\n';
    if (this.results.consoleErrors?.length > 0) {
      this.results.consoleErrors.forEach(err => {
        prompt += `   - ${err.text}\n`;
      });
    } else {
      prompt += '   None detected\n';
    }
    prompt += '\n';

    prompt += '4. **Flow Optimization**\n';
    prompt += '   - Identify slow steps\n';
    prompt += '   - Suggest improvements\n';
    prompt += '   - Check for redundant actions\n\n';

    prompt += '5. **Edge Cases**\n';
    prompt += '   Suggest additional test scenarios:\n';
    prompt += '   - Error states (network failure, invalid data)\n';
    prompt += '   - Boundary conditions (empty cart, max items)\n';
    prompt += '   - User variations (new user, returning user)\n\n';

    prompt += '## Recommendations\n\n';
    prompt += 'Provide:\n';
    prompt += '- Priority level (P0/P1/P2/P3)\n';
    prompt += '- Specific fixes with code\n';
    prompt += '- Estimated effort\n';
    prompt += '- Related tests to add\n';

    writeFileSync(promptPath, prompt);
    console.log(`💡 Analysis prompt: ${promptPath}\n`);

    console.log('🤖 To analyze this flow:\n');
    console.log('1. Read the report and screenshots');
    console.log('2. Use vision model to analyze each screenshot');
    console.log('3. Apply the analysis prompt from:\n');
    console.log(`   ${promptPath}\n`);
  }

  async cleanup() {
    console.log('🧹 Cleaning up...');
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the flow test
const flowName = process.argv[2];

if (!flowName) {
  console.error('\n❌ Usage: node test-user-flows.mjs <flow-name>\n');
  console.error('Available flows:');
  Object.keys(flows).forEach(flow => {
    console.error(`  - ${flow}: ${flows[flow].name}`);
  });
  console.error('');
  process.exit(1);
}

const tester = new FlowTester(flowName);
tester.run().catch(error => {
  console.error('\n💥 Test failed:', error.message, '\n');
  process.exit(1);
});
