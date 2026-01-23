#!/usr/bin/env node

/**
 * Smart Visual Testing Script
 *
 * Automated visual testing with AI analysis and smart feedback
 *
 * Usage:
 *   node scripts/test-visual-smart.mjs <url>
 *   node scripts/test-visual-smart.mjs http://localhost:5173
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const config = {
  url: process.argv[2] || 'http://localhost:5173',
  resultsDir: join(__dirname, '..', 'test-results', 'visual-smart'),
  screenshots: {
    viewport: { width: 1920, height: 1080 },
    fullPage: true,
    types: ['desktop', 'tablet', 'mobile']
  },
  themes: ['light', 'dark'],
  analyze: true
};

// Viewport sizes for responsive testing
const viewports = {
  desktop: { width: 1920, height: 1080, label: 'Desktop' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  mobile: { width: 375, height: 667, label: 'Mobile' }
};

class SmartVisualTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      url: config.url,
      timestamp: new Date().toISOString(),
      screenshots: [],
      issues: [],
      analysis: []
    };
  }

  async setup() {
    console.log('\n🎭 Smart Visual Testing');
    console.log('========================\n');
    console.log(`📍 Target: ${config.url}`);
    console.log(`📁 Results: ${config.resultsDir}\n`);

    // Create results directory
    if (!existsSync(config.resultsDir)) {
      mkdirSync(config.resultsDir, { recursive: true });
    }

    // Launch browser
    console.log('🚀 Launching browser...');
    this.browser = await chromium.launch({
      headless: true,
      args: ['--disable-web-security']
    });
  }

  async testViewport(viewportName, theme) {
    const vp = viewports[viewportName];
    const testName = `${viewportName}-${theme}`;

    console.log(`\n📱 Testing: ${vp.label} (${vp.width}x${vp.height}) - ${theme} theme`);

    // Create new page with viewport
    this.page = await this.browser.newPage({
      viewport: { width: vp.width, height: vp.height }
    });

    // Monitor console
    const consoleMessages = [];
    this.page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text()
      });
      if (msg.type() === 'error') {
        console.error(`  ❌ ${msg.text()}`);
      }
    });

    // Navigate to page
    await this.page.goto(config.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Set theme
    await this.page.evaluate(
      (theme) => document.documentElement.setAttribute('data-theme', theme),
      theme
    );

    // Wait for stability
    await this.page.waitForTimeout(2000);

    // Check for errors
    const errors = consoleMessages.filter(m => m.type === 'error');

    // Take screenshot
    const screenshotPath = join(config.resultsDir, `${testName}.png`);
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: config.screenshots.fullPage
    });

    console.log(`  ✅ Screenshot: ${screenshotPath}`);

    // Collect metadata
    const metadata = await this.page.evaluate(() => ({
      title: document.title,
      url: window.location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      theme: document.documentElement.getAttribute('data-theme'),
      elementCount: document.querySelectorAll('*').length,
      imageCount: document.querySelectorAll('img').length,
      headingCount: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
    }));

    // Store results
    this.results.screenshots.push({
      name: testName,
      path: screenshotPath,
      viewport: vp.label,
      size: `${vp.width}x${vp.height}`,
      theme,
      metadata,
      errors: errors.length > 0 ? errors : undefined,
      status: errors.length > 0 ? 'has-errors' : 'clean'
    });

    await this.page.close();

    // If analysis enabled, mark for AI analysis
    if (config.analyze) {
      this.results.analysis.push({
        screenshot: screenshotPath,
        type: 'visual-analysis',
        context: `${vp.label} viewport, ${theme} theme`,
        checks: [
          'alignment',
          'typography',
          'contrast',
          'layout',
          'accessibility',
          'responsive',
          'visual-bugs'
        ]
      });
    }
  }

  async run() {
    try {
      await this.setup();

      // Test all viewport/theme combinations
      for (const theme of config.themes) {
        for (const viewport of config.screenshots.types) {
          await this.testViewport(viewport, theme);
        }
      }

      // Generate report
      await this.generateReport();

      // Generate AI analysis prompts
      if (config.analyze) {
        await this.generateAnalysisPrompts();
      }

      console.log('\n✨ Testing complete!\n');

    } catch (error) {
      console.error(`\n❌ Test failed: ${error.message}\n`);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async generateReport() {
    const reportPath = join(config.resultsDir, 'report.json');

    // Calculate summary
    const summary = {
      totalScreenshots: this.results.screenshots.length,
      withErrors: this.results.screenshots.filter(s => s.errors).length,
      clean: this.results.screenshots.filter(s => s.status === 'clean').length,
      byTheme: {
        light: this.results.screenshots.filter(s => s.theme === 'light').length,
        dark: this.results.screenshots.filter(s => s.theme === 'dark').length
      },
      byViewport: {
        desktop: this.results.screenshots.filter(s => s.viewport === 'Desktop').length,
        tablet: this.results.screenshots.filter(s => s.viewport === 'Tablet').length,
        mobile: this.results.screenshots.filter(s => s.viewport === 'Mobile').length
      }
    };

    const report = {
      ...this.results,
      summary,
      recommendations: this.generateRecommendations()
    };

    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📊 Report saved: ${reportPath}`);

    // Print summary
    console.log('\n📈 Test Summary:');
    console.log(`  Total screenshots: ${summary.totalScreenshots}`);
    console.log(`  With errors: ${summary.withErrors}`);
    console.log(`  Clean: ${summary.clean}`);
    console.log(`  Themes tested: ${summary.byTheme.light + summary.byTheme.dark}`);
    console.log(`  Viewports tested: ${Object.keys(summary.byViewport).length}\n`);
  }

  generateRecommendations() {
    const recommendations = [];

    // Check for errors
    if (this.results.screenshots.some(s => s.errors)) {
      recommendations.push({
        priority: 'P0',
        category: 'console-errors',
        message: 'Fix console errors shown in screenshots',
        action: 'Review console logs and fix JavaScript errors'
      });
    }

    // Suggest AI analysis
    if (config.analyze) {
      recommendations.push({
        priority: 'P1',
        category: 'visual-analysis',
        message: 'Run AI analysis on screenshots',
        action: 'Use vision model to analyze screenshots for UI issues',
        prompts: this.results.analysis.length
      });
    }

    // Suggest baseline creation
    recommendations.push({
      priority: 'P2',
      category: 'baseline',
      message: 'Create visual baseline',
      action: 'Save current screenshots as baseline for regression testing'
    });

    // Suggest regular testing
    recommendations.push({
      priority: 'P3',
      category: 'schedule',
      message: 'Schedule regular visual tests',
      action: 'Run visual tests after each significant change'
    });

    return recommendations;
  }

  async generateAnalysisPrompts() {
    const promptsPath = join(config.resultsDir, 'analysis-prompts.md');

    let prompts = '# AI Visual Analysis Prompts\n\n';
    prompts += `Generated: ${new Date().toISOString()}\n\n`;
    prompts += `Target URL: ${config.url}\n\n`;

    for (const screenshot of this.results.screenshots) {
      prompts += `## ${screenshot.name}\n\n`;
      prompts += `**File:** \`${screenshot.path}\`\n`;
      prompts += `**Viewport:** ${screenshot.viewport} (${screenshot.size})\n`;
      prompts += `**Theme:** ${screenshot.theme}\n`;

      if (screenshot.errors) {
        prompts += `**Errors:** ${screenshot.errors.length} console errors detected\n`;
      }

      prompts += '\n### Analysis Prompt\n\n';
      prompts += '```text\n';
      prompts += `Analyze this screenshot of ${screenshot.viewport} viewport in ${screenshot.theme} theme.\n\n`;
      prompts += 'Check for:\n';
      prompts += '1. **Visual Alignment**\n';
      prompts += '   - Elements properly aligned\n';
      prompts += '   - Consistent spacing\n';
      prompts += '   - Grid/system alignment\n\n';
      prompts += '2. **Typography**\n';
      prompts += '   - Font sizes appropriate\n';
      prompts += '   - Line height readable\n';
      prompts += '   - Text contrast adequate\n\n';
      prompts += '3. **Layout**\n';
      prompts += '   - No overflow issues\n';
      prompts += '   - No hidden content\n';
      prompts += '   - Responsive to viewport\n\n';
      prompts += '4. **Accessibility**\n';
      prompts += '   - Color contrast (WCAG AA)\n';
      prompts += '   - Touch target sizes (if mobile)\n';
      prompts += '   - Clear visual hierarchy\n\n';
      prompts += '5. **Visual Quality**\n';
      prompts += '   - Professional appearance\n';
      prompts += '   - Brand consistency\n';
      prompts += '   - No broken images\n\n';
      prompts += 'Provide report with:\n';
      prompts +='- Severity levels (critical/warning/info)\n';
      prompts += '- Exact locations of issues\n';
      prompts += '- Specific CSS/code fixes\n';
      prompts += '- Visual quality score (1-10)\n';
      prompts += '```\n\n';
    }

    // Aggregate comparison prompt
    prompts += '## Aggregate Comparison\n\n';
    prompts += 'Compare all screenshots and identify:\n\n';
    prompts += '1. **Consistency Issues**\n';
    prompts += '   - Elements that render differently across viewports\n';
    prompts += '   - Theme inconsistencies between light/dark\n';
    prompts += '   - Spacing/alignment differences\n\n';
    prompts += '2. **Responsive Design**\n';
    prompts += '   - Mobile-specific issues\n';
    prompts += '   - Tablet layout problems\n';
    prompts += '   - Desktop-only features\n\n';
    prompts += '3. **Priority Fixes**\n';
    prompts += '   Order issues by impact and severity.\n';

    writeFileSync(promptsPath, prompts);
    console.log(`📝 Analysis prompts saved: ${promptsPath}\n`);

    console.log('💡 To analyze screenshots, use:\n');
    console.log('  Read screenshot file and use vision model with the prompts in:\n');
    console.log(`  ${promptsPath}\n`);
  }
}

// Run the tests
const tester = new SmartVisualTester();
tester.run().catch(console.error);
