import React, { useState, useEffect, useRef } from 'react';
import { NetworkNode, NetworkEdge } from '../data/networks';
import { ZoomIn, ZoomOut, RefreshCw, Info, ShieldAlert, Phone, Truck, MapPin, Users } from 'lucide-react';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  onNodeSelect: (node: NetworkNode) => void;
}

interface NodePosition {
  [id: string]: { x: number; y: number };
}

export function NetworkGraph({ nodes, edges, onNodeSelect }: NetworkGraphProps) {
  const [positions, setPositions] = useState<NodePosition>({});
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [relationFilter, setRelationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const svgRef = useRef<SVGSVGElement>(null);

  // Initialize node layout
  const initializeLayout = () => {
    const defaultPositions: NodePosition = {
      C001: { x: 350, y: 220 }, // Suresh Gowda
      C002: { x: 180, y: 350 }, // Techie Ramesh
      C003: { x: 550, y: 320 }, // Yusuf
      C004: { x: 520, y: 120 }, // Anand Murthy
      C005: { x: 220, y: 150 }, // Blade Prakash
      G001: { x: 350, y: 60 },  // Kariya Syndicate
      G002: { x: 80, y: 380 },  // Silicon Shadows
      G003: { x: 680, y: 300 }, // Coastal Cartel
      P001: { x: 300, y: 350 }, // Phone Suresh
      P002: { x: 200, y: 260 }, // Phone Prakash
      P003: { x: 100, y: 460 }, // Phone Ramesh
      V001: { x: 420, y: 320 }, // SUV
      V002: { x: 120, y: 120 }, // Pulsar Bike
      L001: { x: 480, y: 220 }, // Vasant Nagar
      L002: { x: 280, y: 450 }, // Majestic
      L003: { x: 650, y: 420 }  // Ullal Beach
    };

    // Fallback placement for any dynamically added nodes
    const newPositions: NodePosition = {};
    nodes.forEach((node, idx) => {
      if (defaultPositions[node.id]) {
        newPositions[node.id] = defaultPositions[node.id];
      } else {
        // Distribute in a circle
        const angle = (idx / nodes.length) * 2 * Math.PI;
        newPositions[node.id] = {
          x: 350 + 200 * Math.cos(angle),
          y: 250 + 150 * Math.sin(angle)
        };
      }
    });

    setPositions(newPositions);
  };

  useEffect(() => {
    initializeLayout();
  }, [nodes]);

  // Handle Dragging
  const handleMouseDown = (nodeId: string) => {
    setDraggingNodeId(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNodeId || !svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const viewBoxWidth = 800;
    const viewBoxHeight = 550;
    const scaledX = (x / rect.width) * viewBoxWidth;
    const scaledY = (y / rect.height) * viewBoxHeight;

    setPositions(prev => ({
      ...prev,
      [draggingNodeId]: {
        x: Math.max(30, Math.min(viewBoxWidth - 30, scaledX)),
        y: Math.max(30, Math.min(viewBoxHeight - 30, scaledY))
      }
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const handleTouchStart = (nodeId: string, e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    setDraggingNodeId(nodeId);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!draggingNodeId || !svgRef.current) return;
    
    const touch = e.touches[0];
    const rect = svgRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const viewBoxWidth = 800;
    const viewBoxHeight = 550;
    const scaledX = (x / rect.width) * viewBoxWidth;
    const scaledY = (y / rect.height) * viewBoxHeight;

    setPositions(prev => ({
      ...prev,
      [draggingNodeId]: {
        x: Math.max(30, Math.min(viewBoxWidth - 30, scaledX)),
        y: Math.max(30, Math.min(viewBoxHeight - 30, scaledY))
      }
    }));
  };

  const handleTouchEnd = () => {
    setDraggingNodeId(null);
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    onNodeSelect(node);
  };

  // Node Icon Mapper
  const renderNodeIcon = (type: string, color: string) => {
    switch (type) {
      case 'criminal':
        return <circle r="16" fill="rgba(244, 63, 94, 0.2)" stroke={color} strokeWidth="2" />;
      case 'gang':
        return <polygon points="0,-16 14,8 -14,8" fill="rgba(168, 85, 247, 0.2)" stroke={color} strokeWidth="2" />;
      case 'phone':
        return <rect x="-11" y="-15" width="22" height="30" rx="3" fill="rgba(56, 189, 248, 0.2)" stroke={color} strokeWidth="2" />;
      case 'vehicle':
        return <rect x="-15" y="-11" width="30" height="22" rx="2" fill="rgba(245, 158, 11, 0.2)" stroke={color} strokeWidth="2" />;
      case 'location':
        return <path d="M0 -16 C -9 -7, -9 2, 0 16 C 9 2, 9 -7, 0 -16 Z" fill="rgba(16, 185, 129, 0.2)" stroke={color} strokeWidth="2" />;
      default:
        return <circle r="12" fill="var(--bg-tertiary)" stroke={color} strokeWidth="2" />;
    }
  };

  const getNodeColor = (type: string, isHighlighted: boolean) => {
    if (!isHighlighted) return '#334155'; // Grayed out/muted
    
    switch (type) {
      case 'criminal': return 'var(--accent-secondary)'; // Rose
      case 'gang': return 'var(--accent-purple)'; // Purple
      case 'phone': return 'var(--accent-primary)'; // Sky Blue
      case 'vehicle': return 'var(--accent-warning)'; // Amber
      case 'location': return 'var(--accent-success)'; // Emerald
      default: return 'var(--text-secondary)';
    }
  };

  // Check connection status for highlighting
  const getHighlightStatus = (nodeId: string) => {
    if (!hoveredNodeId) return true; // Show all normally
    if (hoveredNodeId === nodeId) return true;
    
    // Check if connected
    return edges.some(edge => 
      (edge.source === hoveredNodeId && edge.target === nodeId) ||
      (edge.target === hoveredNodeId && edge.source === nodeId)
    );
  };

  const getEdgeHighlightStatus = (edge: NetworkEdge) => {
    if (!hoveredNodeId) return true;
    return edge.source === hoveredNodeId || edge.target === hoveredNodeId;
  };

  // Filter edges based on selections
  const filteredEdges = edges.filter(edge => {
    // Relationship type filter
    if (relationFilter !== 'all' && edge.type !== relationFilter) return false;
    return true;
  });

  // Filter nodes: keep nodes that are connected via filtered edges, or match the search query
  const filteredNodes = nodes.filter(node => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = node.label.toLowerCase().includes(q) || node.kannadaLabel.includes(q);
      const detailMatch = node.details.toLowerCase().includes(q) || node.kannadaDetails.includes(q);
      if (!nameMatch && !detailMatch) return false;
    }
    return true;
  });

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Controls Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--accent-secondary)" />
            Criminal Link Analysis (ಜಾಲ ವಿಶ್ಲೇಷಣೆ)
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Click suspects to view dossiers. Drag circles to restructure network.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Relation filter */}
          <select 
            value={relationFilter} 
            onChange={(e) => setRelationFilter(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              outline: 'none'
            }}
          >
            <option value="all">All Relations</option>
            <option value="accomplice">Accomplice (ಸಹಚರ)</option>
            <option value="gang_member">Gang Members (ಗುಂಪು)</option>
            <option value="calls">Phone Calls (ಕರೆಗಳು)</option>
            <option value="vehicle_use">Vehicle Use (ವಾಹನ)</option>
            <option value="location_base">Location Base (ಸ್ಥಳ)</option>
          </select>

          {/* Search box */}
          <input 
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              width: '120px',
              outline: 'none'
            }}
          />

          <button onClick={initializeLayout} className="btn" style={{ padding: '4px 8px', height: '26px' }} title="Reset Layout">
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', background: '#070a13' }}>
        {/* Network SVG Canvas */}
        <svg
          ref={svgRef}
          viewBox="0 0 800 550"
          width="100%"
          height="100%"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: draggingNodeId ? 'grabbing' : 'default' }}
        >
          {/* Defs for arrow markers */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
            </marker>
            <marker id="arrow-high" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-primary)" />
            </marker>
          </defs>

          {/* Draw Edges */}
          {filteredEdges.map((edge) => {
            const sourcePos = positions[edge.source];
            const targetPos = positions[edge.target];
            if (!sourcePos || !targetPos) return null;

            const isHighlighted = getEdgeHighlightStatus(edge);
            const strokeColor = isHighlighted ? 'rgba(56, 189, 248, 0.6)' : 'rgba(51, 65, 85, 0.2)';
            const strokeWidth = isHighlighted ? 1.5 + edge.weight * 0.5 : 1;
            const midX = (sourcePos.x + targetPos.x) / 2;
            const midY = (sourcePos.y + targetPos.y) / 2;

            return (
              <g key={edge.id}>
                {/* Edge line */}
                <line
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={edge.type === 'calls' ? '4,4' : undefined}
                  markerEnd={edge.type === 'vehicle_use' || edge.type === 'location_base' ? "url(#arrow)" : undefined}
                />
                
                {/* Edge relationship badge/label on hover */}
                {isHighlighted && hoveredNodeId && (
                  <g>
                    <rect
                      x={midX - 50}
                      y={midY - 8}
                      width="100"
                      height="16"
                      rx="3"
                      fill="var(--bg-secondary)"
                      stroke="var(--border-color)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      fill="var(--text-secondary)"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Draw Nodes */}
          {filteredNodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            const isHighlighted = getHighlightStatus(node.id);
            const color = getNodeColor(node.type, isHighlighted);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseDown={() => handleMouseDown(node.id)}
                onTouchStart={(e) => handleTouchStart(node.id, e)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: 'grab' }}
              >
                {/* Selected Halo Ring */}
                {isSelected && (
                  <circle
                    r="24"
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    className="animate-spin"
                    style={{ animationDuration: '6s' }}
                  />
                )}

                {/* Node Shape and border color */}
                {renderNodeIcon(node.type, color)}

                {/* Risk score pill for criminals */}
                {node.type === 'criminal' && node.riskScore && isHighlighted && (
                  <g transform="translate(12, -12)">
                    <circle r="7" fill={node.riskScore > 80 ? 'var(--accent-secondary)' : 'var(--accent-warning)'} />
                    <text y="3" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">
                      {node.riskScore}
                    </text>
                  </g>
                )}

                {/* Node Label Text */}
                <text
                  y="28"
                  fill={isHighlighted ? 'var(--text-primary)' : 'var(--text-muted)'}
                  fontSize="10.5"
                  fontWeight={node.type === 'criminal' ? 'bold' : 'normal'}
                  textAnchor="middle"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    fontFamily: 'var(--font-english)',
                    pointerEvents: 'none'
                  }}
                >
                  {node.label}
                </text>
                
                {/* Kannada Sub-Label */}
                {isHighlighted && (
                  <text
                    y="39"
                    fill="var(--accent-primary)"
                    fontSize="9.5"
                    className="kannada-text"
                    textAnchor="middle"
                    style={{
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                      pointerEvents: 'none'
                    }}
                  >
                    {node.kannadaLabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          padding: '8px 12px',
          background: 'rgba(10, 14, 26, 0.85)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '0.7rem'
        }}>
          <div style={{ fontWeight: 600, color: '#fff', marginBottom: '2px' }}>Legend</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></span>
            <span>Suspect (ಶಂಕಿತ)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '8px solid var(--accent-purple)' }}></span>
            <span>Syndicate (ಗುಂಪು)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-primary)' }}></span>
            <span>Phone (ದೂರವಾಣಿ)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', rx: '1px', background: 'var(--accent-warning)' }}></span>
            <span>Vehicle (ವಾಹನ)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '10px', borderRadius: '3px', background: 'var(--accent-success)' }}></span>
            <span>Location (ಸ್ಥಳ)</span>
          </div>
        </div>

        {/* Info Box Detail Drawer */}
        {selectedNode && (
          <div className="animate-fade-in" style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '240px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                {selectedNode.type}
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem' }}
              >
                ×
              </button>
            </div>
            
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>{selectedNode.label}</h4>
            <p className="kannada-text" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>{selectedNode.kannadaLabel}</p>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Details:</span>
                <p style={{ color: 'var(--text-primary)', marginTop: '2px' }}>{selectedNode.details}</p>
                <p className="kannada-text" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '1px', fontStyle: 'italic' }}>{selectedNode.kannadaDetails}</p>
              </div>

              {selectedNode.riskScore && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Risk Score:</span>
                  <span style={{
                    color: selectedNode.riskScore > 80 ? 'var(--accent-secondary)' : 'var(--accent-warning)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {selectedNode.riskScore}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
