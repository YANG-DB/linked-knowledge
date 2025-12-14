# Quick Start: CI/CD Setup

Get your GitHub Actions CI/CD pipeline up and running in 5 minutes!

## ✅ Prerequisites

- GitHub account
- Repository created (can be private or public)
- Git installed locally

## 🚀 Setup Steps

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit with CI/CD pipeline"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/linked-knowledge.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Actions

GitHub Actions should be enabled by default. To verify:

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You should see the "Run Tests" workflow

If Actions are disabled:
1. Go to **Settings** → **Actions** → **General**
2. Select "Allow all actions and reusable workflows"
3. Click **Save**

### 3. Update README Badge

Edit `README.md` and replace `YOUR_USERNAME` with your GitHub username:

```markdown
![Tests](https://github.com/YOUR_USERNAME/linked-knowledge/workflows/Run%20Tests/badge.svg)
```

### 4. Verify Workflow

The workflow should automatically run when you push. To verify:

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Watch the jobs execute
4. Verify all tests pass ✅

## 🧪 Testing the Pipeline

### Trigger a Test Run

```bash
# Make a small change
echo "# Test update" >> README.md

# Commit and push
git add README.md
git commit -m "Test CI/CD pipeline"
git push

# Go to Actions tab to see the workflow run
```

### Manual Trigger

1. Go to **Actions** tab
2. Click on "Run Tests" workflow
3. Click **Run workflow** button
4. Select branch (main)
5. Click **Run workflow**

## 📊 View Test Results

### In GitHub UI

1. Click on any workflow run
2. Click on the "Run Functional Tests" job
3. Expand "Run tests" step
4. See detailed test output

### Download Reports

1. Scroll to bottom of workflow run page
2. Under "Artifacts", click "test-report-node-{version}"
3. Download and extract
4. Open `test-report.html` in browser

## 🔧 Local Development

### Install Dependencies

```bash
npm install
```

### Run Tests Locally

```bash
# Quick test
npm test

# With full output
node run-tests.js

# Manual browser test
npm run serve
# Open http://localhost:8000/tests.html
```

### Before Pushing

Always run tests locally first:

```bash
npm test
```

If all tests pass locally, they should pass in CI!

## 📝 Create a Pull Request

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Make Changes and Commit

```bash
git add .
git commit -m "Add new feature"
git push -u origin feature/my-new-feature
```

### 3. Open PR on GitHub

1. Go to your repository
2. Click **Pull requests** → **New pull request**
3. Select your feature branch
4. Click **Create pull request**

### 4. Wait for CI

- Tests will automatically run
- Results posted as PR comment
- Green checkmark appears when passing
- Merge only after tests pass!

## 🎯 Expected Workflow Behavior

### On Push to Main/Develop

1. ✅ Test job runs (both Node 18 & 20)
2. ✅ Lint job runs
3. ✅ Test reports uploaded
4. ✅ Green status badge updates

### On Pull Request

1. ✅ Test job runs
2. ✅ Lint job runs
3. ✅ Build job runs
4. ✅ Test results commented on PR
5. ✅ Build artifact uploaded

### On Test Failure (Main Branch)

1. ❌ Tests fail
2. ❌ Notify job runs
3. 📧 Email notification sent
4. 🔴 Status badge shows failing

## 🐛 Troubleshooting

### Tests Pass Locally, Fail in CI

**Check Node Version:**
```bash
node --version
# Should be 18.x or 20.x
```

**Install Exact Dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
npm test
```

### Workflow Not Running

**Check Workflow File:**
- Ensure `.github/workflows/test.yml` exists
- Check file syntax (must be valid YAML)
- Verify branch names match (`main` vs `master`)

**Check Actions Settings:**
- Settings → Actions → General
- Ensure "Allow all actions" is selected

### Can't See Actions Tab

**Repository Settings:**
- Settings → General → Features
- Ensure "Actions" checkbox is enabled

## 📚 Next Steps

1. **Read Full Documentation**:
   - [CI_CD_GUIDE.md](CI_CD_GUIDE.md) - Detailed pipeline documentation
   - [TESTING_README.md](TESTING_README.md) - Testing guide

2. **Customize Workflow**:
   - Add more Node versions to test matrix
   - Enable Slack/Discord notifications
   - Add deployment steps

3. **Improve Tests**:
   - Add more test cases
   - Increase test coverage
   - Add integration tests

## ✨ Success Indicators

You'll know everything is working when:

- ✅ Badge shows "passing" in README
- ✅ All tests show green checkmarks
- ✅ Test reports are generated
- ✅ PR comments show test results
- ✅ No red X's in Actions tab

## 🎉 You're Done!

Your CI/CD pipeline is now fully operational. Every push will automatically:
- Run all 40+ functional tests
- Check code quality
- Generate test reports
- Comment on pull requests
- Upload artifacts

Happy coding! 🚀

---

**Having issues?** Check the [CI_CD_GUIDE.md](CI_CD_GUIDE.md) troubleshooting section or open an issue.
