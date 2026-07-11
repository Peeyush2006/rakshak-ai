import React, { useState } from 'react';
import { MapPin, ShieldAlert, Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface DistrictStats {
  id: string;
  name: string;
  kannadaName: string;
  density: 'high' | 'medium' | 'low';
  crimeRate: number; // incidents per 100k
  policePresence: string;
  activeGangs: number;
  primaryThreat: string;
  kannadaPrimaryThreat: string;
  safetyRating: string;
  coords: string; // SVG path or circle center coordinates
}

export function HotspotMap() {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('D1');

  const districts: DistrictStats[] = [
    {
      id: 'D1',
      name: 'Bengaluru City',
      kannadaName: 'ಬೆಂಗಳೂರು ನಗರ',
      density: 'high',
      crimeRate: 245,
      policePresence: 'High (108 Stations)',
      activeGangs: 3,
      primaryThreat: 'Cybercrime & Extortion',
      kannadaPrimaryThreat: 'ಸೈಬರ್ ಅಪರಾಧ ಮತ್ತು ಸುಲಿಗೆ',
      safetyRating: '6.5/10 (Moderate Risk)',
      coords: 'M 180,260 L 210,260 L 215,290 L 185,295 Z'
    },
    {
      id: 'D2',
      name: 'Mysuru Division',
      kannadaName: 'ಮೈಸೂರು ವಿಭಾಗ',
      density: 'medium',
      crimeRate: 112,
      policePresence: 'Medium (42 Stations)',
      activeGangs: 1,
      primaryThreat: 'House Burglary',
      kannadaPrimaryThreat: 'ಮನೆಗಳ್ಳತನ',
      safetyRating: '8.0/10 (Safe)',
      coords: 'M 140,300 L 180,260 L 185,295 L 150,330 Z'
    },
    {
      id: 'D3',
      name: 'Dakshina Kannada (Mangaluru)',
      kannadaName: 'ದಕ್ಷಿಣ ಕನ್ನಡ (ಮಂಗಳೂರು)',
      density: 'high',
      crimeRate: 184,
      policePresence: 'Medium (38 Stations)',
      activeGangs: 2,
      primaryThreat: 'Drug Trafficking & Smuggling',
      kannadaPrimaryThreat: 'ಮಾದಕ ದ್ರವ್ಯ ಸಾಗಣೆ',
      safetyRating: '7.1/10 (Alert Level)',
      coords: 'M 90,240 L 140,240 L 140,300 L 95,290 Z'
    },
    {
      id: 'D4',
      name: 'Hubballi-Dharwad',
      kannadaName: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ',
      density: 'medium',
      crimeRate: 135,
      policePresence: 'Medium (26 Stations)',
      activeGangs: 1,
      primaryThreat: 'Property Theft & Transit Robbery',
      kannadaPrimaryThreat: 'ಆಸ್ತಿ ಕಳ್ಳತನ ಮತ್ತು ಸಾರಿಗೆ ದರೋಡೆ',
      safetyRating: '7.8/10 (Stable)',
      coords: 'M 110,120 L 160,110 L 155,170 L 105,160 Z'
    },
    {
      id: 'D5',
      name: 'Kalaburagi Region',
      kannadaName: 'ಕಲಬುರಗಿ ವಿಭಾಗ',
      density: 'medium',
      crimeRate: 98,
      policePresence: 'Low (20 Stations)',
      activeGangs: 0,
      primaryThreat: 'Land Disputes & Counterfeiting',
      kannadaPrimaryThreat: 'ಭೂವಿವಾದಗಳು',
      safetyRating: '8.2/10 (Safe)',
      coords: 'M 190,20 L 250,30 L 220,100 L 170,80 Z'
    },
    {
      id: 'D6',
      name: 'Belagavi Division',
      kannadaName: 'ಬೆಳಗಾವಿ ವಿಭಾಗ',
      density: 'low',
      crimeRate: 72,
      policePresence: 'Medium (32 Stations)',
      activeGangs: 0,
      primaryThreat: 'Interstate Border Smuggling',
      kannadaPrimaryThreat: 'ಅಂತರರಾಜ್ಯ ಗಡಿ ಕಳ್ಳಸಾಗಣೆ',
      safetyRating: '8.9/10 (Very Safe)',
      coords: 'M 60,80 L 110,120 L 105,160 L 55,130 Z'
    }
  ];

  const currentDistrict = districts.find(d => d.id === selectedDistrictId) || districts[0];

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'high': return 'var(--accent-secondary)'; // Red/Rose
      case 'medium': return 'var(--accent-warning)'; // Orange
      case 'low': return 'var(--accent-success)'; // Green
      default: return 'var(--text-muted)';
    }
  };

  const getDensityBg = (density: string) => {
    switch (density) {
      case 'high': return 'rgba(244, 63, 94, 0.15)';
      case 'medium': return 'rgba(245, 158, 11, 0.15)';
      case 'low': return 'rgba(16, 185, 129, 0.15)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

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
            <MapPin size={18} color="var(--accent-success)" />
            Karnataka Crime Hotspot Map (ಹ್ಯಾಟ್‌ಸ್ಪಾಟ್ ನಕ್ಷೆ)
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Click regions on the interactive map to dispatch assets or analyze warnings.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflowY: 'auto' }}>
        {/* Interactive map SVG (Left column) */}
        <div style={{
          flex: '1 1 300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
          minHeight: '320px'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px', aspectRatio: '300/360' }}>
            <svg viewBox="0 0 300 360" width="100%" height="100%">
              {/* Karnataka State Base Outline Placeholder Grid */}
              <rect x="10" y="10" width="280" height="340" rx="15" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* State boundary background guide lines */}
              <path d="M 40,80 L 180,15 L 260,30 L 220,130 L 210,240 L 190,340 L 130,340 L 80,280 L 50,140 Z" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
              
              {/* Map Title inside Canvas */}
              <text x="15" y="30" fill="var(--text-muted)" fontSize="9" letterSpacing="1">POLICE JURISDICTION OVERLAY</text>

              {/* Districts Paths */}
              {districts.map((d) => {
                const isSelected = selectedDistrictId === d.id;
                const baseColor = getDensityColor(d.density);
                const fillColor = isSelected ? baseColor : 'rgba(30, 41, 59, 0.4)';
                
                return (
                  <g key={d.id} onClick={() => setSelectedDistrictId(d.id)} style={{ cursor: 'pointer' }}>
                    {/* SVG Path */}
                    <path
                      d={d.coords}
                      fill={fillColor}
                      fillOpacity={isSelected ? 0.35 : 0.6}
                      stroke={isSelected ? '#fff' : baseColor}
                      strokeWidth={isSelected ? 2 : 1}
                      style={{ transition: 'var(--transition-smooth)' }}
                    />
                    
                    {/* Centered locator pins */}
                    <circle
                      cx={
                        d.id === 'D1' ? 200 :
                        d.id === 'D2' ? 165 :
                        d.id === 'D3' ? 120 :
                        d.id === 'D4' ? 130 :
                        d.id === 'D5' ? 210 : 85
                      }
                      cy={
                        d.id === 'D1' ? 275 :
                        d.id === 'D2' ? 295 :
                        d.id === 'D3' ? 270 :
                        d.id === 'D4' ? 140 :
                        d.id === 'D5' ? 60 : 110
                      }
                      r={isSelected ? 6 : 4}
                      fill={baseColor}
                      stroke="#fff"
                      strokeWidth="1.5"
                    />

                    {/* Short Text label */}
                    <text
                      x={
                        d.id === 'D1' ? 200 :
                        d.id === 'D2' ? 165 :
                        d.id === 'D3' ? 120 :
                        d.id === 'D4' ? 130 :
                        d.id === 'D5' ? 210 : 85
                      }
                      y={
                        d.id === 'D1' ? 260 :
                        d.id === 'D2' ? 315 :
                        d.id === 'D3' ? 255 :
                        d.id === 'D4' ? 125 :
                        d.id === 'D5' ? 45 : 95
                      }
                      fill={isSelected ? '#fff' : 'var(--text-secondary)'}
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {d.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Hotspot details panel (Right column) */}
        <div style={{ flex: '1 1 250px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span className="badge" style={{
              background: getDensityBg(currentDistrict.density),
              color: getDensityColor(currentDistrict.density),
              borderColor: getDensityColor(currentDistrict.density)
            }}>
              {currentDistrict.density.toUpperCase()} RISK REGION
            </span>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginTop: '6px' }}>
              {currentDistrict.name}
            </h4>
            <p className="kannada-text" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }}>
              {currentDistrict.kannadaName}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            background: 'rgba(255,255,255,0.02)',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.04)'
          }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>CRIME RATE / 100K</span>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{currentDistrict.crimeRate}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>ACTIVE GANG CELLS</span>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{currentDistrict.activeGangs}</p>
            </div>
            <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>PRIMARY THREAT TYPE</span>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{currentDistrict.primaryThreat}</p>
              <p className="kannada-text" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{currentDistrict.kannadaPrimaryThreat}</p>
            </div>
          </div>

          {/* Safety ratings */}
          <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Station Resources:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{currentDistrict.policePresence}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Safety Index Score:</span>
              <span style={{ color: 'var(--accent-success)', fontWeight: 500 }}>{currentDistrict.safetyRating}</span>
            </div>
          </div>

          {/* Early warnings */}
          {currentDistrict.density === 'high' && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '6px',
              padding: '10px',
              marginTop: 'auto',
              display: 'flex',
              gap: '8px'
            }}>
              <AlertTriangle size={16} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>Early warning: High Alert</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.3 }}>
                  Cyclic pattern shifts indicate cyber phishing waves matching Silicon Shadows MO patterns are targeting corporate infrastructure in Bengaluru East. Enhance station network auditing immediately.
                </p>
              </div>
            </div>
          )}

          {currentDistrict.density === 'medium' && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '6px',
              padding: '10px',
              marginTop: 'auto',
              display: 'flex',
              gap: '8px'
            }}>
              <AlertTriangle size={16} color="var(--accent-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.75rem', color: 'var(--accent-warning)' }}>Spatial Shift Detected</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.3 }}>
                  M.O. signatures for house burglaries indicate suspect movement from Jayanagar (Bengaluru) towards Mysuru suburban sectors. Notify local patrol beats.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
