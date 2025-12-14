# LinkedIn Knowledge Graph - Testing Documentation

## Overview

This project includes a comprehensive functional test suite that validates all core functionality of the LinkedIn Knowledge Graph Explorer application.

## Test File

**Location**: `tests.html`

## Running the Tests

### Method 1: Direct Browser Access
1. Open `tests.html` in any modern web browser
2. Click the "▶️ Run All Tests" button
3. View the results

### Method 2: Local Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Then navigate to:
# http://localhost:8000/tests.html
```

## Test Suite Structure

The test suite contains **8 comprehensive test suites** with **40+ functional tests**:

### 1. Data Processing Functions (6 tests)
Tests core data processing utilities:
- **escapeHtml**: Prevents XSS attacks by escaping HTML special characters
  - Test 1.1: Basic HTML tag escaping
  - Test 1.2: Mixed content with quotes and ampersands
- **parseCareerDate**: Parses various date formats
  - Test 1.3: Full date format (YYYY-MM-DD)
  - Test 1.4: Year-month format (YYYY-MM)
  - Test 1.5: Empty string handling
- **formatCareerDate**: Formats dates for display
  - Test 1.6: "Mon YYYY" format validation

### 2. Data Filtering Functions (5 tests)
Tests data filtering capabilities:
- Test 2.1: Filter connections by company
- Test 2.2: Filter connections by year
- Test 2.3: Filter connections by position title
- Test 2.4: Filter companies by minimum connection count
- Test 2.5: Group connections by profession

### 3. Data Aggregation Functions (5 tests)
Tests data statistics and aggregation:
- Test 3.1: Count connections per company
- Test 3.2: Count connections per year
- Test 3.3: Calculate total connection count
- Test 3.4: Identify most common position
- Test 3.5: Calculate monthly distribution of connections

### 4. Hierarchical Data Structure Functions (4 tests)
Tests graph hierarchy building:
- Test 4.1: Build company-person hierarchy (2 levels)
- Test 4.2: Build company-profession-person hierarchy (3 levels)
- Test 4.3: Calculate hierarchy depth
- Test 4.4: Count leaf nodes (individual connections)

### 5. Career Timeline Functions (5 tests)
Tests career timeline calculations:
- Test 5.1: Calculate position duration in months
- Test 5.2: Identify current position (no end date)
- Test 5.3: Sort positions chronologically
- Test 5.4: Calculate total career length
- Test 5.5: Match connections to career positions by date

### 6. Search and Query Functions (5 tests)
Tests search functionality:
- Test 6.1: Case-insensitive name search
- Test 6.2: Company name search
- Test 6.3: Position title search
- Test 6.4: Multi-field search (name, company, position)
- Test 6.5: Empty search returns all results

### 7. Date and Time Functions (5 tests)
Tests date manipulation:
- Test 7.1: Extract year from date string
- Test 7.2: Verify date is within range
- Test 7.3: Calculate days between dates
- Test 7.4: Extract month name from date
- Test 7.5: Sort dates chronologically

### 8. Validation Functions (5 tests)
Tests input validation:
- Test 8.1: Valid email format validation
- Test 8.2: Invalid email rejection
- Test 8.3: Required fields presence validation
- Test 8.4: LinkedIn URL format validation
- Test 8.5: Date format validation (YYYY-MM-DD)

## Test Methodology

Each test follows a consistent three-phase structure:

### 1. Setup Phase
Prepares test data and defines expected outcomes:
```javascript
() => ({
    connections: mockConnectionsData,
    company: "Google",
    expectedCount: 2
})
```

### 2. Functionality Phase
Executes the actual function being tested:
```javascript
(data) => data.connections.filter(c => c.company === data.company)
```

### 3. Validation Phase
Verifies results match expectations:
```javascript
(result, data) => ({
    passed: result.length === data.expectedCount,
    error: result.length !== data.expectedCount ?
           `Expected ${data.expectedCount}, Got: ${result.length}` : null
})
```

## Mock Data

The test suite uses realistic mock data:

### Mock Connections (5 records)
- 2 connections at Google (Software Engineers)
- 2 connections at Microsoft (1 Product Manager, 1 Software Engineer)
- 1 connection at Amazon (Data Scientist)
- Connected between 2020-2022

### Mock Positions (3 records)
- Google: 2018-01-01 to 2020-12-31 (Senior Software Engineer)
- Microsoft: 2021-01-01 to 2023-06-30 (Software Engineer)
- Amazon: 2023-07-01 to present (Senior Software Engineer)

## Understanding Test Results

### Summary Dashboard
The top of the results shows:
- **Total Tests**: Number of tests executed
- **Passed** (green): Successfully validated tests
- **Failed** (red): Tests that didn't meet expectations
- **Pass Rate**: Percentage of passing tests

### Individual Test Results
Each test displays:
- **Test Name**: Clear description of what's being tested
- **Setup**: Shows the test data configuration
- **Functionality**: The actual function/logic being tested
- **Validation**: How results are verified
- **Result**: ✅ PASSED or ❌ FAILED
- **Error Details** (if failed): Specific reason for failure

### Color Coding
- 🟢 **Green**: Test passed successfully
- 🔴 **Red**: Test failed with error details
- ⚪ **Gray**: Default state before running tests

## Adding New Tests

To add a new test, follow this pattern:

```javascript
// 1. Create or add to a test suite
function testNewFeature() {
    const suite = createTestSuite("New Feature Tests");

    // 2. Add test case
    suite.addTest(runTest(
        "Test Name - What it should do",
        // Setup
        () => ({
            inputData: someData,
            expectedOutput: expectedValue
        }),
        // Functionality
        (data) => functionToTest(data.inputData),
        // Validation
        (result, data) => ({
            passed: result === data.expectedOutput,
            error: result !== data.expectedOutput ?
                   `Expected: ${data.expectedOutput}, Got: ${result}` : null
        })
    ));

    return suite;
}

// 3. Add to runAllTests()
function runAllTests() {
    // ... existing suites ...
    testResults.suites.push(testNewFeature());
    // ...
}
```

## Best Practices

### When Writing Tests
1. **Clear Test Names**: Use descriptive names that explain what's being tested
2. **Isolated Tests**: Each test should be independent
3. **Expected Values**: Always define expected outcomes in setup
4. **Error Messages**: Provide clear error messages showing expected vs actual
5. **Edge Cases**: Test boundary conditions and edge cases

### When Running Tests
1. **Run Before Commits**: Verify all tests pass before committing code
2. **Run After Changes**: Test immediately after modifying functions
3. **Check Failed Tests**: Investigate and fix any failures promptly
4. **Update Tests**: Modify tests when functionality intentionally changes

## Troubleshooting

### All Tests Failing
- Check browser console for JavaScript errors
- Verify mock data is properly defined
- Ensure all utility functions are available

### Specific Test Failing
- Read the error message carefully
- Check if expected values need updating
- Verify the function implementation
- Use browser DevTools to debug

### Tests Not Running
- Ensure JavaScript is enabled in browser
- Check for syntax errors in test file
- Verify all dependencies are loaded

## Integration with Main Application

The test file is **standalone** and does not require the main application to run. This allows:
- Independent testing without loading the full app
- Faster test execution
- Easier debugging of specific functions
- Testing in isolation from UI concerns

However, the test logic mirrors the actual implementation in `index.html`, ensuring that passing tests indicate correct application behavior.

## Continuous Testing

### Manual Testing Workflow
1. Make code changes in `index.html`
2. Open `tests.html` in browser
3. Click "Run All Tests"
4. Fix any failures
5. Re-run tests until all pass
6. Commit changes

### Future Enhancements
Consider adding:
- Automated test runner (Jest, Mocha)
- CI/CD integration (GitHub Actions)
- Code coverage reporting
- Performance benchmarking
- Visual regression tests

## Test Coverage

Current coverage includes:
- ✅ Data processing and parsing
- ✅ Filtering and searching
- ✅ Data aggregation and statistics
- ✅ Hierarchical structure building
- ✅ Date/time manipulation
- ✅ Input validation
- ✅ Career timeline calculations

Not yet covered (future work):
- ⬜ D3.js visualization rendering
- ⬜ UI interactions and events
- ⬜ CSV parsing and file I/O
- ⬜ Modal interactions
- ⬜ Graph animations
- ⬜ Export functionality

## Contributing

When contributing new features:
1. Write tests first (TDD approach)
2. Ensure all existing tests still pass
3. Add tests for new functionality
4. Update this documentation

## License

Tests are part of the LinkedIn Knowledge Graph Explorer project and follow the same license as the main application.

---

**Last Updated**: 2025-12-13
**Test Suite Version**: 1.0
**Total Tests**: 40+
**Coverage**: Core business logic and data processing
