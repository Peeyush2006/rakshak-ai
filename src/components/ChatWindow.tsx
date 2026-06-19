import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, MicOff, Volume2, VolumeX, FileText, Globe, 
  Sparkles, User, Cpu, AlertTriangle, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { useCrimeSearch, SearchResult } from '../hooks/useCrimeSearch';

interface ChatWindowProps {
  userRole: string;
  onSearchTriggered: (result: SearchResult) => void;
  onSelectCriminal: (id: string) => void;
  onSelectCase: (id: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  kannadaText?: string;
  timestamp: string;
  result?: SearchResult;
}

export function ChatWindow({ userRole, onSearchTriggered, onSelectCriminal, onSelectCase }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [lang, setLang] = useState<'en-IN' | 'kn-IN'>('en-IN');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Rakshak AI Active. Welcome, Investigator. Ask me about suspect links, case details, or location hotspots in English or Kannada (ಕನ್ನಡ).",
      kannadaText: "ರಕ್ಷಕ್ AI ಸಕ್ರಿಯವಾಗಿದೆ. ನಮಸ್ಕಾರ ಇನ್ಸ್‌ಪೆಕ್ಟರ್, ಅಪರಾಧಿಗಳ ಜಾಲ, ಪ್ರಕರಣದ ವಿವರಗಳು ಅಥವಾ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳ ಬಗ್ಗೆ ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಕೇಳಿ.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showExplanationId, setShowExplanationId] = useState<string | null>(null);

  const { currentResult, processQuery } = useCrimeSearch();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice recognition result handler
  const handleVoiceInput = (speechText: string) => {
    setInputText(speechText);
    submitQuery(speechText);
  };

  const { isListening, startListening, stopListening, speak, stopSpeaking, isSpeaking, supported: voiceSupported } = 
    useSpeech(handleVoiceInput);

  const submitQuery = (textToSubmit: string) => {
    const query = textToSubmit.trim();
    if (!query) return;

    // Add user message
    const userMsgId = 'u-' + Date.now();
    const newMsgUser: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsgUser]);
    setInputText('');

    // Process Search Query
    setTimeout(() => {
      const searchRes = processQuery(query);
      
      // Update parent component state for charts and map
      onSearchTriggered(searchRes);

      // Synthesize response text
      let textResponse = '';
      let kannadaResponse = '';

      if (searchRes.matchedCriminals.length === 0 && searchRes.matchedCases.length === 0) {
        textResponse = `No specific matching case files or criminal profiles found for "${query}". Try searching for specific names like 'Suresh Gowda', 'Techie Ramesh', or crime types like 'extortion' or 'cybercrime'.`;
        kannadaResponse = `"${query}" ಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಪ್ರಕರಣಗಳು ಅಥವಾ ಶಂಕಿತರು ಪತ್ತೆಯಾಗಿಲ್ಲ. ಸುರೇಶ್ ಗೌಡ, ಕರಿಯ, ಟೆಕ್ಕಿ ರಮೇಶ್ ಅಥವಾ ಸುಲಿಗೆ, ಕಳ್ಳತನ ಎಂದು ಮರುಪ್ರಯತ್ನಿಸಿ.`;
      } else {
        const crimCount = searchRes.matchedCriminals.length;
        const caseCount = searchRes.matchedCases.length;
        
        textResponse = `Analysis Complete. Retrieved ${crimCount} suspect profiles and ${caseCount} matching case records. `;
        kannadaResponse = `ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ${crimCount} ಶಂಕಿತರ ವಿವರಗಳು ಮತ್ತು ${caseCount} ಪ್ರಕರಣಗಳ ದಾಖಲೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲಾಗಿದೆ. `;
        
        if (crimCount > 0) {
          const names = searchRes.matchedCriminals.map(c => `${c.name} (Alias: ${c.alias}, Status: ${c.status})`).join(', ');
          textResponse += `Suspects identified: ${names}. `;
          kannadaResponse += `ಶಂಕಿತರನ್ನು ಗುರುತಿಸಲಾಗಿದೆ: ${searchRes.matchedCriminals.map(c => `${c.kannadaName} (${c.kannadaAlias})`).join(', ')}. `;
        }
        
        if (searchRes.predictedAlerts.length > 0) {
          textResponse += `⚠️ Triggered ${searchRes.predictedAlerts.length} proactive crime prevention alerts.`;
          kannadaResponse += `⚠️ ${searchRes.predictedAlerts.length} ಪೂರ್ವಭಾವಿ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಸೃಜಿಸಲಾಗಿದೆ.`;
        }
      }

      const assistantMsgId = 'a-' + Date.now();
      const newMsgAssistant: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: textResponse,
        kannadaText: kannadaResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        result: searchRes
      };

      setMessages(prev => [...prev, newMsgAssistant]);

      // If speak enabled, read the response in selected language
      if (lang === 'kn-IN' && kannadaResponse) {
        speak(kannadaResponse, 'kn-IN');
      } else {
        speak(textResponse, 'en-IN');
      }
    }, 600);
  };

  const handleSend = () => {
    submitQuery(inputText);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en-IN' ? 'kn-IN' : 'en-IN');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // PDF Export Action
  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to export conversation history.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>Rakshak AI - Official Case Briefing Report</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #222; background-color: #fff; }
            .header { border-bottom: 3px double #075e54; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
            .header h1 { margin: 0; color: #0f172a; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; color: #555; font-size: 14px; }
            .meta { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 12px; border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9; }
            .message { margin-bottom: 20px; padding: 15px; border-radius: 6px; page-break-inside: avoid; }
            .user { background-color: #f1f5f9; border-left: 4px solid #64748b; }
            .assistant { background-color: #f0fdf4; border-left: 4px solid #16a34a; }
            .msg-meta { font-weight: bold; font-size: 12px; margin-bottom: 5px; color: #475569; display: flex; justify-content: space-between; }
            .msg-body { font-size: 14px; line-height: 1.5; white-space: pre-wrap; }
            .stamp { text-align: center; margin-top: 50px; font-size: 11px; color: #888; border-top: 1px solid #ddd; padding-top: 10px; }
            .conf-badge { background-color: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; font-size: 10px; padding: 2px 6px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RAKSHAK AI (ರಕ್ಷಕ್ AI)</h1>
            <p>KARNATAKA POLICE CRIME INTELLIGENCE & PATTERN DISCOVERY SYSTEM</p>
            <p><strong>CONFIDENTIAL & OFFICIAL USE ONLY</strong></p>
          </div>
          <div class="meta">
            <div><strong>Access Role:</strong> ${userRole.toUpperCase()}</div>
            <div><strong>Generated At:</strong> ${new Date().toLocaleString()}</div>
            <div><strong>System Code:</strong> SECURE-RAKSHAK-2026</div>
          </div>
          
          <div>
            ${messages.map(m => `
              <div class="message ${m.sender}">
                <div class="msg-meta">
                  <span>${m.sender === 'user' ? 'INVESTIGATOR QUERY' : 'AI INTELLIGENCE REPORT'}</span>
                  <span>${m.timestamp}</span>
                </div>
                <div class="msg-body">
                  ${m.text}
                  ${m.kannadaText ? `<div style="margin-top: 8px; font-style: italic; color: #444;">ಕನ್ನಡ: ${m.kannadaText}</div>` : ''}
                  ${m.result ? `
                    <div style="margin-top: 10px; font-size: 12px; border-top: 1px dashed #ccc; padding-top: 8px;">
                      <strong>Confidence level:</strong> <span class="conf-badge">${m.result.confidence}%</span>
                      ${m.result.predictedAlerts.length > 0 ? `
                        <div style="color: #b45309; margin-top: 5px;">
                          <strong>Alerts Issued:</strong> ${m.result.predictedAlerts.map(a => a.title).join(', ')}
                        </div>
                      ` : ''}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="stamp">
            This transcript was cryptographically compiled under active police audit. Unauthorized dissemination is penalizable under the IT Act, 2000.
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', gap: '8px' }}>
          <div className="animate-pulse-glow" style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-success)'
          }}></div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="var(--accent-primary)" />
              RAKSHAK AI <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ರಕ್ಷಕ್</span>
            </h3>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Bilingual Crime Query Agent</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Language Toggle Button */}
          <button className="btn" onClick={toggleLanguage} style={{ fontSize: '0.75rem', padding: '6px 10px', height: '32px' }} title="Change language">
            <Globe size={13} color="var(--accent-primary)" />
            {lang === 'en-IN' ? 'English' : 'ಕನ್ನಡ'}
          </button>
          
          {/* Export PDF Button */}
          <button className="btn" onClick={handleExportPDF} style={{ fontSize: '0.75rem', padding: '6px 10px', height: '32px' }} title="Export Case Briefing PDF">
            <FileText size={13} color="var(--accent-primary)" />
            PDF Export
          </button>
        </div>
      </div>

      {/* Messages Window */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'radial-gradient(ellipse at bottom, rgba(56, 189, 248, 0.03) 0%, transparent 80%)'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {/* Header identity */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
            }}>
              {msg.sender === 'user' ? (
                <>
                  <User size={10} />
                  <span>Investigator ({userRole})</span>
                </>
              ) : (
                <>
                  <Cpu size={10} color="var(--accent-primary)" />
                  <span style={{ color: 'var(--accent-primary)' }}>Rakshak Engine</span>
                </>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            {/* Content box */}
            <div style={{
              padding: '12px 16px',
              borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
              background: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'rgba(15, 23, 42, 0.9)',
              border: '1px solid',
              borderColor: msg.sender === 'user' ? 'rgba(56, 189, 248, 0.1)' : 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              {/* Primary English Text */}
              <p style={{ margin: 0 }}>{msg.text}</p>

              {/* Kannada Translation */}
              {msg.kannadaText && (
                <p className="kannada-text" style={{
                  margin: '8px 0 0 0',
                  paddingTop: '8px',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.85rem'
                }}>
                  {msg.kannadaText}
                </p>
              )}

              {/* Search Result details embedded inside Chat */}
              {msg.result && (
                <div style={{ marginTop: '12px' }}>
                  {/* Predicted warning banners */}
                  {msg.result.predictedAlerts.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                      {msg.result.predictedAlerts.map((alert, idx) => (
                        <div key={idx} style={{
                          background: alert.severity === 'high' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          borderLeft: `3px solid ${alert.severity === 'high' ? 'var(--accent-secondary)' : 'var(--accent-warning)'}`,
                          padding: '8px 12px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: alert.severity === 'high' ? 'var(--accent-secondary)' : 'var(--accent-warning)' }}>
                            <AlertTriangle size={12} />
                            <span>{alert.title} / {alert.kannadaTitle}</span>
                          </div>
                          <p style={{ margin: '4px 0 0 0', color: 'var(--text-primary)', fontSize: '0.75rem' }}>{alert.desc}</p>
                          <p className="kannada-text" style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.75rem', fontStyle: 'italic' }}>{alert.kannadaDesc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Linked suspects and case cards */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {msg.result.matchedCriminals.map(c => (
                      <button key={c.id} onClick={() => onSelectCriminal(c.id)} className="btn" style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        background: 'rgba(56, 189, 248, 0.05)',
                        borderColor: 'rgba(56, 189, 248, 0.2)'
                      }}>
                        👤 Suspect: {c.name} ({c.alias})
                      </button>
                    ))}
                    {msg.result.matchedCases.map(c => (
                      <button key={c.id} onClick={() => onSelectCase(c.id)} className="btn" style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        background: 'rgba(168, 85, 247, 0.05)',
                        borderColor: 'rgba(168, 85, 247, 0.2)'
                      }}>
                        📂 Case: {c.caseNumber}
                      </button>
                    ))}
                  </div>

                  {/* Explainable AI button */}
                  <div style={{
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Confidence Index: <strong style={{ color: 'var(--accent-success)' }}>{msg.result.confidence}%</strong>
                    </span>

                    <button 
                      onClick={() => setShowExplanationId(showExplanationId === msg.id ? null : msg.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'underline'
                      }}
                    >
                      <Cpu size={12} />
                      {showExplanationId === msg.id ? 'Hide Reasoning' : 'Explain Reasoning'}
                    </button>
                  </div>

                  {/* Explainable Decision Tree Panel */}
                  {showExplanationId === msg.id && (
                    <div className="animate-fade-in" style={{
                      marginTop: '8px',
                      padding: '10px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ fontWeight: 600, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Cpu size={11} /> Explainable AI Audit Trail
                      </div>
                      {msg.result.explanations.map((step, sIdx) => (
                        <div key={sIdx} style={{
                          borderLeft: '2px solid var(--accent-primary)',
                          paddingLeft: '8px',
                          margin: '2px 0'
                        }}>
                          <div style={{ fontWeight: 500, color: '#fff' }}>{step.title}</div>
                          <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)' }}>{step.detail}</p>
                          <p className="kannada-text" style={{ margin: '1px 0 0 0', color: 'var(--text-muted)', fontSize: '0.7rem' }}>{step.kannadaDetail}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Voice synthesis speaker indicator */}
      {isSpeaking && (
        <div style={{
          padding: '6px 12px',
          background: 'rgba(168, 85, 247, 0.1)',
          borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--accent-purple)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Volume2 size={13} className="animate-pulse" />
            AI is reading the intelligence brief...
          </span>
          <button 
            onClick={stopSpeaking}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-secondary)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Mute Audio
          </button>
        </div>
      )}

      {/* Input controls panel */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Voice Trigger Button */}
        {voiceSupported ? (
          <button 
            onClick={() => isListening ? stopListening() : startListening(lang)}
            className="btn animate-pulse-glow"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              padding: 0,
              justifyContent: 'center',
              background: isListening ? 'var(--accent-secondary)' : 'var(--bg-tertiary)',
              borderColor: isListening ? 'var(--accent-secondary)' : 'var(--border-color)'
            }}
            title={isListening ? "Listening..." : "Click to speak"}
          >
            {isListening ? (
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <div style={{ width: '3px', height: '14px', background: '#fff', animation: 'voiceWave 0.8s infinite ease-in-out' }}></div>
                <div style={{ width: '3px', height: '18px', background: '#fff', animation: 'voiceWave 0.8s infinite ease-in-out 0.15s' }}></div>
                <div style={{ width: '3px', height: '14px', background: '#fff', animation: 'voiceWave 0.8s infinite ease-in-out 0.3s' }}></div>
              </div>
            ) : (
              <Mic size={18} color="var(--accent-primary)" />
            )}
          </button>
        ) : (
          <div className="tooltip-container">
            <button className="btn" disabled style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, justifyContent: 'center' }}>
              <MicOff size={16} />
            </button>
            <span className="tooltip-text">Speech recognition is not supported in this browser.</span>
          </div>
        )}

        {/* Input box */}
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={lang === 'en-IN' ? "Ask Rakshak AI (e.g. 'Show me Suresh Gowda associates')..." : "ಕೇಳಿ (ಉದಾಹರಣೆಗೆ: 'ಸುರೇಶ್ ಗೌಡನ ಸಹಚರರು ಯಾರು')..."}
          style={{
            flex: 1,
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none',
            fontFamily: lang === 'kn-IN' ? 'var(--font-kannada)' : 'var(--font-english)',
            transition: 'var(--transition-smooth)'
          }}
          disabled={isListening}
        />

        {/* Send Button */}
        <button 
          onClick={handleSend}
          className="btn btn-primary"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: 0,
            justifyContent: 'center'
          }}
          disabled={!inputText.trim()}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
