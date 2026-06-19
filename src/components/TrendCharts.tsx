import React from 'react';
import { TrendingUp, ShieldCheck, Activity, Award } from 'lucide-react';
import { cases } from '../data/cases';

export function TrendCharts() {
  // Hardcoded monthly trends for Bengaluru City
  const monthlyData = [
    { month: 'Jan', count: 65 },
    { month: 'Feb', count: 80 },
    { month: 'Mar', count: 125 }, // Yusuf drug bust spike
    { month: 'Apr', count: 95 },  // Jayanagar burglaries
    { month: 'May', count: 145 }, // Suresh extortion waves
    { month: 'Jun', count: 168 }  // Recent spike
  ];

  // Distribute case statistics
  const crimeBreakdown = [
    { label: 'Cybercrime', count: 32, percentage: 35, color: 'var(--accent-primary)' },
    { label: 'Drug Trafficking', count: 24, percentage: 26, color: 'var(--accent-purple)' },
    { label: 'House Burglary', count: 18, percentage: 20, color: 'var(--accent-success)' },
    { label: 'Robbery', count: 11, percentage: 12, color: 'var(--accent-warning)' },
    { label: 'Extortion', count: 7, percentage: 7, color: 'var(--accent-secondary)' }
  ];

  // Calculate SVG line coordinates
  const width = 240;
  const height = 100;
  const maxVal = 180;
  const points = monthlyData.map((d, i) => {
    const x = (i / (monthlyData.length - 1)) * width;
    const y = height - (d.count / maxVal) * height;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--accent-primary)" />
            Crime Analytics & Early Predictions
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Aggregated telemetry of active cases and seasonal variations.</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        
        {/* Row 1: Line Chart & Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          
          {/* Line Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Trend Index (H1 2026)</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>+23% Monthly Spike</span>
            </div>
            
            {/* SVG Line Graph */}
            <div style={{ position: 'relative', width: '100%', height: '100px', margin: '8px 0' }}>
              <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
                {/* Area Gradient fill */}
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid guides */}
                <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                {/* Line Path Area */}
                <polygon points={areaPoints} fill="url(#areaGrad)" />

                {/* Main Trend Line */}
                <polyline
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  points={points}
                />

                {/* Interactive circles */}
                {monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * width;
                  const y = height - (d.count / maxVal) * height;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill="var(--bg-primary)"
                      stroke="var(--accent-primary)"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>

            {/* X Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              {monthlyData.map((d, i) => <span key={i}>{d.month}</span>)}
            </div>
          </div>

          {/* Core Analytics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
              <Activity size={14} color="var(--accent-primary)" />
              <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '4px' }}>SOLVED RATE</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-success)' }}>76.4%</div>
              <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>State Average: 68%</div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
              <ShieldCheck size={14} color="var(--accent-purple)" />
              <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '4px' }}>RESPONSE TIME</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>9.4 Min</div>
              <div style={{ fontSize: '0.55rem', color: 'var(--accent-primary)' }}>-2.1m since May</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ACTIVE FORCE STATUS</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Red-Zone Watch (ಬೆಂಗಳೂರು)</div>
                </div>
                <Award size={16} color="var(--accent-warning)" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                  <div style={{ width: '85%', height: '4px', background: 'var(--accent-warning)', borderRadius: '2px' }}></div>
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>85% Deployment</span>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Horizontal breakdown bar layout */}
        <div style={{
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '8px',
          padding: '12px'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Crime Category Composition</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {crimeBreakdown.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.count} Cases ({item.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '6px',
                    background: item.color,
                    borderRadius: '3px',
                    boxShadow: `0 0 8px ${item.color}44`
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
