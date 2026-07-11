import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, FileText, Search, Filter } from 'lucide-react';

interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  kannadaAction: string;
  status: 'Pass' | 'Blocked' | 'Warning';
  details: string;
}

export function AuditLogs() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const logs: AuditRecord[] = [
    {
      id: "AUD-1090",
      timestamp: "2026-06-09 15:42:12",
      user: "ACP Pradeep Rao",
      role: "Chief of Police",
      action: "System Audit Export",
      kannadaAction: "ಸಿಸ್ಟಮ್ ಆಡಿಟ್ ರಫ್ತು",
      status: "Pass",
      details: "Successfully decrypted and exported system logs for high-level regulatory assessment."
    },
    {
      id: "AUD-1089",
      timestamp: "2026-06-09 14:15:30",
      user: "Inspector Ramesh Kumar",
      role: "Lead Investigator",
      action: "Suspect Link Query",
      kannadaAction: "ಶಂಕಿತರ ಲಿಂಕ್ ವಿಚಾರಣೆ",
      status: "Pass",
      details: "Queried network links for suspect Suresh Gowda (+91 98845 23112)."
    },
    {
      id: "AUD-1088",
      timestamp: "2026-06-09 13:02:18",
      user: "Officer Satish Hegde",
      role: "Field Officer",
      action: "Attempted Case Modification",
      kannadaAction: "ಪ್ರಕರಣ ಮಾರ್ಪಾಡು ಯತ್ನ",
      status: "Blocked",
      details: "Access denied. Field Officer attempted to edit evidence logs for case CASE-2026-001."
    },
    {
      id: "AUD-1087",
      timestamp: "2026-06-09 11:24:55",
      user: "Inspector Veena Patil",
      role: "Lead Investigator",
      action: "Early Warning Synthesis",
      kannadaAction: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಂಶ್ಲೇಷಣೆ",
      status: "Pass",
      details: "Run predictive model for house break-in trends in JP Nagar, Bengaluru."
    },
    {
      id: "AUD-1086",
      timestamp: "2026-06-09 09:44:02",
      user: "Officer Satish Hegde",
      role: "Field Officer",
      action: "Location Heatmap Render",
      kannadaAction: "ಸ್ಥಳದ ಹೀಟ್‌ಮ್ಯಾಪ್ ವೀಕ್ಷಣೆ",
      status: "Pass",
      details: "Loaded District safety overlay. Zoomed into Majestic Robbery sector."
    },
    {
      id: "AUD-1085",
      timestamp: "2026-06-09 08:12:11",
      user: "Unknown IP (192.168.1.104)",
      role: "External Analyst",
      action: "Unauthorized Database Access",
      kannadaAction: "ಅನಧಿಕೃತ ಡೇಟಾಬೇಸ್ ಪ್ರವೇಶ",
      status: "Warning",
      details: "Decryption key mismatch. Logged IP for administrative overview."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Pass / ಯಶಸ್ವಿ</span>;
      case 'Blocked':
        return <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>Blocked / ನಿರ್ಬಂಧಿತ</span>;
      case 'Warning':
        return <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Warning / ಎಚ್ಚರಿಕೆ</span>;
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filterStatus !== 'all' && log.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return log.user.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.details.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
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
            <FileText size={18} color="var(--accent-purple)" />
            Cryptographic Audit Trails & Compliance
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Immutable ledger of database queries and operational boundaries.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
            <option value="all">All Status</option>
            <option value="Pass">Approved (Pass)</option>
            <option value="Blocked">Violations (Blocked)</option>
            <option value="Warning">Warnings</option>
          </select>

          <input 
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              width: '130px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Logs Table Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Desktop View Table */}
        <table className="desktop-only" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '8px 12px' }}>LEDGER ID</th>
              <th style={{ padding: '8px 12px' }}>TIMESTAMP</th>
              <th style={{ padding: '8px 12px' }}>INVESTIGATOR</th>
              <th style={{ padding: '8px 12px' }}>ACTION</th>
              <th style={{ padding: '8px 12px' }}>COMPLIANCE</th>
              <th style={{ padding: '8px 12px' }}>REASON / SCOPE</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: log.status === 'Blocked' ? 'rgba(244, 63, 94, 0.02)' : 'transparent',
                transition: 'var(--transition-smooth)'
              }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{log.id}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{log.user}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{log.role}</div>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div>{log.action}</div>
                  <div className="kannada-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.kannadaAction}</div>
                </td>
                <td style={{ padding: '10px 12px' }}>{getStatusBadge(log.status)}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.3 }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View Cards */}
        <div className="mobile-only" style={{ display: 'none', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {filteredLogs.map((log) => (
            <div key={log.id} style={{
              background: 'rgba(10, 14, 28, 0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              borderColor: log.status === 'Blocked' ? 'rgba(255, 0, 84, 0.3)' : 'var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.75rem' }}>
                  {log.id}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {log.timestamp}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{log.user}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{log.role}</div>
                </div>
                <div>{getStatusBadge(log.status)}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{log.action}</div>
                <div className="kannada-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{log.kannadaAction}</div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '6px', lineHeight: 1.35 }}>
                <strong style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px', letterSpacing: '0.5px' }}>REASON / SCOPE:</strong>
                {log.details}
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No audit records matching search parameters.
          </div>
        )}
      </div>
    </div>
  );
}
