// ============================================================================
// LinkedIn Knowledge Graph Explorer - Main Application
// ============================================================================

// Global state
let React, ReactDOM, GraphCanvas, lightTheme;
let appInstance = null;

// ============================================================================
// Module Loading
// ============================================================================

async function loadModules() {
    const loadingDiv = document.getElementById('loading');
    const loadingText = document.getElementById('loadingText');
    
    try {
        if (loadingDiv) {
            loadingDiv.classList.remove('hidden');
            if (loadingText) loadingText.textContent = 'Loading React...';
        }
        
        // Load React
        const ReactModule = await import('https://esm.sh/react@18');
        React = ReactModule.default || ReactModule;
        if (!React) throw new Error('React failed to load');
        
        // Load ReactDOM
        if (loadingText) loadingText.textContent = 'Loading ReactDOM...';
        const ReactDOMModule = await import('https://esm.sh/react-dom@18/client');
        ReactDOM = ReactDOMModule.default || ReactDOMModule;
        if (!ReactDOM) throw new Error('ReactDOM failed to load');
        
        // Load Reagraph
        if (loadingText) loadingText.textContent = 'Loading Reagraph...';
        const reagraphModule = await import('https://esm.sh/reagraph@latest');
        GraphCanvas = reagraphModule.GraphCanvas;
        lightTheme = reagraphModule.lightTheme;
        if (!GraphCanvas) throw new Error('GraphCanvas failed to load');
        
        console.log('All modules loaded successfully!');
        if (loadingDiv) loadingDiv.classList.add('hidden');
        
        // Initialize the app
        initializeApp();
        
    } catch (error) {
        console.error('Error loading modules:', error);
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <div style="color: #dc3545; text-align: center; padding: 20px;">
                    <h3>Error Loading Dependencies</h3>
                    <p><strong>${error.message}</strong></p>
                    <p style="font-size: 12px; margin-top: 10px; text-align: left;">
                        <strong>Please check:</strong><br>
                        1. You have an internet connection<br>
                        2. Your browser supports ES modules<br>
                        3. Check browser console (F12) for details
                    </p>
                    <button onclick="location.reload()" class="btn" style="margin-top: 15px;">
                        Reload Page
                    </button>
                </div>
            `;
        }
    }
}

// ============================================================================
// Utility Functions
// ============================================================================

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

function updateStats(totalNodes, visibleNodes, companies) {
    const totalNodesEl = document.getElementById('totalNodes');
    const visibleNodesEl = document.getElementById('visibleNodes');
    const totalCompaniesEl = document.getElementById('totalCompanies');
    
    if (totalNodesEl) totalNodesEl.textContent = totalNodes;
    if (visibleNodesEl) visibleNodesEl.textContent = visibleNodes;
    if (totalCompaniesEl) totalCompaniesEl.textContent = companies;
}

// ============================================================================
// Main React Application Component
// ============================================================================

function initializeApp() {
    const { useState, useEffect, useRef } = React;

    function LinkedInGraphExplorer() {
        // State management
        const [nodes, setNodes] = useState([]);
        const [edges, setEdges] = useState([]);
        const [allNodes, setAllNodes] = useState([]);
        const [allEdges, setAllEdges] = useState([]);
        const [connectionsData, setConnectionsData] = useState([]);
        const [selectedNode, setSelectedNode] = useState(null);
        const [currentNodeData, setCurrentNodeData] = useState({});
        const [is3D, setIs3D] = useState(false);
        const [clustering, setClustering] = useState(false);
        
        const graphRef = useRef(null);

        // ====================================================================
        // Event Handlers Setup
        // ====================================================================
        
        useEffect(() => {
            // Setup file input
            const fileInput = document.getElementById('csvFile');
            const loadCsvBtn = document.getElementById('loadCsvBtn');
            
            if (fileInput && loadCsvBtn) {
                loadCsvBtn.addEventListener('click', () => fileInput.click());
                fileInput.addEventListener('change', handleFileSelect);
            }

            // Setup search
            const searchBox = document.getElementById('searchBox');
            if (searchBox) {
                searchBox.addEventListener('input', (e) => handleSearch(e.target.value));
            }

            // Setup buttons
            const resetViewBtn = document.getElementById('resetViewBtn');
            const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
            const exportGraphBtn = document.getElementById('exportGraphBtn');
            
            if (resetViewBtn) resetViewBtn.addEventListener('click', resetView);
            if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar);
            if (exportGraphBtn) exportGraphBtn.addEventListener('click', exportGraph);

            // Setup view controls
            const view3D = document.getElementById('view3D');
            const viewClustering = document.getElementById('viewClustering');
            
            if (view3D) view3D.addEventListener('change', (e) => setIs3D(e.target.checked));
            if (viewClustering) viewClustering.addEventListener('change', (e) => setClustering(e.target.checked));

            // Setup filters
            const filterCompany = document.getElementById('filterCompany');
            const filterPosition = document.getElementById('filterPosition');
            const filterDate = document.getElementById('filterDate');
            
            if (filterCompany) filterCompany.addEventListener('keyup', applyFilters);
            if (filterPosition) filterPosition.addEventListener('keyup', applyFilters);
            if (filterDate) filterDate.addEventListener('keyup', applyFilters);

            // Setup LinkedIn fetch
            const fetchDataBtn = document.getElementById('fetchDataBtn');
            const expandBtn = document.getElementById('expandBtn');
            
            if (fetchDataBtn) fetchDataBtn.addEventListener('click', fetchLinkedInData);
            if (expandBtn) expandBtn.addEventListener('click', expandNodeConnections);

            // Show initial message
            setTimeout(() => {
                showNotification('💡 Click "Load CSV" to import your LinkedIn Connections.csv', 'success');
            }, 1000);

            // Cleanup
            return () => {
                if (fileInput) fileInput.removeEventListener('change', handleFileSelect);
            };
        }, []);

        // Update stats whenever nodes change
        useEffect(() => {
            const companies = new Set(
                Object.values(currentNodeData)
                    .filter(d => d.company)
                    .map(d => d.company)
            );
            updateStats(allNodes.length - 1, nodes.length - 1, companies.size);
        }, [nodes, allNodes, currentNodeData]);

        // ====================================================================
        // File Handling
        // ====================================================================
        
        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => parseCSV(e.target.result);
            reader.readAsText(file);
        }

        function parseCSV(csvText) {
            const loadingEl = document.getElementById('loading');
            if (loadingEl) loadingEl.classList.remove('hidden');
            
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const filtered = results.data.filter(row => {
                        return row['First Name'] && 
                               row['First Name'] !== 'Notes:' && 
                               row['First Name'].trim() !== '';
                    });

                    setConnectionsData(filtered);
                    buildGraph(filtered);
                    if (loadingEl) loadingEl.classList.add('hidden');
                    showNotification(`✅ Loaded ${filtered.length} connections!`, 'success');
                },
                error: (error) => {
                    if (loadingEl) loadingEl.classList.add('hidden');
                    showNotification('❌ Error parsing CSV: ' + error.message, 'error');
                }
            });
        }

        // ====================================================================
        // Graph Building
        // ====================================================================
        
        function buildGraph(data) {
            const newNodes = [];
            const newEdges = [];
            const newNodeData = {};

            // Add central node (you)
            const centralNode = {
                id: 'central',
                label: 'You',
                fill: '#0077b5',
                size: 30
            };
            newNodes.push(centralNode);
            newNodeData['central'] = {
                name: 'You',
                url: '',
                email: '',
                company: '',
                position: '',
                connectedOn: ''
            };

            // Add connection nodes
            data.forEach((connection, index) => {
                const firstName = connection['First Name'] || '';
                const lastName = connection['Last Name'] || '';
                const fullName = `${firstName} ${lastName}`.trim();
                const url = connection['URL'] || '';
                const email = connection['Email Address'] || '';
                const company = connection['Company'] || 'Unknown Company';
                const position = connection['Position'] || 'Unknown Position';
                const connectedOn = connection['Connected On'] || '';

                if (fullName) {
                    const nodeId = `node_${index}`;
                    const node = {
                        id: nodeId,
                        label: fullName.length > 20 ? fullName.substring(0, 20) + '...' : fullName,
                        fill: '#28a745',
                        size: 20
                    };
                    newNodes.push(node);

                    newNodeData[nodeId] = {
                        name: fullName,
                        url: url,
                        email: email,
                        company: company,
                        position: position,
                        connectedOn: connectedOn
                    };

                    // Add edge from central node
                    const edge = {
                        id: `edge_${index}`,
                        source: 'central',
                        target: nodeId,
                        label: connectedOn ? `Connected: ${connectedOn}` : ''
                    };
                    newEdges.push(edge);
                }
            });

            setAllNodes(newNodes);
            setAllEdges(newEdges);
            setNodes(newNodes);
            setEdges(newEdges);
            setCurrentNodeData(newNodeData);
        }

        // ====================================================================
        // Search and Filtering
        // ====================================================================
        
        function handleSearch(query) {
            const searchQuery = query.toLowerCase().trim();
            
            if (searchQuery === '') {
                setNodes(allNodes);
                setEdges(allEdges);
                return;
            }

            const filteredNodes = allNodes.filter(node => {
                if (node.id === 'central') return true;
                const data = currentNodeData[node.id];
                if (!data) return false;
                const searchText = `${data.name} ${data.company} ${data.position} ${data.email}`.toLowerCase();
                return searchText.includes(searchQuery);
            });

            const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
            const filteredEdges = allEdges.filter(edge => 
                filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
            );

            setNodes(filteredNodes);
            setEdges(filteredEdges);
        }

        function applyFilters() {
            const companyFilter = document.getElementById('filterCompany')?.value.toLowerCase() || '';
            const positionFilter = document.getElementById('filterPosition')?.value.toLowerCase() || '';
            const dateFilter = document.getElementById('filterDate')?.value.toLowerCase() || '';

            const filteredNodes = allNodes.filter(node => {
                if (node.id === 'central') return true;
                const data = currentNodeData[node.id];
                if (!data) return false;

                const matchCompany = !companyFilter || data.company.toLowerCase().includes(companyFilter);
                const matchPosition = !positionFilter || data.position.toLowerCase().includes(positionFilter);
                const matchDate = !dateFilter || data.connectedOn.toLowerCase().includes(dateFilter);

                return matchCompany && matchPosition && matchDate;
            });

            const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
            const filteredEdges = allEdges.filter(edge => 
                filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
            );

            setNodes(filteredNodes);
            setEdges(filteredEdges);
        }

        function resetView() {
            const searchBox = document.getElementById('searchBox');
            const companyFilter = document.getElementById('filterCompany');
            const positionFilter = document.getElementById('filterPosition');
            const dateFilter = document.getElementById('filterDate');
            
            if (searchBox) searchBox.value = '';
            if (companyFilter) companyFilter.value = '';
            if (positionFilter) positionFilter.value = '';
            if (dateFilter) dateFilter.value = '';
            
            setNodes(allNodes);
            setEdges(allEdges);
            setSelectedNode(null);
            
            const nodeInfoDiv = document.getElementById('nodeInfo');
            if (nodeInfoDiv) {
                nodeInfoDiv.innerHTML = '<div class="empty-state"><p>Click on a node to view details</p></div>';
            }
        }

        // ====================================================================
        // Node Interaction
        // ====================================================================
        
        function handleNodeClick(node) {
            if (node) {
                setSelectedNode(node.id);
                showNodeInfo(node.id);
                document.getElementById('sidebar')?.classList.add('active');
                
                const expandBtn = document.getElementById('expandBtn');
                if (expandBtn) {
                    if (node.id === 'central') {
                        expandBtn.disabled = true;
                        expandBtn.textContent = '🔍 Expand Connections (Select a node)';
                    } else {
                        expandBtn.disabled = false;
                        expandBtn.textContent = '🔍 Expand Connections';
                    }
                }
            } else {
                setSelectedNode(null);
                const expandBtn = document.getElementById('expandBtn');
                if (expandBtn) {
                    expandBtn.disabled = true;
                    expandBtn.textContent = '🔍 Expand Connections';
                }
            }
        }

        function showNodeInfo(nodeId) {
            const data = currentNodeData[nodeId];
            if (!data) return;

            const infoHtml = `
                <div class="node-info">
                    <div class="info-item">
                        <div class="info-label">Name</div>
                        <div class="info-value">${data.name}</div>
                    </div>
                    ${data.company ? `
                    <div class="info-item">
                        <div class="info-label">Company</div>
                        <div class="info-value">${data.company}</div>
                    </div>
                    ` : ''}
                    ${data.position ? `
                    <div class="info-item">
                        <div class="info-label">Position</div>
                        <div class="info-value">${data.position}</div>
                    </div>
                    ` : ''}
                    ${data.email ? `
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">${data.email}</div>
                    </div>
                    ` : ''}
                    ${data.url ? `
                    <div class="info-item">
                        <div class="info-label">LinkedIn Profile</div>
                        <div class="info-value">
                            <a href="${data.url}" target="_blank">View Profile</a>
                        </div>
                    </div>
                    ` : ''}
                    ${data.connectedOn ? `
                    <div class="info-item">
                        <div class="info-label">Connected On</div>
                        <div class="info-value">${data.connectedOn}</div>
                    </div>
                    ` : ''}
                </div>
            `;

            const nodeInfoDiv = document.getElementById('nodeInfo');
            if (nodeInfoDiv) {
                nodeInfoDiv.innerHTML = infoHtml;
            }
        }

        // ====================================================================
        // UI Controls
        // ====================================================================
        
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar?.classList.toggle('active');
        }

        function exportGraph() {
            const exportData = {
                nodes: allNodes.map(node => ({
                    id: node.id,
                    label: node.label,
                    data: currentNodeData[node.id]
                })),
                edges: allEdges,
                stats: {
                    totalConnections: connectionsData.length,
                    totalNodes: allNodes.length,
                    totalEdges: allEdges.length
                }
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `linkedin_graph_export_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            showNotification('✅ Graph exported successfully!', 'success');
        }

        // ====================================================================
        // LinkedIn Data Fetching (Placeholder)
        // ====================================================================
        
        function fetchLinkedInData() {
            const urlInput = document.getElementById('linkedinUrl');
            const url = urlInput?.value.trim();
            const statusDiv = document.getElementById('fetchStatus');

            if (!url) {
                if (statusDiv) statusDiv.innerHTML = '<span style="color: #dc3545;">⚠️ Please enter a LinkedIn URL</span>';
                return;
            }

            const usernameMatch = url.match(/linkedin\.com\/in\/([^\/\?]+)/);
            if (!usernameMatch) {
                if (statusDiv) statusDiv.innerHTML = '<span style="color: #dc3545;">⚠️ Invalid LinkedIn URL format</span>';
                return;
            }

            const username = usernameMatch[1];
            if (statusDiv) statusDiv.innerHTML = '<span style="color: #0077b5;">🔄 Fetching data for ' + username + '...</span>';

            // Placeholder implementation
            setTimeout(() => {
                if (statusDiv) {
                    statusDiv.innerHTML = `
                        <span style="color: #ffc107;">⚠️ LinkedIn API Required</span><br>
                        <small style="color: #6c757d;">
                            To fetch live data, you'll need to:<br>
                            1. Set up LinkedIn OAuth 2.0<br>
                            2. Create a backend proxy<br>
                            3. Handle API rate limits<br>
                            See documentation for details.
                        </small>
                    `;
                }
            }, 1500);
        }

        function expandNodeConnections() {
            if (!selectedNode || selectedNode === 'central') {
                showNotification('⚠️ Please select a connection node first', 'warning');
                return;
            }

            const nodeData = currentNodeData[selectedNode];
            if (!nodeData || !nodeData.url) {
                showNotification('⚠️ No LinkedIn URL available for this node', 'error');
                return;
            }

            const statusDiv = document.getElementById('fetchStatus');
            if (statusDiv) statusDiv.innerHTML = '<span style="color: #0077b5;">🔄 Fetching connections for ' + nodeData.name + '...</span>';

            // Placeholder implementation
            setTimeout(() => {
                if (statusDiv) {
                    statusDiv.innerHTML = `
                        <span style="color: #ffc107;">⚠️ Feature Requires API Access</span><br>
                        <small style="color: #6c757d;">
                            This feature requires LinkedIn API access.<br>
                            See documentation for implementation.
                        </small>
                    `;
                }
            }, 1500);
        }

        // ====================================================================
        // Render
        // ====================================================================
        
        // Update node colors based on selection
        const displayNodes = nodes.map(node => {
            if (selectedNode === node.id) {
                return { ...node, fill: '#ffc107' };
            }
            if (node.id === 'central') {
                return { ...node, fill: '#0077b5' };
            }
            return node;
        });

        // Custom theme
        const theme = {
            ...lightTheme,
            node: {
                ...lightTheme.node,
                fill: '#28a745',
                activeFill: '#ffc107',
                label: {
                    ...lightTheme.node.label,
                    color: '#212529'
                }
            },
            edge: {
                ...lightTheme.edge,
                fill: '#848484',
                activeFill: '#0077b5'
            }
        };

        return React.createElement(GraphCanvas, {
            ref: graphRef,
            nodes: displayNodes,
            edges: edges,
            theme: theme,
            layoutType: is3D ? "force3d" : "force",
            clusterAttribute: clustering ? "cluster" : undefined,
            onNodeClick: handleNodeClick,
            cameraMode: is3D ? "rotate" : "pan"
        });
    }

    // ========================================================================
    // Render Application
    // ========================================================================
    
    const graphRoot = document.getElementById('graph-root');
    if (!graphRoot) {
        console.error('graph-root element not found!');
        return;
    }
    
    const root = ReactDOM.createRoot(graphRoot);
    root.render(React.createElement(LinkedInGraphExplorer));
    console.log('LinkedIn Graph Explorer initialized successfully!');
}

// ============================================================================
// Initialize on page load
// ============================================================================

document.addEventListener('DOMContentLoaded', loadModules);
