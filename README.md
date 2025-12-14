# LinkedIn Knowledge Graph Explorer

![Tests](https://github.com/YOUR_USERNAME/linked-knowledge/workflows/Run%20Tests/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A modern, interactive web application for visualizing and exploring your LinkedIn network connections using force-directed graph visualization.

## 📸 Screenshots & Demos

> **Interactive Demonstrations**: See the visualizations in action with animated GIFs below!

### 🔵 Network Graph View
![Network Graph Showcase](images/network-showcase.gif)

**Hierarchical force-directed graph** with 3 or 4-level structure

✨ **What you see:**
- Toggle profession grouping to add a middle layer (You → Companies → Professions → People)
- Hover over a company for 3 seconds to fade others and focus
- Click companies to highlight their connections
- Drag nodes to rearrange, zoom and pan to explore
- Color-coded companies with lighter shades for professions

---

### 📈 Timeline Chart
![Timeline Chart](images/timline-chart.png)

**Stacked bar chart** showing connection growth over time

✨ **What you see:**
- Monthly aggregation with intelligent tick intervals
- Scroll to zoom in/out for detailed exploration
- Year-by-year navigation
- Synchronized with network graph selection

---

### ⚪ Bubble Chart with Company Network Modal
![Bubble Chart Showcase](images/bubble-showcase.gif)

**Interactive packed circles** sized by connection count

✨ **What you see:**
- Click any bubble to open a detailed company network modal
- Modal displays 3-level graph: Company → Professions → People
- View individual person details in the sidebar
- Zoom and pan support

---

### 📅 Calendar Heatmap with Daily Connections
![Calendar Heatmap Showcase](images/activity-showcase.gif)

**GitHub-style activity heatmap** for daily networking patterns

✨ **What you see:**
- Navigate between years with arrow buttons
- Color intensity shows connections per day
- Click any day to view all connections made that day
- Connection cards display name, company, position
- Click cards to view full person details

---

### 💼 Professional Career Timeline
![Career Timeline Showcase](images/career-showcase.gif)

**AnyChart-powered timeline** of your professional journey

✨ **What you see:**
- Horizontal bars for each position with start/end dates
- Stacked info boxes showing title, location, and connection count
- Click company bars to open detailed network modals
- Color-coded by company matching the network graph
- Scroll and zoom to explore career progression

## 🌟 Features

### Core Functionality
- **📊 Interactive Network Graph**: Hierarchical visualization with you → companies → people (or professions)
- **📈 Timeline Chart**: Stacked bar chart showing connection growth over time
- **⚪ Bubble Chart**: Company distribution visualization by connection count
- **📅 Calendar Heatmap**: GitHub-style daily activity visualization with year navigation
- **💼 Career Timeline**: Professional journey visualization with position details and network statistics
- **🔍 Smart Search**: Real-time search across names, companies, positions, and emails
- **🎯 Profession Grouping**: Optional 4-level hierarchy (You → Companies → Professions → People)
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **💾 Batch Loading**: Gradual loading for large networks (network graph only)
- **🔗 Cross-View Navigation**: Click companies in bubble chart or career timeline to view detailed network modal

### Visualization Options
- **Hierarchical Network**: 3 or 4-level structure (You → Companies → [Professions] → Connections)
  - Dynamic company node sizes based on employee count
  - **Profession Grouping**: Toggle to group connections by role within companies
  - Color-coded by company with automatic palette (professions use lighter shades)
  - Click companies to highlight and filter
  - **Delayed Hover Effect**: Hover over company for 3 seconds to fade other companies
  - **Toggle Individual Connections**: Show/hide person nodes for performance
  - Synchronized highlighting across all views
  - Advanced force-directed layout with strong radial positioning
- **Zoomable Timeline**: Interactive stacked bar chart
  - Monthly aggregation of connections
  - Scroll to zoom in/out
  - Adaptive tick labels based on zoom level
  - Synchronized with network graph selection
- **Interactive Bubbles**: Packed circle layout
  - Size represents connection count per company
  - Zoom and pan support
  - Tooltip with detailed counts
  - **Click to View Company Network**: Opens modal with detailed 3-level graph (Company → Professions → People)
- **Calendar Heatmap**: Daily connection activity
  - GitHub-style heatmap grid (12 months x 7 days)
  - Color intensity shows connections per day
  - Navigate between years with arrow buttons
  - Hover tooltips with exact date and count
  - **Click Day to View Connections**: Opens modal showing all connections made that day
  - Legend with gradient scale
- **Career Timeline**: Professional positions visualization
  - AnyChart-powered timeline with horizontal bars for each position
  - Stacked info boxes above each position showing:
    - Job title and description (top box)
    - Location (middle box)
    - LinkedIn connection count per company (bottom box)
  - Company names displayed on timeline bars in white text
  - Color-coded by company matching network graph colors
  - **Click Company Bar**: Opens modal with detailed company network graph
  - Scroll and zoom for detailed exploration
  - Loads from separate positions CSV file
  - Shows career progression chronologically

### User Interface
- **Unified Dark Theme**: Consistent `#1a1a2e` background across all visualizations
- **Clean Sidebars**: Minimalist connection details with emoji icons
- **Modal Dialogs**: Beautiful purple gradient headers with smooth animations
- **Connection Details Panel**: Standardized format showing:
  - 👤 Name
  - 🏢 Company
  - 💼 Position
  - 📧 Email (with mailto link)
  - 📅 Connected On (formatted date)
  - 🔗 LinkedIn Profile (with direct link)

## 📋 Requirements

- Modern web browser with ES modules support (Chrome, Firefox, Edge, Safari)
- Internet connection (for loading dependencies)
- LinkedIn Connections export CSV file
- (Optional) Positions CSV file for career timeline visualization

## 🚀 Quick Start

### 1. Try with Sample Data (Optional)

Want to see the visualizations immediately without your LinkedIn data?

1. Open `index.html` in your browser
2. Navigate to the **🔗 Network Graph** tab
3. Click **⬇️ Sample CSV** to download sample connection data
4. Click **📁 Load CSV** and select the downloaded file
5. Explore the sample network!

For the career timeline:
1. Navigate to the **💼 Career Timeline** tab
2. Click **⬇️ Sample Positions CSV** to download sample career data
3. Click **📁 Load Career CSV** and select the downloaded file

### 2. Get Your LinkedIn Data

1. Go to [LinkedIn Settings & Privacy](https://www.linkedin.com/{user-name}/d/download-my-data)
2. Click "Get a copy of your data"
3. Select "Connections" only (faster download)
4. Click "Request archive"
5. Wait for LinkedIn to email you
6. Download and extract the ZIP file
7. Locate the `Connections.csv` file

### 3. Run the Application

**Option A: Open directly in browser**
```bash
# Simply open the single HTML file in your browser
# The application is now bundled into `index.html`
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Option B: Use a local server (recommended)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000
```

### 4. Load Your Data

1. Navigate to the **🔗 Network Graph** tab
2. Click **📁 Load CSV** button in the panel header
3. Select your `Connections.csv` file
4. Wait for the graph to load
5. Explore your network!

### 5. (Optional) Load Career Timeline

1. Click the **💼 Career Timeline** tab
2. Click **📁 Load Career CSV** button in the panel header
3. Select your positions CSV file (see format below)
4. View your professional journey with LinkedIn connection counts

**Positions CSV Format:**
```csv
Company Name,Title,Description,Location,Started On,Finished On
Amazon,Senior SDE,"Building distributed systems...","Seattle, WA",Jan 2022,
Google,Software Engineer,"Developed ML pipelines...","Mountain View, CA",Jul 2016,Dec 2021
```

See [Positions.csv](Positions.csv) for a complete example.

## 🎮 Usage Guide

### Navigation
- **Pan**: Click and drag the background
- **Zoom**: Use mouse wheel or pinch gesture
- **Select Node**: Click any connection
- **Reset View**: Click "🔄 Reset View" button

### Search & Filter
- **Search Box**: Type any text to filter connections
- **Company Filter**: Filter by company name
- **Position Filter**: Filter by job title
- **Date Filter**: Filter by connection date

### Viewing Details
1. Click any connection node
2. View detailed information in the right sidebar:
   - Full name
   - Company
   - Position
   - Email
   - LinkedIn profile link
   - Connection date

### Export Data
1. Click "💾 Export Graph" button
2. Save the JSON file with all your network data
3. Use for analysis, backup, or importing into other tools

## 📁 File Structure

```
linkedin-graph-explorer/
├── index.html # Single-file application (HTML + JS inline)
├── styles.css          # All styling and layout
└── README.md          # This file
```

## 🔧 Technical Details

### Dependencies (loaded via CDN)
- **D3.js v7.8.5**: Data visualization and force-directed layouts
- **PapaParse 5.4.1**: CSV parsing and data transformation
- **AnyChart v8**: Professional career timeline visualization

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (requires ES modules)

## 🎨 Customization

### Changing Colors
Company colors are automatically assigned from a predefined palette in `index.html`. To customize:
```javascript
// Find this in buildCompanyFilter() function
const colors = [
    '#0077b5', '#28a745', '#dc3545', '#ffc107', '#17a2b8',
    // Add more colors here
];
```

### Adjusting Force Layout
Modify force parameters in the `buildForceDirectedTree` function:
```javascript
simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-800))  // Repulsion strength
    .force('radial', d3.forceRadial(d => {
        if (d.depth === 1) return 280;  // Company radius
        return 450;  // Person radius
    }, width / 2, height / 2));
```

### Batch Size for Network Graph
Adjust the number of connections loaded at once:
```javascript
const BATCH_SIZE = 100;  // Change this value (default: 100)
```

## 🔮 Future Enhancements

### Completed Features
- [x] Timeline view showing connection growth over time
- [x] Bubble chart by company size
- [x] Company color coding with legend
- [x] Batch loading for large networks (>1000 connections)
- [x] Calendar heatmap for daily activity
- [x] Professional career timeline with position details
- [x] LinkedIn network statistics per company in career view
- [x] **Profession grouping** in network graph (4-level hierarchy)
- [x] **Company network modals** from bubble chart and career timeline
- [x] **Calendar day connection viewer** - click days to see connections
- [x] **Delayed hover highlighting** - 3-second hover to focus on company
- [x] **Unified dark theme** across all visualizations
- [x] **Standardized connection details** panels with emoji icons
- [x] **Advanced force simulation** for clear layered positioning

### Planned Features
- [ ] Connection strength indicators
- [ ] Mutual connections detection
- [ ] Industry clustering
- [ ] Export as PNG/SVG
- [ ] Filter connections by calendar date selection

### LinkedIn API Integration (Advanced)
To fetch live LinkedIn data, you would need to:

1. Register a LinkedIn API application
2. Implement OAuth 2.0 authentication
3. Create a backend proxy server
4. Handle API rate limits and permissions

**Note**: LinkedIn's API has strict limitations and requires company verification for many features.

## 🐛 Troubleshooting

### Graph Not Loading
- **Check internet connection**: Dependencies load from CDN
- **Enable JavaScript**: Required for the application to run
- **Check browser console**: Press F12 to see detailed errors
- **Try different browser**: Some older browsers may not support ES modules

### CSV Parse Errors
- **Check file format**: Must be LinkedIn's standard export format
- **Check encoding**: File should be UTF-8 encoded
- **Check for corruption**: Re-download from LinkedIn if needed

### Performance Issues
- **Large networks**: Networks with >2000 connections may be slow
- **Enable clustering**: Can improve performance for large graphs
- **Use filters**: Reduce visible nodes for better performance
- **Close other tabs**: Free up browser memory

### Module Loading Failures
- **CORS issues**: Use a local server instead of opening directly
- **CDN unavailable**: Check if esm.sh is accessible in your region
- **Firewall/Proxy**: May block CDN requests

## 📊 Data Privacy

- **All processing is local**: Your data never leaves your browser
- **No server uploads**: No data is sent to any external servers
- **No tracking**: No analytics or tracking scripts
- **Your data, your control**: Export and delete as you wish

## 🧪 Testing

This project includes a comprehensive functional test suite with 40+ tests covering all core functionality.

### Running Tests Locally

```bash
# Install dependencies
npm install

# Run tests (requires Playwright)
npm test

# Or run tests with local installation
npm run test:local

# Serve the test page manually
npm run serve
# Then open http://localhost:8000/tests.html
```

### Test Coverage

- ✅ **Data Processing** (6 tests): HTML escaping, date parsing/formatting
- ✅ **Data Filtering** (5 tests): Company, year, position filters
- ✅ **Data Aggregation** (5 tests): Statistics and counting
- ✅ **Hierarchical Structures** (4 tests): Tree building and depth calculation
- ✅ **Career Timeline** (5 tests): Position duration and matching
- ✅ **Search & Query** (5 tests): Multi-field search functionality
- ✅ **Date & Time** (5 tests): Date manipulation and validation
- ✅ **Validation** (5 tests): Email, URL, and data validation

### CI/CD Pipeline

The project uses **GitHub Actions** to automatically run tests on every push and pull request:

- ✅ **Automated Testing**: Tests run on Node.js 18.x and 20.x
- ✅ **Multi-browser Support**: Uses Playwright with Chromium
- ✅ **Test Reports**: JSON and HTML reports generated for each run
- ✅ **PR Comments**: Test results automatically posted to pull requests
- ✅ **Build Artifacts**: Test reports saved for 7 days
- ✅ **HTML Linting**: Code quality checks with HTMLHint

**Workflow Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

View test results in the [Actions tab](https://github.com/YOUR_USERNAME/linked-knowledge/actions) of the repository.

### Test Documentation

For detailed information about the test suite, see:
- [TESTING_README.md](TESTING_README.md) - Complete testing guide
- [TEST_SCENARIOS.md](TEST_SCENARIOS.md) - Individual test scenarios and expected results

## 🤝 Contributing

Feel free to fork, modify, and improve this project! Some ideas:
- Add new visualization types
- Improve performance for large networks
- Add more filtering options
- Create mobile-optimized layouts
- Add data analysis features

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- **Reagraph**: Excellent React graph visualization library
- **PapaParse**: Robust CSV parsing
- **LinkedIn**: For providing data export functionality

## 📧 Support

For issues, questions, or suggestions, please open an issue on the project repository.

---

**Built with ❤️ for network visualization enthusiasts**
