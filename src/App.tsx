import React, { useState, useEffect } from 'react';
import { 
  Shield, MessageSquare, Share2, Map, BarChart3, FileLock2, 
  User, Lock, Eye, AlertOctagon, HelpCircle, ChevronRight, Activity 
} from 'lucide-react';
import { ChatWindow } from './components/ChatWindow';
import { NetworkGraph } from './components/NetworkGraph';
import { HotspotMap } from './components/HotspotMap';
import { TrendCharts } from './components/TrendCharts';
import { AuditLogs } from './components/AuditLogs';
import { SearchResult } from './hooks/useCrimeSearch';
import { criminals, Criminal } from './data/criminals';
import { cases, CaseRecord } from './data/cases';
import { networkNodes, networkEdges } from './data/networks';

type DashboardTab = 'chat' | 'network' | 'hotspots' | 'analytics' | 'audits';
type UserRole = 'Chief of Police' | 'Lead Investigator' | 'Field Officer';

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('chat');
  const [role, setRole] = useState<UserRole>('Lead Investigator');
  
  // Live ticking digital clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Shared network & map data from active chat queries
  const [filteredNodes, setFilteredNodes] = useState(networkNodes);
  const [filteredEdges, setFilteredEdges] = useState(networkEdges);

  // Selected entities for sidebar dossier/docket view
  const [selectedCriminalId, setSelectedCriminalId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const selectedCriminal = criminals.find(c => c.id === selectedCriminalId);
  const selectedCase = cases.find(c => c.id === selectedCaseId);

  // Callback when investigator executes natural language search
  const handleSearchTriggered = (result: SearchResult) => {
    setFilteredNodes(result.filteredNodes);
    setFilteredEdges(result.filteredEdges);
  };

  // Navigations from within chat cards
  const handleSelectCriminal = (id: string) => {
    setSelectedCriminalId(id);
    setSelectedCaseId(null);
    setActiveTab('network'); // switch to network graph view to highlight them
  };

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setSelectedCriminalId(null);
    // Open case in analytics/timeline or just show dossier
  };

  // Tab switching helper with RBAC validation
  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Banner Header */}
      <header className="app-header" style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50
      }}>
        {/* Logo and State identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
          }}>
            ರ
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              RAKSHAK AI <span style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem' }}>BILINGUAL COP</span>
            </h1>
            <p className="header-subtitle" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Karnataka Police Crime Intelligence Platform • ಕರ್ನಾಟಕ ಪೊಲೀಸ್
            </p>
          </div>
        </div>

        {/* Global Security / Role selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.1)',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            <Shield size={14} color="var(--accent-primary)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>INVESTIGATOR CLEARANCE</span>
              <select 
                value={role} 
                onChange={(e) => {
                  setRole(e.target.value as UserRole);
                  // Reset if on restricted tab
                  if (e.target.value === 'Field Officer' && activeTab === 'audits') {
                    setActiveTab('chat');
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  outline: 'none',
                  cursor: 'pointer',
                  paddingRight: '6px'
                }}
              >
                <option value="Chief of Police">Chief (Comm.)</option>
                <option value="Lead Investigator">Investigator (ACP)</option>
                <option value="Field Officer">Officer (Const.)</option>
              </select>
            </div>
          </div>
          
          <div className="header-clock" style={{
            fontSize: '0.8rem',
            color: 'var(--accent-primary)',
            background: 'rgba(0, 180, 216, 0.05)',
            border: '1px solid rgba(0, 180, 216, 0.1)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
            {time.toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        
        {/* Left Navigation Bar */}
        <nav className="app-nav" style={{
          width: '90px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          gap: '24px'
        }}>
          {/* Logo container */}
          <div className="nav-title" style={{
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px'
          }}>
            NAVIGATE
          </div>

          <button 
            onClick={() => handleTabChange('chat')} 
            className={`btn ${activeTab === 'chat' ? 'active-tab-chat' : ''}`} 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              padding: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              background: activeTab === 'chat' ? 'rgba(0, 180, 216, 0.12)' : 'transparent',
              borderColor: activeTab === 'chat' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              boxShadow: activeTab === 'chat' ? 'var(--glow-box-shadow)' : 'none'
            }}
            title="Bilingual Conversational AI"
          >
            <MessageSquare size={20} color={activeTab === 'chat' ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.55rem', color: activeTab === 'chat' ? 'var(--accent-primary)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>AI Chat</span>
          </button>

          <button 
            onClick={() => handleTabChange('network')} 
            className={`btn ${activeTab === 'network' ? 'active-tab-network' : ''}`} 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              padding: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              background: activeTab === 'network' ? 'rgba(255, 0, 84, 0.12)' : 'transparent',
              borderColor: activeTab === 'network' ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.03)',
              boxShadow: activeTab === 'network' ? 'var(--neon-shadow-pink)' : 'none'
            }}
            title="Link Network Graph"
          >
            <Share2 size={20} color={activeTab === 'network' ? 'var(--accent-secondary)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.55rem', color: activeTab === 'network' ? 'var(--accent-secondary)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Links</span>
          </button>

          <button 
            onClick={() => handleTabChange('hotspots')} 
            className={`btn ${activeTab === 'hotspots' ? 'active-tab-hotspots' : ''}`} 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              padding: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              background: activeTab === 'hotspots' ? 'rgba(56, 176, 0, 0.12)' : 'transparent',
              borderColor: activeTab === 'hotspots' ? 'var(--accent-neon-green)' : 'rgba(255,255,255,0.03)',
              boxShadow: activeTab === 'hotspots' ? '0 0 15px rgba(56, 176, 0, 0.25)' : 'none'
            }}
            title="Hotspots Heatmap"
          >
            <Map size={20} color={activeTab === 'hotspots' ? 'var(--accent-neon-green)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.55rem', color: activeTab === 'hotspots' ? 'var(--accent-neon-green)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Map</span>
          </button>

          <button 
            onClick={() => handleTabChange('analytics')} 
            className={`btn ${activeTab === 'analytics' ? 'active-tab-analytics' : ''}`} 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              padding: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              background: activeTab === 'analytics' ? 'rgba(255, 183, 3, 0.12)' : 'transparent',
              borderColor: activeTab === 'analytics' ? 'var(--accent-warning)' : 'rgba(255,255,255,0.03)',
              boxShadow: activeTab === 'analytics' ? '0 0 15px rgba(255, 183, 3, 0.25)' : 'none'
            }}
            title="Crime Trend Telemetry"
          >
            <BarChart3 size={20} color={activeTab === 'analytics' ? 'var(--accent-warning)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.55rem', color: activeTab === 'analytics' ? 'var(--accent-warning)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Trends</span>
          </button>

          <button 
            onClick={() => handleTabChange('audits')} 
            className={`btn ${activeTab === 'audits' ? 'active-tab-audits' : ''}`} 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              padding: 0,
              flexDirection: 'column',
              justifyContent: 'center',
              background: activeTab === 'audits' ? 'rgba(157, 78, 221, 0.12)' : 'transparent',
              borderColor: activeTab === 'audits' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.03)',
              boxShadow: activeTab === 'audits' ? '0 0 15px rgba(157, 78, 221, 0.25)' : 'none',
              marginTop: 'auto'
            }}
            title="Security Audit Ledger"
          >
            <FileLock2 size={20} color={activeTab === 'audits' ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.55rem', color: activeTab === 'audits' ? 'var(--accent-purple)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Audits</span>
          </button>
        </nav>

        {/* Tab content panel */}
        <main className="app-main-panel" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          
          {/* Active Tab Routing */}
          <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
            {activeTab === 'chat' && (
              <ChatWindow 
                userRole={role}
                onSearchTriggered={handleSearchTriggered}
                onSelectCriminal={handleSelectCriminal}
                onSelectCase={handleSelectCase}
              />
            )}

            {activeTab === 'network' && (
              <NetworkGraph 
                nodes={filteredNodes}
                edges={filteredEdges}
                onNodeSelect={(node) => {
                  if (node.type === 'criminal') {
                    setSelectedCriminalId(node.id);
                    setSelectedCaseId(null);
                  }
                }}
              />
            )}

            {activeTab === 'hotspots' && (
              <HotspotMap />
            )}

            {activeTab === 'analytics' && (
              <TrendCharts />
            )}

            {activeTab === 'audits' && (
              role === 'Field Officer' ? (
                /* Access Control Lock overlay screen */
                <div className="glass-panel" style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(244,63,94,0.1)',
                    border: '2px solid var(--accent-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-secondary)'
                  }}>
                    <Lock size={28} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>RESTRICTED SECURITY LAYER</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '400px', marginTop: '6px' }}>
                      Cryptographic Audit logs require Investigator-level clearance or Chief override. Your current clearance is: <strong>{role.toUpperCase()}</strong>.
                    </p>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '8px' }}>
                    Access violation attempted on SECURE-RAKSHAK-V2 ledger. This event has been dispatched to state compliance monitors.
                  </div>
                </div>
              ) : (
                <AuditLogs />
              )
            )}
          </div>
        </main>

        {/* Dynamic Details dossier sidebar (Right panel) */}
        {(selectedCriminal || selectedCase) && (
          <aside className="glass-panel app-sidebar" style={{
            width: '330px',
            borderLeft: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            margin: '20px 20px 20px 0',
            borderRadius: '16px',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.8), 0 0 20px rgba(0, 180, 216, 0.1)'
          }}>
            
            {/* Sidebar header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(18, 24, 44, 0.6)'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: selectedCriminal ? 'var(--accent-secondary)' : 'var(--accent-purple)' }}></span>
                {selectedCriminal ? 'BIOMETRIC DOSSIER' : 'CASE FILE DOCKET'}
              </h3>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCriminalId(null);
                  setSelectedCaseId(null);
                }}
                style={{ padding: '4px 10px', fontSize: '0.7rem', height: '26px', borderRadius: '6px' }}
              >
                Close
              </button>
            </div>

            {/* Dossier contents */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedCriminal && (
                <>
                  {/* High Tech Biometric Sonar Scanner */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '140px',
                    background: '#04060b',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {/* Concentric rings */}
                    <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed rgba(0, 180, 216, 0.15)' }}></div>
                    <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(0, 180, 216, 0.08)' }}></div>
                    <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(0, 180, 216, 0.15)' }}></div>

                    {/* Rotating radar line */}
                    <svg style={{ position: 'absolute', width: '120px', height: '120px' }} className="radar-sweep">
                      <line x1="60" y1="60" x2="60" y2="0" stroke="rgba(0, 180, 216, 0.6)" strokeWidth="1.5" />
                      <circle cx="60" cy="20" r="3.5" fill="var(--accent-secondary)" className="animate-pulse" />
                    </svg>

                    <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <User size={38} color="var(--accent-primary)" />
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '1px' }}>BIOMETRIC RADAR</span>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '6px',
                      right: '8px',
                      fontSize: '0.55rem',
                      color: 'var(--accent-neon-green)',
                      fontFamily: 'monospace',
                      fontWeight: 'bold'
                    }}>
                      SYSTEM: ARMED
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '8px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                      background: selectedCriminal.status === 'Wanted' ? 'rgba(255, 0, 84, 0.18)' : 'rgba(56, 176, 0, 0.18)',
                      color: selectedCriminal.status === 'Wanted' ? 'var(--accent-secondary)' : 'var(--accent-neon-green)',
                      border: `1px solid ${selectedCriminal.status === 'Wanted' ? 'var(--accent-secondary)' : 'var(--accent-neon-green)'}`
                    }}>
                      {selectedCriminal.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Identity */}
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>{selectedCriminal.name}</h2>
                    <p className="kannada-text" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{selectedCriminal.kannadaName}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Alias: <strong style={{ color: '#fff' }}>{selectedCriminal.alias}</strong></span>
                      <span>•</span>
                      <span>Age: <strong style={{ color: '#fff' }}>{selectedCriminal.age}</strong></span>
                    </div>
                  </div>

                  {/* High Tech Risk Meter Progress slider bar */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>RECIDIVISM RISK RATING</span>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: selectedCriminal.riskScore > 80 ? 'var(--accent-secondary)' : 'var(--accent-warning)',
                        fontSize: '0.85rem'
                      }}>
                        {selectedCriminal.riskScore}%
                      </span>
                    </div>
                    {/* The Gradient Slider Bar */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${selectedCriminal.riskScore}%`,
                        height: '6px',
                        background: selectedCriminal.riskScore > 80 ? 
                          'linear-gradient(90deg, var(--accent-warning) 0%, var(--accent-secondary) 100%)' : 
                          'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-warning) 100%)',
                        borderRadius: '3px'
                      }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>STABLE</span>
                      <span>ELEVATED</span>
                      <span>CRITICAL</span>
                    </div>
                  </div>

                  {/* Profile data list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>GANG CELL AFFILIATION</span>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>{selectedCriminal.gangAffiliation}</p>
                    </div>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PRIMARY TARGET SECTOR</span>
                      <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>{selectedCriminal.primaryCrimeType}</p>
                    </div>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>COM-INT CONTACT DETAILS</span>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'monospace', marginTop: '2px' }}>{selectedCriminal.contactNumber}</p>
                    </div>
                  </div>

                  {/* Modus operandi */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>MODUS OPERANDI (M.O.)</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>{selectedCriminal.modusOperandi}</p>
                    <p className="kannada-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{selectedCriminal.kannadaModusOperandi}</p>
                  </div>

                  {/* Physical traits */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>IDENTIFYING BIO-MARKS</h4>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {selectedCriminal.physicalTraits.map((t, idx) => <li key={idx}>{t}</li>)}
                    </ul>
                  </div>

                  {/* Bio */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>OPERATIONAL HISTORY</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>{selectedCriminal.biography}</p>
                  </div>
                </>
              )}

              {selectedCase && (
                <>
                  {/* Case Title */}
                  <div>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>
                      {selectedCase.type}
                    </span>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{selectedCase.title}</h2>
                    <p className="kannada-text" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginTop: '2px', fontWeight: 500 }}>{selectedCase.kannadaTitle}</p>
                  </div>

                  {/* Meta stats details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Docket Number:</span>
                      <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{selectedCase.caseNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Investigation Phase:</span>
                      <span style={{ 
                        color: selectedCase.status === 'Closed' ? 'var(--accent-neon-green)' : 'var(--accent-warning)',
                        fontWeight: 700 
                      }}>
                        {selectedCase.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Offense Date:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedCase.date}</span>
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>ACP Lead Officer:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCase.assignedOfficer}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>INCIDENT TELEMETRY</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>{selectedCase.description}</p>
                    <p className="kannada-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{selectedCase.kannadaDescription}</p>
                  </div>

                  {/* Evidence locker */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>CONFISCATED EVIDENCE</h4>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {selectedCase.evidence.map((ev, idx) => (
                        <li key={idx} style={{ lineHeight: 1.35 }}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
