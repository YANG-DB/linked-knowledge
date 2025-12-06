# LinkedIn Knowledge Graph Explorer

A modern, interactive web application for visualizing and exploring your LinkedIn network connections using force-directed graph visualization.

## 🌟 Features

### Core Functionality
- **📊 Interactive Network Graph**: Visualize your entire LinkedIn network with you at the center
- **🔍 Smart Search**: Real-time search across names, companies, positions, and emails
- **🎯 Advanced Filtering**: Filter connections by company, position, or connection date
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **💾 Data Export**: Export your network graph data as JSON

### Visualization Options
- **2D/3D Toggle**: Switch between 2D and 3D force-directed layouts
- **Clustering**: Enable automatic clustering of connections
- **Interactive Nodes**: Click nodes to view detailed information
- **Color Coding**: Visual distinction between you (blue), connections (green), and selected nodes (yellow)

### Network Statistics
- Total connections count
- Visible nodes after filtering
- Number of unique companies
- Real-time updates

## 📋 Requirements

- Modern web browser with ES modules support (Chrome, Firefox, Edge, Safari)
- Internet connection (for loading dependencies)
- LinkedIn Connections export CSV file

## 🚀 Quick Start

### 1. Get Your LinkedIn Data

1. Go to [LinkedIn Settings & Privacy](https://www.linkedin.com/{user-name}/d/download-my-data)
2. Click "Get a copy of your data"
3. Select "Connections" only (faster download)
4. Click "Request archive"
5. Wait for LinkedIn to email you 
6. Download and extract the ZIP file
7. Locate the `Connections.csv` file

### 2. Run the Application

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

### 3. Load Your Data

1. Click the "📁 Load CSV" button
2. Select your `Connections.csv` file
3. Wait for the graph to load
4. Explore your network!

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
- **React 18**: UI framework
- **ReactDOM 18**: React rendering
- **Reagraph**: Graph visualization library
- **PapaParse**: CSV parsing

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (requires ES modules)

## 🎨 Customization

### Changing Colors
Edit `index.html` (inline script) to modify the theme:
```javascript
const theme = {
    node: {
        fill: '#28a745',      // Default node color
        activeFill: '#ffc107' // Selected node color
    },
    edge: {
        fill: '#848484',      // Edge color
        activeFill: '#0077b5' // Active edge color
    }
};
```

### Adjusting Layout
Modify node sizes in the `buildGraph` function inside `index.html`:
```javascript
const centralNode = {
    id: 'central',
    label: 'You',
    fill: '#0077b5',
    size: 30  // Adjust this value
};
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Timeline view showing connection growth over time
- [ ] Bubble chart by company size
- [ ] Company color coding with legend
- [ ] Batch loading for large networks (>1000 connections)
- [ ] Connection strength indicators
- [ ] Mutual connections detection
- [ ] Industry clustering
- [ ] Export as PNG/SVG
- [ ] Dark mode toggle

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
