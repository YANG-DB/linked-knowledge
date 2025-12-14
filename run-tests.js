#!/usr/bin/env node

/**
 * Automated Test Runner for LinkedIn Knowledge Graph
 *
 * This script uses Playwright to run the functional tests in a headless browser
 * and reports the results. It's used both locally and in CI/CD pipelines.
 *
 * Usage:
 *   npm test                 # Run tests with Playwright
 *   node run-tests.js        # Direct execution
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runTests() {
  console.log('🚀 LinkedIn Knowledge Graph - Automated Test Runner\n');
  console.log('Starting test execution...\n');

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({
      headless: true
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Set up console logging
    const consoleLogs = [];
    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(text);

      // Log important messages
      if (text.includes('Total tests:') ||
          text.includes('Passed:') ||
          text.includes('Failed:') ||
          text.includes('Error')) {
        console.log('📊', text);
      }
    });

    // Set up error handling
    page.on('pageerror', error => {
      console.error('❌ Page Error:', error.message);
    });

    // Load the test page
    const testPath = path.join(__dirname, 'tests.html');
    console.log(`📄 Loading test file: ${testPath}\n`);

    await page.goto(`file://${testPath}`);

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    console.log('✅ Test page loaded successfully\n');

    // Run the tests
    console.log('🧪 Executing test suites...\n');

    await page.evaluate(() => {
      return new Promise((resolve) => {
        runAllTests();
        // Wait for tests to complete
        setTimeout(resolve, 2000);
      });
    });

    // Extract test results
    const results = await page.evaluate(() => {
      const summary = document.getElementById('summary');
      if (!summary || summary.style.display === 'none') {
        return null;
      }

      return {
        total: parseInt(document.getElementById('totalTests').textContent) || 0,
        passed: parseInt(document.getElementById('passedTests').textContent) || 0,
        failed: parseInt(document.getElementById('failedTests').textContent) || 0,
        passRate: document.getElementById('passRate').textContent || '0%'
      };
    });

    if (!results) {
      throw new Error('Failed to extract test results - tests may not have run');
    }

    // Get failed test details
    const failedTests = await page.evaluate(() => {
      const failed = [];
      document.querySelectorAll('.test-case.failed').forEach(testCase => {
        const name = testCase.querySelector('.test-name')?.textContent || 'Unknown Test';
        const errorDiv = testCase.querySelector('.error-details');
        const error = errorDiv ? errorDiv.textContent.replace('Error: ', '') : 'Unknown error';
        failed.push({ name, error });
      });
      return failed;
    });

    // Get passed test details
    const passedTests = await page.evaluate(() => {
      const passed = [];
      document.querySelectorAll('.test-case.passed').forEach(testCase => {
        const name = testCase.querySelector('.test-name')?.textContent || 'Unknown Test';
        passed.push(name);
      });
      return passed;
    });

    await browser.close();

    // Print results
    console.log('\n' + '='.repeat(80));
    console.log('📋 TEST RESULTS SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Tests:  ${results.total}`);
    console.log(`✅ Passed:     ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
    console.log(`❌ Failed:     ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
    console.log(`📊 Pass Rate:  ${results.passRate}`);
    console.log('='.repeat(80));

    if (failedTests.length > 0) {
      console.log('\n❌ FAILED TESTS:\n');
      failedTests.forEach((test, index) => {
        console.log(`${index + 1}. ${test.name}`);
        console.log(`   Error: ${test.error}\n`);
      });
    } else {
      console.log('\n✅ All tests passed! 🎉\n');
      if (passedTests.length > 0 && passedTests.length <= 10) {
        console.log('Passed tests:');
        passedTests.forEach((name, index) => {
          console.log(`  ${index + 1}. ${name}`);
        });
        console.log('');
      }
    }

    // Create test report artifact
    const report = {
      timestamp: new Date().toISOString(),
      environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch
      },
      results: results,
      passedTests: passedTests.map(name => ({ name })),
      failedTests: failedTests,
      success: results.failed === 0,
      consoleLogs: consoleLogs
    };

    fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Test report saved to test-report.json\n');

    // Generate HTML report
    const htmlReport = generateHTMLReport(report);
    fs.writeFileSync('test-report.html', htmlReport);
    console.log('📄 HTML report saved to test-report.html\n');

    // Exit with appropriate code
    if (results.failed > 0) {
      console.error('❌ Tests failed! Exiting with error code 1\n');
      process.exit(1);
    } else {
      console.log('✅ Test run completed successfully! 🎉\n');
      process.exit(0);
    }

  } catch (error) {
    console.error('\n❌ Error running tests:', error.message);
    console.error(error.stack);

    if (browser) {
      await browser.close();
    }

    process.exit(1);
  }
}

function generateHTMLReport(report) {
  const { results, passedTests, failedTests, timestamp, success } = report;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report - ${new Date(timestamp).toLocaleString()}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: ${success ? '#28a745' : '#dc3545'};
        }
        .summary {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .summary-item {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
            text-align: center;
        }
        .summary-value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        .summary-label {
            color: #6c757d;
            font-size: 14px;
        }
        .test-list {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .test-item {
            padding: 10px;
            margin: 5px 0;
            border-left: 4px solid #28a745;
            background: #f0f9f4;
        }
        .test-item.failed {
            border-left-color: #dc3545;
            background: #fff5f5;
        }
        .error {
            color: #dc3545;
            font-family: monospace;
            font-size: 12px;
            margin-top: 5px;
            padding: 10px;
            background: #fff;
            border-radius: 3px;
        }
        .timestamp {
            color: #6c757d;
            font-size: 12px;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>${success ? '✅' : '❌'} Test Report</h1>

    <div class="summary">
        <h2>Summary</h2>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-label">Total Tests</div>
                <div class="summary-value">${results.total}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Passed</div>
                <div class="summary-value" style="color: #28a745;">${results.passed}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Failed</div>
                <div class="summary-value" style="color: #dc3545;">${results.failed}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Pass Rate</div>
                <div class="summary-value">${results.passRate}</div>
            </div>
        </div>
    </div>

    ${failedTests.length > 0 ? `
    <div class="test-list">
        <h2>❌ Failed Tests (${failedTests.length})</h2>
        ${failedTests.map((test, i) => `
            <div class="test-item failed">
                <strong>${i + 1}. ${test.name}</strong>
                <div class="error">${test.error}</div>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${passedTests.length > 0 ? `
    <div class="test-list">
        <h2>✅ Passed Tests (${passedTests.length})</h2>
        ${passedTests.slice(0, 20).map((test, i) => `
            <div class="test-item">
                <strong>${i + 1}. ${test.name}</strong>
            </div>
        `).join('')}
        ${passedTests.length > 20 ? `<p>... and ${passedTests.length - 20} more</p>` : ''}
    </div>
    ` : ''}

    <div class="timestamp">
        Generated at ${new Date(timestamp).toLocaleString()}<br>
        Node: ${report.environment.node} | Platform: ${report.environment.platform}
    </div>
</body>
</html>`;
}

// Run tests
runTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
