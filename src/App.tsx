import React, { useState } from 'react';
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Banner Header */}
      <header style={{
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
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                <option value="Chief of Police">Chief of Police (COMMISSIONER)</option>
                <option value="Lead Investigator">Lead Investigator (ACP/INSPECTOR)</option>
                <option value="Field Officer">Field Officer (CONSTABLE)</option>
              </select>
            </div>
          </div>
          
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            System Code: <strong>SECURE-RAKSHAK-V2</strong>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        
        {/* Left Navigation Bar */}
        <nav style={{
          width: '80px',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          gap: '20px'
        }}>
          <button 
            onClick={() => handleTabChange('chat')} 
            className="btn" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              padding: 0,
              justifyContent: 'center',
              background: activeTab === 'chat' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              borderColor: activeTab === 'chat' ? 'var(--accent-primary)' : 'transparent',
              boxShadow: activeTab === 'chat' ? 'var(--glow-box-shadow)' : 'none'
            }}
            title="Bilingual Conversational AI"
          >
            <MessageSquare size={20} color={activeTab === 'chat' ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
          </button>

          <button 
            onClick={() => handleTabChange('network')} 
            className="btn" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              padding: 0,
              justifyContent: 'center',
              background: activeTab === 'network' ? 'rgba(244, 63, 94, 0.15)' : 'transparent',
              borderColor: activeTab === 'network' ? 'var(--accent-secondary)' : 'transparent',
              boxShadow: activeTab === 'network' ? '0 0 15px rgba(244, 63, 94, 0.15)' : 'none'
            }}
            title="Link Network Graph"
          >
            <Share2 size={20} color={activeTab === 'network' ? 'var(--accent-secondary)' : 'var(--text-secondary)'} />
          </button>

          <button 
            onClick={() => handleTabChange('hotspots')} 
            className="btn" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              padding: 0,
              justifyContent: 'center',
              background: activeTab === 'hotspots' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              borderColor: activeTab === 'hotspots' ? 'var(--accent-success)' : 'transparent',
              boxShadow: activeTab === 'hotspots' ? '0 0 15px rgba(16, 185, 129, 0.15)' : 'none'
            }}
            title="Hotspots Heatmap"
          >
            <Map size={20} color={activeTab === 'hotspots' ? 'var(--accent-success)' : 'var(--text-secondary)'} />
          </button>

          <button 
            onClick={() => handleTabChange('analytics')} 
            className="btn" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              padding: 0,
              justifyContent: 'center',
              background: activeTab === 'analytics' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              borderColor: activeTab === 'analytics' ? 'var(--accent-warning)' : 'transparent',
              boxShadow: activeTab === 'analytics' ? '0 0 15px rgba(245, 158, 11, 0.15)' : 'none'
            }}
            title="Crime Trend Telemetry"
          >
            <BarChart3 size={20} color={activeTab === 'analytics' ? 'var(--accent-warning)' : 'var(--text-secondary)'} />
          </button>

          <button 
            onClick={() => handleTabChange('audits')} 
            className="btn" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              padding: 0,
              justifyContent: 'center',
              background: activeTab === 'audits' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              borderColor: activeTab === 'audits' ? 'var(--accent-purple)' : 'transparent',
              boxShadow: activeTab === 'audits' ? '0 0 15px rgba(168, 85, 247, 0.15)' : 'none',
              marginTop: 'auto'
            }}
            title="Security Audit Ledger"
          >
            <FileLock2 size={20} color={activeTab === 'audits' ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
          </button>
        </nav>

        {/* Tab content panel */}
        <main style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          
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
          <aside className="glass-panel" style={{
            width: '320px',
            borderLeft: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            margin: '20px 20px 20px 0',
            borderRadius: '12px'
          }}>
            
            {/* Sidebar header */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
                {selectedCriminal ? 'Suspect Dossier' : 'Case Docket'}
              </h3>
              <button 
                className="btn"
                onClick={() => {
                  setSelectedCriminalId(null);
                  setSelectedCaseId(null);
                }}
                style={{ padding: '2px 6px', fontSize: '0.75rem', height: '24px' }}
              >
                Clear
              </button>
            </div>

            {/* Dossier contents */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedCriminal && (
                <>
                  {/* Photo / Sketch representation */}
                  <div style={{
                    width: '100%',
                    height: '140px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                      background: selectedCriminal.status === 'Wanted' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: selectedCriminal.status === 'Wanted' ? 'var(--accent-secondary)' : 'var(--accent-success)',
                      border: `1px solid ${selectedCriminal.status === 'Wanted' ? 'var(--accent-secondary)' : 'var(--accent-success)'}`
                    }}>
                      {selectedCriminal.status.toUpperCase()}
                    </div>
                    
                    <User size={42} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>CRIMINAL PROFILE SKETCH</span>
                  </div>

                  {/* Identity */}
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{selectedCriminal.name}</h2>
                    <p className="kannada-text" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)' }}>{selectedCriminal.kannadaName}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px', fontSize: '0.75rem' }}>
                      <span>Alias: <strong>{selectedCriminal.alias}</strong></span>
                      <span>•</span>
                      <span>Age: <strong>{selectedCriminal.age}</strong></span>
                    </div>
                  </div>

                  {/* Risk & Gang info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Risk Score Index:</span>
                      <span style={{ fontWeight: 'bold', color: selectedCriminal.riskScore > 80 ? 'var(--accent-secondary)' : 'var(--accent-warning)' }}>
                        {selectedCriminal.riskScore}%
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Gang Affiliation:</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{selectedCriminal.gangAffiliation}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Primary Offense:</span>
                      <span style={{ color: 'var(--accent-primary)' }}>{selectedCriminal.primaryCrimeType}</span>
                    </div>
                  </div>

                  {/* Modus operandi */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Modus Operandi (MO)</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{selectedCriminal.modusOperandi}</p>
                    <p className="kannada-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{selectedCriminal.kannadaModusOperandi}</p>
                  </div>

                  {/* Physical traits */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Physical Identification Marks</h4>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)' }}>
                      {selectedCriminal.physicalTraits.map((t, idx) => <li key={idx}>{t}</li>)}
                    </ul>
                  </div>

                  {/* Bio */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Criminal Background</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{selectedCriminal.biography}</p>
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
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{selectedCase.title}</h2>
                    <p className="kannada-text" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginTop: '2px' }}>{selectedCase.kannadaTitle}</p>
                  </div>

                  {/* Meta stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Case Number:</span>
                      <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedCase.caseNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                      <span style={{ 
                        color: selectedCase.status === 'Closed' ? 'var(--accent-success)' : 'var(--accent-warning)',
                        fontWeight: 600 
                      }}>
                        {selectedCase.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Incident Date:</span>
                      <span>{selectedCase.date}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Assigned Officer:</span>
                      <span>{selectedCase.assignedOfficer}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Incident Summary</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{selectedCase.description}</p>
                    <p className="kannada-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{selectedCase.kannadaDescription}</p>
                  </div>

                  {/* Evidence locker */}
                  <div style={{ fontSize: '0.75rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Seized Evidence</h4>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {selectedCase.evidence.map((ev, idx) => (
                        <li key={idx} style={{ lineHeight: 1.3 }}>{ev}</li>
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
