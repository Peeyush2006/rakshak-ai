// Karnataka Police Department
// Interactive Database Schema Explorer & SQL Intelligence Playground Component
import React, { useState } from 'react';
import { 
  Database, Play, Terminal, FileCode2, Layers, Search, 
  Copy, Download, Sparkles, Check, AlertCircle, HelpCircle, 
  ChevronRight, RefreshCw, BookOpen
} from 'lucide-react';
import { tableMetadata } from '../data/police_db';
import { executeSQL, SQLResult } from '../utils/sqlSimulator';

// SQL Predefined templates representing typical intelligence searches
const QUERY_TEMPLATES = [
  {
    name: '🔴 Active Cases Under Investigation',
    query: `SELECT CaseNo, CrimeNo, BriefFacts, CrimeRegisteredDate 
FROM CaseMaster 
WHERE CaseStatusID = 1 
ORDER BY CrimeRegisteredDate DESC`
  },
  {
    name: '👥 Accused Persons and their Arrest/Surrender Records',
    query: `SELECT a.AccusedName, a.PersonID AS AccusedRef, arr.ArrestSurrenderDate, u.UnitName AS ArrestStation, c.CourtName 
FROM ArrestSurrender arr 
JOIN Accused a ON arr.AccusedMasterID = a.AccusedMasterID 
JOIN Unit u ON arr.PoliceStationID = u.UnitID 
JOIN Court c ON arr.CourtID = c.CourtID 
ORDER BY arr.ArrestSurrenderDate DESC`
  },
  {
    name: '⚖️ Chargesheet filings with Investigator details',
    query: `SELECT c.CaseNo, cs.BriefFacts, chg.csdate AS ChargesheetDate, chg.cstype AS ReportType, e.FirstName AS IO_Name 
FROM ChargesheetDetails chg 
JOIN CaseMaster c ON chg.CaseMasterID = c.CaseMasterID 
JOIN Employee e ON chg.PolicePersonID = e.EmployeeID`
  },
  {
    name: '💻 Cybercrime cases with Complainant demographics',
    query: `SELECT c.CaseNo, cd.ComplainantName, cd.AgeYear, o.OccupationName, r.ReligionName 
FROM ComplainantDetails cd 
JOIN CaseMaster c ON cd.CaseMasterID = c.CaseMasterID 
JOIN OccupationMaster o ON cd.OccupationID = o.OccupationID 
JOIN ReligionMaster r ON cd.ReligionID = r.ReligionID 
WHERE c.CrimeMajorHeadID = 2`
  },
  {
    name: '🚨 Heinous Crime Victims and Investigating Officers',
    query: `SELECT c.CaseNo, v.VictimName, v.AgeYear AS VictimAge, e.FirstName AS LeadInvestigator, u.UnitName AS PoliceStation 
FROM CaseMaster c 
JOIN Victim v ON c.CaseMasterID = v.CaseMasterID 
JOIN Employee e ON c.PolicePersonID = e.EmployeeID 
JOIN Unit u ON c.PoliceStationID = u.UnitID 
WHERE c.GravityOffenceID = 1`
  }
];

export function DatabasePlayground() {
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'console' | 'schema' | 'raw_sql'>('console');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState<string>('CaseMaster');
  const [rawSqlQuery, setRawSqlQuery] = useState(QUERY_TEMPLATES[0].query);
  
  // Query state
  const [queryResult, setQueryResult] = useState<SQLResult | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Automatically execute the initial query on mount
  React.useEffect(() => {
    handleRunQuery(QUERY_TEMPLATES[0].query);
  }, []);

  const handleRunQuery = (sql: string) => {
    setQueryError(null);
    try {
      const res = executeSQL(sql);
      setQueryResult(res);
    } catch (err: any) {
      setQueryError(err.message || 'An unknown SQL syntax error occurred.');
      setQueryResult(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const downloadJson = () => {
    if (!queryResult) return;
    const blob = new Blob([JSON.stringify(queryResult.rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rakshak_query_result_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter tables list based on search
  const filteredTables = Object.keys(tableMetadata).filter(tableName =>
    tableName.toLowerCase().includes(searchTableQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', gap: '16px', overflow: 'hidden' }}>
      
      {/* Playground Header Tab Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={22} color="var(--accent-primary)" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 180, 216, 0.5))' }} />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>
              INTELLIGENCE SQL SANDBOX
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Relational query compiler & table schema inspector matching the Karnataka Police FIR system structure
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActivePlaygroundTab('console')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activePlaygroundTab === 'console' ? 'var(--accent-primary)' : 'transparent',
              color: activePlaygroundTab === 'console' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Terminal size={14} /> SQL Terminal
          </button>
          
          <button 
            onClick={() => setActivePlaygroundTab('schema')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activePlaygroundTab === 'schema' ? 'var(--accent-primary)' : 'transparent',
              color: activePlaygroundTab === 'schema' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Layers size={14} /> Schema Explorer
          </button>

          <button 
            onClick={() => setActivePlaygroundTab('raw_sql')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activePlaygroundTab === 'raw_sql' ? 'var(--accent-primary)' : 'transparent',
              color: activePlaygroundTab === 'raw_sql' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <FileCode2 size={14} /> Raw SQL Source
          </button>
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div style={{ flex: 1, display: 'flex', gap: '16px', minHeight: 0, overflow: 'hidden' }}>
        
        {/* Tab 1: SQL Terminal */}
        {activePlaygroundTab === 'console' && (
          <>
            {/* Left Console Panel: Templates and Query Input */}
            <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0 }}>
              
              {/* Template selection card */}
              <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-warning)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Sparkles size={16} />
                  <span>PREDEFINED INTELLIGENCE SEARCHES</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {QUERY_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setRawSqlQuery(tmpl.query);
                        handleRunQuery(tmpl.query);
                      }}
                      style={{
                        padding: '10px 12px',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        background: rawSqlQuery === tmpl.query ? 'rgba(255, 183, 3, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${rawSqlQuery === tmpl.query ? 'var(--accent-warning)' : 'rgba(255, 255, 255, 0.05)'}`,
                        borderRadius: '8px',
                        color: rawSqlQuery === tmpl.query ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                      title={tmpl.query}
                    >
                      <span style={{ fontWeight: 600, color: rawSqlQuery === tmpl.query ? 'var(--accent-warning)' : '#fff' }}>
                        {tmpl.name}
                      </span>
                      <code style={{ fontSize: '0.65rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '360px', fontFamily: 'monospace' }}>
                        {tmpl.query}
                      </code>
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor Console */}
              <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                    SQL WORKBENCH
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={() => copyToClipboard(rawSqlQuery)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', height: '24px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      title="Copy query text"
                    >
                      {copiedQuery ? <Check size={12} color="var(--accent-neon-green)" /> : <Copy size={12} />}
                      {copiedQuery ? 'Copied' : 'Copy'}
                    </button>
                    <button 
                      onClick={() => setRawSqlQuery('')}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', height: '24px', fontSize: '0.65rem' }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', minHeight: 0, borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', background: '#020408' }}>
                  <textarea
                    value={rawSqlQuery}
                    onChange={(e) => setRawSqlQuery(e.target.value)}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      padding: '12px',
                      resize: 'none',
                      outline: 'none',
                      lineHeight: '1.4'
                    }}
                    placeholder="Type raw SELECT query here..."
                  />
                </div>

                <button 
                  onClick={() => handleRunQuery(rawSqlQuery)}
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 0 15px rgba(0, 180, 216, 0.35)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Play size={16} fill="var(--bg-primary)" /> EXECUTE INVESTIGATION QUERY
                </button>
              </div>

            </div>

            {/* Right Result Panel: Query Results Table */}
            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', minWidth: 0 }}>
              
              {/* Stats header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                paddingBottom: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={16} color="var(--accent-primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>TERMINAL RESULTS</span>
                  {queryResult && (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(56, 176, 0, 0.15)', color: 'var(--accent-neon-green)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(56, 176, 0, 0.3)' }}>
                      SUCCESS
                    </span>
                  )}
                  {queryError && (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(255, 0, 84, 0.15)', color: 'var(--accent-secondary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(255, 0, 84, 0.3)' }}>
                      ERROR
                    </span>
                  )}
                </div>

                {queryResult && (
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>Speed: <strong style={{ color: 'var(--accent-primary)' }}>{queryResult.executionTimeMs}ms</strong></span>
                    <span>•</span>
                    <span>Rows: <strong style={{ color: '#fff' }}>{queryResult.rows.length}</strong></span>
                    <span>•</span>
                    <button 
                      onClick={downloadJson} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--accent-primary)', 
                        cursor: 'pointer', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '3px',
                        fontWeight: 600,
                        padding: 0
                      }}
                    >
                      <Download size={12} /> Export JSON
                    </button>
                  </div>
                )}
              </div>

              {/* Console Body */}
              <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                {queryError && (
                  <div style={{
                    background: 'rgba(255, 0, 84, 0.05)',
                    border: '1px solid rgba(255, 0, 84, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--accent-secondary)'
                  }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>SQL Execution Failed</h4>
                      <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>{queryError}</p>
                    </div>
                  </div>
                )}

                {queryResult && queryResult.rows.length === 0 && (
                  <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    gap: '12px'
                  }}>
                    <HelpCircle size={32} color="var(--text-muted)" />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>Zero Records Returned</p>
                      <p style={{ fontSize: '0.75rem', marginTop: '2px' }}>The query ran successfully but matches no rows in the database.</p>
                    </div>
                  </div>
                )}

                {queryResult && queryResult.rows.length > 0 && (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                        {queryResult.columns.map((col, idx) => (
                          <th key={idx} style={{ padding: '10px 12px', color: 'var(--accent-primary)', fontWeight: 700, borderRight: '1px solid rgba(255,255,255,0.03)' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.rows.map((row, rowIdx) => (
                        <tr 
                          key={rowIdx} 
                          style={{ 
                            borderBottom: '1px solid rgba(255,255,255,0.05)', 
                            background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 180, 216, 0.04)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = rowIdx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'; }}
                        >
                          {queryResult.columns.map((col, colIdx) => (
                            <td key={colIdx} style={{ padding: '8px 12px', color: '#f8fafc', whiteSpace: 'normal', wordBreak: 'break-all', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
                              {row[col] === null || row[col] === undefined ? (
                                <span style={{ color: 'var(--text-muted)' }}>NULL</span>
                              ) : typeof row[col] === 'boolean' || (col.toLowerCase().includes('active') && typeof row[col] === 'number') ? (
                                <span style={{ color: row[col] ? 'var(--accent-neon-green)' : 'var(--accent-secondary)' }}>
                                  {row[col] ? '1 (TRUE)' : '0 (FALSE)'}
                                </span>
                              ) : (
                                String(row[col])
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          </>
        )}

        {/* Tab 2: Schema Explorer */}
        {activePlaygroundTab === 'schema' && (
          <>
            {/* Left Schema Panel: Tables List */}
            <div className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '16px', gap: '12px', minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Search size={14} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  value={searchTableQuery}
                  onChange={(e) => setSearchTableQuery(e.target.value)}
                  placeholder="Search 26 tables..."
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.75rem',
                    outline: 'none',
                    width: '100%'
                  }}
                />
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: 0 }}>
                {filteredTables.map(tableName => (
                  <button
                    key={tableName}
                    onClick={() => setSelectedTable(tableName)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      background: selectedTable === tableName ? 'rgba(0, 180, 216, 0.12)' : 'transparent',
                      color: selectedTable === tableName ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedTable === tableName ? 700 : 500,
                      borderLeft: `3px solid ${selectedTable === tableName ? 'var(--accent-primary)' : 'transparent'}`,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span>{tableName}</span>
                    <ChevronRight size={12} style={{ opacity: selectedTable === tableName ? 1 : 0.3 }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Schema Panel: Selected Table Fields */}
            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px', overflowY: 'auto' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={18} color="var(--accent-primary)" />
                  <span>{selectedTable}</span>
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  {tableMetadata[selectedTable]?.description || 'No description available.'}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  COLUMN ATTRIBUTES
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tableMetadata[selectedTable]?.columns.map((col, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        fontSize: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>
                          {col.name}
                        </span>
                        
                        {col.key === 'PK' && (
                          <span style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(0, 180, 216, 0.15)', color: 'var(--accent-primary)', border: '1px solid rgba(0, 180, 216, 0.3)', fontWeight: 'bold' }}>
                            PRIMARY KEY
                          </span>
                        )}
                        {col.key === 'FK' && (
                          <span style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255, 0, 84, 0.15)', color: 'var(--accent-secondary)', border: '1px solid rgba(255, 0, 84, 0.3)', fontWeight: 'bold' }}>
                            FOREIGN KEY
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 600 }}>
                          {col.type}
                        </span>
                        <span style={{ color: 'var(--text-secondary)', maxWidth: '320px', textAlign: 'right' }}>
                          {col.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tab 3: Raw SQL Code */}
        {activePlaygroundTab === 'raw_sql' && (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="var(--accent-primary)" />
                <span>RAW RELATIONAL SCHEMA (schema.sql & seed.sql)</span>
              </span>
              <button 
                onClick={() => {
                  copyToClipboard(rawSqlSample);
                  setCopiedText(true);
                  setTimeout(() => setCopiedText(false), 2000);
                }}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedText ? <Check size={12} color="var(--accent-neon-green)" /> : <Copy size={12} />}
                {copiedText ? 'Copied Script' : 'Copy All DDL'}
              </button>
            </div>
            
            <div style={{ flex: 1, background: '#020408', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px', overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.72rem', color: '#94a3b8', lineHeight: '1.5' }}>
                <code>{rawSqlSample}</code>
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Sample SQL script layout for Raw SQL tab reference
const rawSqlSample = `-- Karnataka Police Department
-- Police FIR System DB Schema (DDL Highlights)

-- Table Definitions:
CREATE TABLE CaseMaster (
    CaseMasterID INT PRIMARY KEY,
    CrimeNo VARCHAR(50) UNIQUE NOT NULL, -- structured identifier
    CaseNo VARCHAR(20) NOT NULL,        -- YYYY + serial number
    CrimeRegisteredDate DATE NOT NULL,
    PolicePersonID INT REFERENCES Employee(EmployeeID),
    PoliceStationID INT REFERENCES Unit(UnitID),
    CaseCategoryID INT REFERENCES CaseCategory(CaseCategoryID),
    GravityOffenceID INT REFERENCES GravityOffence(GravityOffenceID),
    CrimeMajorHeadID INT REFERENCES CrimeHead(CrimeHeadID),
    CrimeMinorHeadID INT REFERENCES CrimeSubHead(CrimeSubHeadID),
    CaseStatusID INT REFERENCES CaseStatusMaster(CaseStatusID),
    CourtID INT REFERENCES Court(CourtID),
    IncidentFromDate DATETIME,
    IncidentToDate DATETIME,
    InfoReceivedPSDate DATETIME,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    BriefFacts NVARCHAR(MAX)
);

CREATE TABLE ComplainantDetails (
    ComplainantID INT PRIMARY KEY,
    CaseMasterID INT REFERENCES CaseMaster(CaseMasterID),
    ComplainantName VARCHAR(200) NOT NULL,
    AgeYear INT,
    OccupationID INT REFERENCES OccupationMaster(OccupationID),
    ReligionID INT REFERENCES ReligionMaster(ReligionID),
    CasteID INT REFERENCES CasteMaster(caste_master_id),
    GenderID INT
);

CREATE TABLE ActSectionAssociation (
    CaseMasterID INT REFERENCES CaseMaster(CaseMasterID),
    ActID VARCHAR(50) REFERENCES Act(ActCode),
    SectionID VARCHAR(50) REFERENCES Section(SectionCode),
    ActOrderID INT,
    SectionOrderID INT,
    PRIMARY KEY (CaseMasterID, ActID, SectionID)
);

CREATE TABLE Accused (
    AccusedMasterID INT PRIMARY KEY,
    CaseMasterID INT REFERENCES CaseMaster(CaseMasterID),
    AccusedName VARCHAR(200) NOT NULL,
    AgeYear INT,
    GenderID INT,
    PersonID VARCHAR(50)
);

CREATE TABLE ArrestSurrender (
    ArrestSurrenderID INT PRIMARY KEY,
    CaseMasterID INT REFERENCES CaseMaster(CaseMasterID),
    ArrestSurrenderTypeID INT,
    ArrestSurrenderDate DATE,
    ArrestSurrenderStateId INT REFERENCES State(StateID),
    ArrestSurrenderDistrictId INT REFERENCES District(DistrictID),
    PoliceStationID INT REFERENCES Unit(UnitID),
    IOID INT REFERENCES Employee(EmployeeID),
    CourtID INT REFERENCES Court(CourtID),
    AccusedMasterID INT REFERENCES Accused(AccusedMasterID),
    IsAccused BIT,
    IsComplainantAccused BIT
);

CREATE TABLE ChargesheetDetails (
    CSID INT PRIMARY KEY,
    CaseMasterID INT REFERENCES CaseMaster(CaseMasterID),
    csdate DATETIME NOT NULL,
    cstype CHAR(1) NOT NULL, -- A=Chargesheet, B=False Case, C=Undetected
    PolicePersonID INT REFERENCES Employee(EmployeeID)
);

-- Seed Data highlights:
-- INSERT INTO State (StateID, StateName, NationalityID, Active) VALUES (29, 'Karnataka', 1, 1);
-- INSERT INTO District (DistrictID, DistrictName, StateID, Active) VALUES (1, 'Bengaluru City', 29, 1);
-- INSERT INTO Unit (UnitID, UnitName, TypeID, ParentUnit, NationalityID, StateID, DistrictID, Active) 
-- VALUES (1001, 'Vasant Nagar Police Station', 1, NULL, 1, 29, 1, 1);
-- INSERT INTO Act (ActCode, ActDescription, ShortName, Active) VALUES ('IPC', 'Indian Penal Code 1860', 'IPC', 1);
-- INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IPC', '384', 'Punishment for extortion', 1);
`;
