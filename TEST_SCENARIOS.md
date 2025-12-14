# Test Scenarios and Expected Results

This document provides quick reference for understanding what each test validates and what the expected behavior should be.

## Quick Test Reference

### Data Processing Tests

#### Test 1.1: HTML Escaping - XSS Prevention
**Input**: `<script>alert("XSS")</script>`
**Expected**: `&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`
**Purpose**: Prevent Cross-Site Scripting attacks by escaping HTML characters
**Validation**: All `<`, `>`, `"`, `'`, `&` characters must be escaped

#### Test 1.2: HTML Escaping - Mixed Content
**Input**: `John's Company & Associates`
**Expected**: `John&#039;s Company &amp; Associates`
**Purpose**: Handle apostrophes and ampersands in regular text
**Validation**: Only special HTML characters are escaped, normal text unchanged

#### Test 1.3: Date Parsing - Full Format
**Input**: `"2020-05-15"`
**Expected**: Date object with year=2020, month=4 (May), day=15
**Purpose**: Parse standard YYYY-MM-DD format
**Validation**: Date components extracted correctly (note: month is 0-indexed)

#### Test 1.4: Date Parsing - Year-Month Format
**Input**: `"2021-06"`
**Expected**: Date object with year=2021, month=5 (June)
**Purpose**: Handle partial dates (career positions often only have month/year)
**Validation**: Defaults to 1st of month when day not provided

#### Test 1.5: Date Parsing - Empty String
**Input**: `""`
**Expected**: `null`
**Purpose**: Handle missing/empty dates gracefully
**Validation**: Returns null instead of invalid date or throwing error

#### Test 1.6: Date Formatting
**Input**: `Date(2020, 4, 15)` (May 15, 2020)
**Expected**: Matches pattern `/^[A-Z][a-z]{2} \d{4}$/` (e.g., "May 2020")
**Purpose**: Format dates consistently for display
**Validation**: Format is "Mon YYYY" (3-letter month, space, 4-digit year)

---

### Data Filtering Tests

#### Test 2.1: Filter by Company
**Setup**: 5 connections (2 Google, 2 Microsoft, 1 Amazon)
**Filter**: Company = "Google"
**Expected**: 2 connections
**Purpose**: Show connections from specific company
**Validation**: Only returns connections where `company === "Google"`

#### Test 2.2: Filter by Year
**Setup**: 5 connections (2 in 2020, 2 in 2021, 1 in 2022)
**Filter**: Year = 2020
**Expected**: 2 connections
**Purpose**: Show connections made in specific year
**Validation**: Extracts year from `connectedOn` date and matches filter

#### Test 2.3: Filter by Position
**Setup**: 5 connections (3 Software Engineers, 1 Product Manager, 1 Data Scientist)
**Filter**: Position = "Software Engineer"
**Expected**: 3 connections
**Purpose**: Show connections with specific job title
**Validation**: Exact match on position field

#### Test 2.4: Filter by Minimum Company Size
**Setup**: 5 connections across 3 companies
**Filter**: Minimum 2 connections per company
**Expected**: ['Google', 'Microsoft'] (both have 2, Amazon has 1)
**Purpose**: Only show companies with significant connection count
**Validation**: Counts connections per company, filters companies below threshold

#### Test 2.5: Group by Profession
**Setup**: 5 connections with 3 different positions
**Expected**: 3 groups (Software Engineer: 3, Product Manager: 1, Data Scientist: 1)
**Purpose**: Organize connections by job role
**Validation**: Creates object with position as key, array of connections as value

---

### Data Aggregation Tests

#### Test 3.1: Company Statistics
**Setup**: 5 connections
**Expected**: `{ Google: 2, Microsoft: 2, Amazon: 1 }`
**Purpose**: Count how many connections at each company
**Validation**: All companies present with correct counts

#### Test 3.2: Yearly Statistics
**Setup**: 5 connections over 3 years
**Expected**: `{ 2020: 2, 2021: 2, 2022: 1 }`
**Purpose**: Track networking activity over time
**Validation**: Connections grouped by year made

#### Test 3.3: Total Connections
**Setup**: 5 connections
**Expected**: 5
**Purpose**: Simple count of all connections
**Validation**: Array length equals total connection count

#### Test 3.4: Most Common Position
**Setup**: 3 Software Engineers, 1 Product Manager, 1 Data Scientist
**Expected**: "Software Engineer"
**Purpose**: Identify most prevalent role in network
**Validation**: Returns position with highest count

#### Test 3.5: Monthly Distribution
**Setup**: 5 connections across different months
**Expected**: 5 unique month-year combinations
**Purpose**: Understand networking patterns by month
**Validation**: Each connection creates unique "YYYY-MM" key

---

### Hierarchical Structure Tests

#### Test 4.1: Company Hierarchy
**Setup**: 5 connections at 3 companies
**Expected Structure**:
```
You (root)
├── Google
│   ├── John Smith
│   └── Jane Doe
├── Microsoft
│   ├── Bob Johnson
│   └── Alice Brown
└── Amazon
    └── Charlie Wilson
```
**Purpose**: Build 2-level hierarchy for network graph
**Validation**: Root exists, 3 company children, all connections present

#### Test 4.2: Profession Hierarchy
**Setup**: 2 Google connections (both Software Engineers)
**Expected Structure**:
```
Google
└── Software Engineer
    ├── John Smith
    └── Jane Doe
```
**Purpose**: Build 3-level hierarchy (company → profession → person)
**Validation**: Company node → 1 profession → 2 people

#### Test 4.3: Hierarchy Depth
**Setup**: 3-level hierarchy (Root → Level1 → Level2)
**Expected**: Depth = 3
**Purpose**: Calculate maximum depth for visualization sizing
**Validation**: Recursively finds deepest path in tree

#### Test 4.4: Leaf Node Count
**Setup**: Hierarchy with 5 people (leaf nodes)
**Expected**: 5 leaf nodes
**Purpose**: Count individual connections in hierarchy
**Validation**: Only counts nodes with no children

---

### Career Timeline Tests

#### Test 5.1: Position Duration
**Setup**: Position from 2018-01-01 to 2020-12-31
**Expected**: 24 months (2 years)
**Purpose**: Calculate how long someone worked at a position
**Validation**: (end_year - start_year) × 12 + (end_month - start_month)

#### Test 5.2: Current Position
**Setup**: 3 positions, Amazon has no end date
**Expected**: "Amazon"
**Purpose**: Identify current employer
**Validation**: Finds position where `endDate === ''` or `null`

#### Test 5.3: Chronological Sort
**Setup**: Positions in random order
**Expected**: First position is "Google" (started 2018)
**Purpose**: Display career timeline in order
**Validation**: Sorts by startDate ascending

#### Test 5.4: Total Career Length
**Setup**: Career from 2018 to 2023+ (current)
**Expected**: At least 5 years
**Purpose**: Calculate total professional experience
**Validation**: Current year - earliest start year >= 5

#### Test 5.5: Match Connections to Positions
**Setup**: 2 Google connections in 2020, Google position 2018-2020
**Expected**: 2 matches
**Purpose**: Link connections to career positions by date overlap
**Validation**: Connection date falls within position start/end dates

---

### Search and Query Tests

#### Test 6.1: Name Search (Case-Insensitive)
**Input**: `"john"` (lowercase)
**Expected**: 2 results (John Smith, Bob Johnson)
**Purpose**: Find people by name regardless of capitalization
**Validation**: Converts to lowercase for comparison, matches substring

#### Test 6.2: Company Search
**Input**: `"Microsoft"`
**Expected**: 2 results
**Purpose**: Find all connections at a company
**Validation**: Case-insensitive substring match on company field

#### Test 6.3: Position Search
**Input**: `"engineer"` (lowercase)
**Expected**: 3 results (all Software Engineers)
**Purpose**: Find connections by job role
**Validation**: Case-insensitive substring match on position field

#### Test 6.4: Multi-Field Search
**Input**: `"software"`
**Expected**: 3 results (matches position field)
**Purpose**: Search across multiple fields simultaneously
**Validation**: Returns if match found in name OR company OR position

#### Test 6.5: Empty Search
**Input**: `""`
**Expected**: 5 results (all connections)
**Purpose**: Show all results when no search term
**Validation**: Empty/whitespace query returns full dataset

---

### Date and Time Tests

#### Test 7.1: Extract Year
**Input**: `"2020-05-15"`
**Expected**: 2020
**Purpose**: Get year from date for filtering
**Validation**: `new Date(dateString).getFullYear() === 2020`

#### Test 7.2: Date Range Check
**Input**: Date "2020-06-15", Range: Jan 1 - Dec 31, 2020
**Expected**: `true` (in range)
**Purpose**: Verify date falls within period
**Validation**: `date >= start && date <= end`

#### Test 7.3: Days Between Dates
**Input**: "2020-01-01" to "2020-01-31"
**Expected**: 30 days
**Purpose**: Calculate duration between dates
**Validation**: `Math.ceil((date2 - date1) / (1000*60*60*24))`

#### Test 7.4: Month Name Extraction
**Input**: "2020-05-15"
**Expected**: "May"
**Purpose**: Format dates for display
**Validation**: Uses `toLocaleDateString('en-US', { month: 'long' })`

#### Test 7.5: Sort Dates Chronologically
**Input**: ["2021-03-15", "2020-01-10", "2022-06-20"]
**Expected**: First = "2020-01-10"
**Purpose**: Display dates in chronological order
**Validation**: Sorts by `new Date(a) - new Date(b)`

---

### Validation Tests

#### Test 8.1: Valid Email Format
**Input**: "john.smith@example.com"
**Expected**: `true`
**Purpose**: Ensure email addresses are properly formatted
**Validation**: Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

#### Test 8.2: Invalid Email Rejection
**Input**: "not-an-email"
**Expected**: `false`
**Purpose**: Reject malformed email addresses
**Validation**: Same regex fails for invalid format

#### Test 8.3: Required Fields Check
**Input**: Connection object
**Expected**: `true` (all required fields present)
**Purpose**: Ensure data integrity
**Validation**: Checks presence of fullName, company, position, connectedOn

#### Test 8.4: LinkedIn URL Validation
**Input**: "https://linkedin.com/in/johnsmith"
**Expected**: `true`
**Purpose**: Verify profile URLs are valid
**Validation**: Must be valid URL and contain 'linkedin.com'

#### Test 8.5: Date Format Validation
**Input**: "2020-05-15"
**Expected**: `true`
**Purpose**: Ensure dates are in correct format
**Validation**: Matches `/^\d{4}-\d{2}-\d{2}$/` and creates valid Date object

---

## Common Test Failure Scenarios

### Date-Related Failures
**Symptom**: Date tests failing with off-by-one errors
**Cause**: JavaScript months are 0-indexed (0=January, 11=December)
**Fix**: Remember to subtract 1 when creating Date objects from month numbers

### String Comparison Failures
**Symptom**: Search tests failing on exact matches
**Cause**: Case sensitivity or whitespace differences
**Fix**: Always use `.toLowerCase()` and `.trim()` for comparisons

### Array/Object Comparison Failures
**Symptom**: Tests show correct values but fail validation
**Cause**: Using `===` to compare objects (compares reference, not value)
**Fix**: Use deep comparison or check individual properties

### Async/Timing Issues
**Symptom**: Tests pass sometimes, fail other times
**Cause**: Asynchronous operations not waited for
**Fix**: Ensure all async operations complete before validation

---

## Test Data Summary

### Mock Connections (5 total)
| Name | Company | Position | Connected On |
|------|---------|----------|--------------|
| John Smith | Google | Software Engineer | 2020-05-15 |
| Jane Doe | Google | Software Engineer | 2020-06-20 |
| Bob Johnson | Microsoft | Product Manager | 2021-03-10 |
| Alice Brown | Microsoft | Software Engineer | 2021-04-15 |
| Charlie Wilson | Amazon | Data Scientist | 2022-01-20 |

### Mock Positions (3 total)
| Company | Title | Start Date | End Date |
|---------|-------|------------|----------|
| Google | Senior Software Engineer | 2018-01-01 | 2020-12-31 |
| Microsoft | Software Engineer | 2021-01-01 | 2023-06-30 |
| Amazon | Senior Software Engineer | 2023-07-01 | (current) |

---

## Running Specific Test Suites

While the test interface runs all tests together, you can temporarily disable test suites by commenting them out in `runAllTests()`:

```javascript
function runAllTests() {
    testResults.suites.push(testDataProcessing());
    testResults.suites.push(testDataFiltering());
    // testResults.suites.push(testDataAggregation());  // Disabled
    // testResults.suites.push(testHierarchicalStructures());  // Disabled
    testResults.suites.push(testCareerTimeline());
    testResults.suites.push(testSearchAndQuery());
    testResults.suites.push(testDateTimeFunctions());
    testResults.suites.push(testValidationFunctions());
}
```

This is useful for:
- Debugging specific functionality
- Faster test iteration during development
- Isolating failing tests

---

**Remember**: All tests should pass before deploying changes to production!
