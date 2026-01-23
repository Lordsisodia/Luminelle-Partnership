#!/usr/bin/env node
/**
 * Analyze Test Results & Generate Reports
 *
 * Processes all test results and generates:
 * - Consolidated bug database
 * - Flow optimization analysis
 * - Improvement suggestions
 * - Regression test suite
 *
 * Usage: node scripts/analyze-test-results.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const RESULTS_DIR = 'docs/testing/cycle-1/flow-results';
const BUG_REPORTS_DIR = 'docs/testing/cycle-1/bug-reports';
const OPTIMIZATION_DIR = 'docs/testing/cycle-1/flow-optimization';

/**
 * Load all test results from flow-results directory
 */
function loadTestResults() {
  const flows = readdirSync(RESULTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allResults = [];

  for (const flowDir of flows) {
    const flowPath = join(RESULTS_DIR, flowDir);
    const resultFiles = readdirSync(flowPath)
      .filter(file => file.startsWith('results-') && file.endsWith('.json'));

    for (const resultFile of resultFiles) {
      const filePath = join(flowPath, resultFile);
      const content = readFileSync(filePath, 'utf8');
      const result = JSON.parse(content);
      allResults.push(result);
    }
  }

  return allResults;
}

/**
 * Extract bugs from test results
 */
function extractBugs(results) {
  const bugs = [];

  for (const result of results) {
    // Check for failures
    if (!result.success) {
      for (const note of result.notes) {
        bugs.push({
          id: `BUG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          flowId: result.flowId,
          flowName: result.flowName,
          priority: result.priority,
          viewport: result.viewport,
          theme: result.theme,
          severity: determineSeverity(result.priority, note),
          category: categorizeError(note),
          title: generateBugTitle(result.flowName, note),
          description: note,
          timestamp: result.timestamp,
          consoleErrors: result.consoleErrors,
          failedSteps: result.steps.filter(s => !s.success)
        });
      }
    }

    // Check for console errors
    if (result.consoleErrors.length > 0) {
      for (const error of result.consoleErrors) {
        bugs.push({
          id: `BUG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          flowId: result.flowId,
          flowName: result.flowName,
          priority: result.priority,
          viewport: result.viewport,
          theme: result.theme,
          severity: 'P2',
          category: 'console',
          title: `Console error in ${result.flowName}`,
          description: error.text,
          timestamp: result.timestamp,
          location: error.location
        });
      }
    }
  }

  return bugs;
}

/**
 * Determine bug severity based on priority and error type
 */
function determineSeverity(flowPriority, errorMessage) {
  if (flowPriority === 'P0') {
    return errorMessage.toLowerCase().includes('timeout') ? 'P1' : 'P0';
  }
  if (flowPriority === 'P1') return 'P1';
  if (flowPriority === 'P2') return 'P2';
  return 'P3';
}

/**
 * Categorize error type
 */
function categorizeError(errorMessage) {
  const msg = errorMessage.toLowerCase();
  if (msg.includes('timeout') || msg.includes('wait')) return 'performance';
  if (msg.includes('click') || msg.includes('selector')) return 'interaction';
  if (msg.includes('navigate') || msg.includes('route')) return 'navigation';
  if (msg.includes('form') || msg.includes('input') || msg.includes('fill')) return 'form';
  if (msg.includes('console') || msg.includes('javascript')) return 'console';
  return 'functional';
}

/**
 * Generate bug title
 */
function generateBugTitle(flowName, error) {
  return `${flowName}: ${error.substring(0, 100)}${error.length > 100 ? '...' : ''}`;
}

/**
 * Analyze flows for optimization opportunities
 */
function analyzeFlows(results) {
  const analysis = {
    dropOffPoints: [],
    frictionPoints: [],
    performanceBottlenecks: [],
    accessibilityIssues: [],
    suggestions: []
  };

  // Group results by flow
  const byFlow = {};
  for (const result of results) {
    if (!byFlow[result.flowId]) {
      byFlow[result.flowId] = [];
    }
    byFlow[result.flowId].push(result);
  }

  // Analyze each flow
  for (const [flowId, flowResults] of Object.entries(byFlow)) {
    const flowName = flowResults[0].flowName;

    // Find failed steps (drop-off points)
    for (const result of flowResults) {
      for (const step of result.steps) {
        if (!step.success) {
          analysis.dropOffPoints.push({
            flowId,
            flowName,
            step: step.step,
            action: step.action,
            description: step.description,
            error: step.error,
            viewport: result.viewport,
            theme: result.theme,
            frequency: flowResults.filter(r => r.steps[step.step - 1] && !r.steps[step.step - 1].success).length
          });
        }

        // Find slow steps (performance bottlenecks)
        if (step.duration > 3000) {
          analysis.performanceBottlenecks.push({
            flowId,
            flowName,
            step: step.step,
            action: step.action,
            duration: step.duration,
            description: step.description
          });
        }
      }
    }

    // Check for missing selectors (friction points)
    const selectorErrors = flowResults.filter(r =>
      r.notes.some(n => n.toLowerCase().includes('selector') || n.toLowerCase().includes('waiting'))
    );
    if (selectorErrors.length > 0) {
      analysis.frictionPoints.push({
        flowId,
        flowName,
        issue: 'Elements not found or slow to load',
        occurrences: selectorErrors.length,
        impact: 'high'
      });
    }
  }

  return analysis;
}

/**
 * Generate optimization suggestions
 */
function generateSuggestions(analysis) {
  const suggestions = [];

  // Based on drop-off points
  if (analysis.dropOffPoints.length > 0) {
    suggestions.push({
      category: 'UX',
      priority: 'P1',
      title: 'Fix critical drop-off points',
      description: `${analysis.dropOffPoints.length} steps are failing across flows`,
      impact: 'high',
      effort: 'medium',
      recommendation: 'Prioritize fixing steps with highest failure rates'
    });
  }

  // Based on performance issues
  if (analysis.performanceBottlenecks.length > 0) {
    suggestions.push({
      category: 'Performance',
      priority: 'P1',
      title: 'Optimize slow-loading steps',
      description: `${analysis.performanceBottlenecks.length} steps take >3 seconds`,
      impact: 'high',
      effort: 'low',
      recommendation: 'Add loading states, optimize queries, implement lazy loading'
    });
  }

  // Based on selector issues
  if (analysis.frictionPoints.length > 0) {
    suggestions.push({
      category: 'Technical',
      priority: 'P1',
      title: 'Fix element selector issues',
      description: `${analysis.frictionPoints.length} flows have selector/timeout issues`,
      impact: 'high',
      effort: 'low',
      recommendation: 'Add data-testid attributes, improve element visibility'
    });
  }

  return suggestions;
}

/**
 * Main analysis function
 */
function main() {
  console.log('\n📊 Analyzing Test Results...\n');

  // Load all results
  const results = loadTestResults();
  console.log(`✅ Loaded ${results.length} test results`);

  // Extract bugs
  const bugs = extractBugs(results);
  console.log(`✅ Found ${bugs.length} bugs`);

  // Generate bug database
  const bugDb = {
    metadata: {
      generated: new Date().toISOString(),
      testSession: 'session-2026-01-12-001',
      totalFlowsTested: new Set(results.map(r => r.flowId)).size,
      totalCombinations: results.length
    },
    bugs,
    summary: {
      total: bugs.length,
      bySeverity: {
        P0: bugs.filter(b => b.severity === 'P0').length,
        P1: bugs.filter(b => b.severity === 'P1').length,
        P2: bugs.filter(b => b.severity === 'P2').length,
        P3: bugs.filter(b => b.severity === 'P3').length
      },
      byCategory: {
        functional: bugs.filter(b => b.category === 'functional').length,
        performance: bugs.filter(b => b.category === 'performance').length,
        navigation: bugs.filter(b => b.category === 'navigation').length,
        interaction: bugs.filter(b => b.category === 'interaction').length,
        console: bugs.filter(b => b.category === 'console').length
      },
      byFlow: bugs.reduce((acc, bug) => {
        acc[bug.flowId] = (acc[bug.flowId] || 0) + 1;
        return acc;
      }, {})
    }
  };

  // Save bug database
  writeFileSync(
    join(BUG_REPORTS_DIR, 'all-bugs.json'),
    JSON.stringify(bugDb, null, 2)
  );
  console.log(`✅ Bug database saved: ${BUG_REPORTS_DIR}/all-bugs.json`);

  // Save bugs by severity
  for (const severity of ['P0', 'P1', 'P2', 'P3']) {
    const bugsBySeverity = bugs.filter(b => b.severity === severity);
    writeFileSync(
      join(BUG_REPORTS_DIR, 'by-severity', `${severity.toLowerCase()}-bugs.json`),
      JSON.stringify(bugsBySeverity, null, 2)
    );
  }
  console.log(`✅ Bugs categorized by severity`);

  // Analyze flows
  const flowAnalysis = analyzeFlows(results);
  console.log(`✅ Flow analysis complete`);
  console.log(`   - Drop-off points: ${flowAnalysis.dropOffPoints.length}`);
  console.log(`   - Performance bottlenecks: ${flowAnalysis.performanceBottlenecks.length}`);
  console.log(`   - Friction points: ${flowAnalysis.frictionPoints.length}`);

  // Generate suggestions
  const suggestions = generateSuggestions(flowAnalysis);
  flowAnalysis.suggestions = suggestions;

  // Save flow optimization analysis
  writeFileSync(
    join(OPTIMIZATION_DIR, 'optimization-analysis.json'),
    JSON.stringify(flowAnalysis, null, 2)
  );
  console.log(`✅ Flow optimization analysis saved`);

  // Generate summary report
  const report = generateReport(bugDb, flowAnalysis);
  writeFileSync(
    join(BUG_REPORTS_DIR, 'TESTING-REPORT.md'),
    report
  );
  console.log(`✅ Testing report saved`);

  console.log('\n📊 Analysis Complete!\n');
  console.log(`Summary:`);
  console.log(`- Total Bugs: ${bugDb.summary.total}`);
  console.log(`- P0 (Critical): ${bugDb.summary.bySeverity.P0}`);
  console.log(`- P1 (High): ${bugDb.summary.bySeverity.P1}`);
  console.log(`- P2 (Medium): ${bugDb.summary.bySeverity.P2}`);
  console.log(`- P3 (Low): ${bugDb.summary.bySeverity.P3}`);
  console.log(`\nReports saved to: ${BUG_REPORTS_DIR}/`);
}

/**
 * Generate markdown report
 */
function generateReport(bugDb, flowAnalysis) {
  return `# Comprehensive Testing Report
**Generated:** ${new Date().toISOString()}
**Test Session:** ${bugDb.metadata.testSession}

## Executive Summary

- **Total Flows Tested:** ${bugDb.metadata.totalFlowsTested}
- **Total Test Combinations:** ${bugDb.metadata.totalCombinations}
- **Total Bugs Found:** ${bugDb.summary.total}

### Bug Severity Breakdown

| Severity | Count | Percentage |
|----------|-------|------------|
| **P0 (Critical)** | ${bugDb.summary.bySeverity.P0} | ${((bugDb.summary.bySeverity.P0 / bugDb.summary.total) * 100).toFixed(1)}% |
| **P1 (High)** | ${bugDb.summary.bySeverity.P1} | ${((bugDb.summary.bySeverity.P1 / bugDb.summary.total) * 100).toFixed(1)}% |
| **P2 (Medium)** | ${bugDb.summary.bySeverity.P2} | ${((bugDb.summary.bySeverity.P2 / bugDb.summary.total) * 100).toFixed(1)}% |
| **P3 (Low)** | ${bugDb.summary.bySeverity.P3} | ${((bugDb.summary.bySeverity.P3 / bugDb.summary.total) * 100).toFixed(1)}% |

### Bug Category Breakdown

| Category | Count |
|----------|-------|
| Functional | ${bugDb.summary.byCategory.functional} |
| Performance | ${bugDb.summary.byCategory.performance} |
| Navigation | ${bugDb.summary.byCategory.navigation} |
| Interaction | ${bugDb.summary.byCategory.interaction} |
| Console | ${bugDb.summary.byCategory.console} |

## Flow Analysis

### Drop-off Points (${flowAnalysis.dropOffPoints.length})
${flowAnalysis.dropOffPoints.slice(0, 10).map(dp => `- **${dp.flowName}** Step ${dp.step}: ${dp.description} (${dp.error})`).join('\n')}

### Performance Bottlenecks (${flowAnalysis.performanceBottlenecks.length})
${flowAnalysis.performanceBottlenecks.slice(0, 10).map(pb => `- **${pb.flowName}** Step ${pb.step}: ${pb.duration}ms - ${pb.description}`).join('\n')}

## Optimization Suggestions

${flowAnalysis.suggestions.map(s => `
### ${s.title}
- **Priority:** ${s.priority}
- **Category:** ${s.category}
- **Impact:** ${s.impact}
- **Effort:** ${s.effort}
- **Description:** ${s.description}
- **Recommendation:** ${s.recommendation}
`).join('\n')}

## Next Steps

1. **Fix P0 bugs immediately** - These are blocking critical flows
2. **Fix P1 bugs this week** - High impact on user experience
3. **Optimize performance bottlenecks** - Improve load times
4. **Address drop-off points** - Improve conversion rates
5. **Implement regression tests** - Prevent future breakage

---
*Generated by automated testing suite*
`;
}

// Run
main().catch(console.error);
