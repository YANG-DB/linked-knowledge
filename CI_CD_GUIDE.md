# CI/CD Pipeline Guide

This document explains the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the LinkedIn Knowledge Graph Explorer project.

## Overview

The project uses **GitHub Actions** to automatically test, lint, and build the application on every code change. This ensures code quality and prevents regressions.

## Pipeline Architecture

```
┌─────────────────┐
│   Git Push or   │
│  Pull Request   │
└────────┬────────┘
         │
         ├─────────────┬──────────────┬──────────────┐
         │             │              │              │
         ▼             ▼              ▼              ▼
    ┌────────┐   ┌────────┐    ┌────────┐    ┌────────┐
    │  Test  │   │  Lint  │    │ Build  │    │ Notify │
    │  Job   │   │  Job   │    │  Job   │    │  Job   │
    └────┬───┘   └────┬───┘    └────┬───┘    └────────┘
         │            │              │
         ├────────────┴──────────────┤
         │                           │
         ▼                           ▼
    ┌────────────┐           ┌──────────────┐
    │  Generate  │           │  Upload to   │
    │  Reports   │           │  Artifacts   │
    └────────────┘           └──────────────┘
```

## Workflow File

Location: `.github/workflows/test.yml`

## Jobs

### 1. Test Job 🧪

**Purpose**: Run functional tests across multiple Node.js versions

**Matrix Strategy**:
- Node.js 18.x
- Node.js 20.x

**Steps**:
1. **Checkout code** - Clone the repository
2. **Set up Node.js** - Install specified Node version
3. **Install dependencies** - Install Playwright and test dependencies
4. **Create test runner** - Generate automated test script
5. **Run tests** - Execute all 40+ functional tests
6. **Upload reports** - Save test results as artifacts
7. **Comment on PR** - Post results to pull request (if applicable)

**Outputs**:
- `test-report.json` - Machine-readable test results
- `test-report.html` - Human-readable test report
- Console output with pass/fail status

**Exit Codes**:
- `0` - All tests passed ✅
- `1` - One or more tests failed ❌

### 2. Lint Job 🔍

**Purpose**: Check HTML code quality and syntax

**Steps**:
1. **Checkout code**
2. **Set up Node.js**
3. **Install HTMLHint**
4. **Lint HTML files** - Check all `.html` files for issues

**Checks**:
- Tag name lowercase
- Attribute lowercase
- Double quotes for attribute values
- Tag pairing
- Unique IDs
- Non-empty src attributes

### 3. Build Job 🏗️

**Purpose**: Create deployable build artifacts

**Conditions**:
- Only runs on pull requests
- Requires test and lint jobs to pass

**Steps**:
1. **Checkout code**
2. **Create build directory**
3. **Copy files** - HTML, CSS, CSV, MD files
4. **Add build info** - Timestamp and metadata
5. **Upload artifact** - Available for 7 days

**Outputs**:
- `build-preview` artifact containing all application files

### 4. Notify Job 📢

**Purpose**: Alert on failures in main branch

**Conditions**:
- Only runs if test or lint jobs fail
- Only runs on main branch pushes

**Actions**:
- Log failure message
- Can be extended to send Slack/Discord/Email notifications

## Triggers

The workflow runs on:

### Push Events
```yaml
on:
  push:
    branches: [ main, develop ]
```

### Pull Request Events
```yaml
on:
  pull_request:
    branches: [ main, develop ]
```

### Manual Trigger
```yaml
on:
  workflow_dispatch:
```

You can manually trigger the workflow from the Actions tab in GitHub.

## Test Reports

### JSON Report Format

```json
{
  "timestamp": "2025-12-13T10:30:00.000Z",
  "environment": {
    "node": "v20.10.0",
    "platform": "linux",
    "arch": "x64"
  },
  "results": {
    "total": 40,
    "passed": 40,
    "failed": 0,
    "passRate": "100%"
  },
  "passedTests": [...],
  "failedTests": [],
  "success": true,
  "consoleLogs": [...]
}
```

### HTML Report

An interactive HTML report is generated with:
- Summary dashboard
- List of failed tests (if any)
- List of passed tests
- Timestamp and environment info
- Color-coded results

### PR Comment Format

When tests run on a pull request, results are automatically posted as a comment:

```markdown
## ✅ Test Results - PASSED

**Node Version:** 20.x

| Metric | Value |
|--------|-------|
| Total Tests | 40 |
| ✅ Passed | 40 |
| ❌ Failed | 0 |
| 📊 Pass Rate | 100% |

---
*Generated at 2025-12-13T10:30:00.000Z*
```

## Artifacts

All workflow runs save artifacts that can be downloaded:

### Test Reports
- **Name**: `test-report-node-{version}`
- **Contains**: `test-report.json`
- **Retention**: 7 days

### Build Preview
- **Name**: `build-preview`
- **Contains**: All application files
- **Retention**: 7 days
- **Only on**: Pull requests

## Local Testing

Before pushing code, you can run tests locally:

### Quick Test
```bash
# Install dependencies
npm install

# Run tests
npm test
```

### Manual Test
```bash
# Install Playwright browsers
npx playwright install chromium

# Run test script
node run-tests.js
```

### Browser Test
```bash
# Start local server
npm run serve

# Open in browser
# http://localhost:8000/tests.html
```

## Environment Variables

The workflow doesn't require any secrets or environment variables for basic operation.

### Optional: Notifications

To enable Slack/Discord notifications on failure, add these secrets to your repository:

- `SLACK_WEBHOOK_URL` - For Slack notifications
- `DISCORD_WEBHOOK_URL` - For Discord notifications

Then update the notify job in `.github/workflows/test.yml`.

## Debugging Failed Workflows

### 1. Check the Workflow Run
1. Go to the **Actions** tab in GitHub
2. Click on the failed workflow run
3. Click on the failed job
4. Expand the failed step to see error details

### 2. Download Artifacts
1. Scroll to the bottom of the workflow run page
2. Download `test-report-node-{version}` artifact
3. Extract and review `test-report.json` or `test-report.html`

### 3. Review Test Output
Look for:
- **Failed test names** - Which tests failed
- **Error messages** - Why they failed
- **Console logs** - Any JavaScript errors

### 4. Reproduce Locally
```bash
# Run the same tests locally
npm test

# Or open the test page in a browser
npm run serve
# Navigate to http://localhost:8000/tests.html
```

## Best Practices

### Before Committing
1. ✅ Run tests locally: `npm test`
2. ✅ Check for console errors
3. ✅ Lint your HTML: `npm run lint`
4. ✅ Verify all features work in browser

### Pull Requests
1. ✅ Wait for CI to pass before merging
2. ✅ Review test results in PR comments
3. ✅ Fix any failing tests immediately
4. ✅ Don't merge with failing tests

### Main Branch
1. ✅ Never force push to main
2. ✅ Always merge through PRs
3. ✅ Keep main branch green (all tests passing)
4. ✅ Fix breaking changes promptly

## Workflow Status Badge

Add this badge to your README to show workflow status:

```markdown
![Tests](https://github.com/YOUR_USERNAME/linked-knowledge/workflows/Run%20Tests/badge.svg)
```

Replace `YOUR_USERNAME` with your GitHub username.

## Customizing the Workflow

### Add More Node Versions
```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x, 21.x]
```

### Add Browser Matrix
```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

Then update test runner to use specified browser.

### Change Branch Triggers
```yaml
on:
  push:
    branches: [ main, develop, staging ]
```

### Add Deploy Step
Add a deploy job that runs after tests pass:

```yaml
deploy:
  name: Deploy to GitHub Pages
  runs-on: ubuntu-latest
  needs: [test, lint, build]
  if: github.ref == 'refs/heads/main'

  steps:
    - name: Deploy
      # Add deployment steps
```

## Monitoring

### GitHub Actions Dashboard
- View all workflow runs in the **Actions** tab
- Filter by branch, event, or status
- Download logs and artifacts

### Email Notifications
GitHub automatically sends emails for:
- Failed workflow runs on your commits
- Failed scheduled workflows you created

Configure in: Settings → Notifications → Actions

## Troubleshooting

### Tests Pass Locally but Fail in CI

**Possible Causes**:
1. Different Node.js version
2. Missing dependencies
3. Timezone differences
4. File path issues

**Solution**:
```bash
# Test with specific Node version
nvm use 20
npm test
```

### Playwright Installation Fails

**Error**: "Failed to install browsers"

**Solution**: Add this to workflow:
```yaml
- name: Install Playwright
  run: |
    npm install playwright
    npx playwright install-deps
    npx playwright install chromium
```

### Artifacts Not Uploading

**Error**: "Unable to upload artifact"

**Solution**: Ensure artifact path exists:
```yaml
- name: Upload test report
  if: always()  # Upload even if tests fail
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: test-report.json
    if-no-files-found: warn
```

## Performance

### Current Metrics
- **Average run time**: 2-3 minutes
- **Test execution**: ~10 seconds
- **Setup time**: ~1-2 minutes (dependency installation)

### Optimization Tips
1. **Cache dependencies**: Add npm caching to workflow
2. **Parallel jobs**: Tests already run in parallel across Node versions
3. **Skip redundant jobs**: Use path filters to skip jobs when only docs change

Example caching:
```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

## Security

### Secrets
- Never commit secrets to the repository
- Use GitHub Secrets for sensitive data
- Reference secrets in workflow: `${{ secrets.SECRET_NAME }}`

### Permissions
The workflow uses default permissions. To restrict:
```yaml
permissions:
  contents: read
  pull-requests: write  # For PR comments
```

## Future Enhancements

Potential improvements to the CI/CD pipeline:

- [ ] **Code Coverage**: Add coverage reports with Istanbul/NYC
- [ ] **Performance Testing**: Add Lighthouse CI for performance metrics
- [ ] **Visual Regression**: Add Percy or BackstopJS for visual testing
- [ ] **Dependency Scanning**: Add Dependabot or Snyk for security
- [ ] **Auto-merge**: Automatically merge passing Dependabot PRs
- [ ] **Release Automation**: Automatic versioning and GitHub releases
- [ ] **Deploy Preview**: Automatic deployment previews for PRs
- [ ] **Slack Integration**: Post test results to Slack channel

---

**Last Updated**: 2025-12-13
**Maintained by**: Project Contributors
