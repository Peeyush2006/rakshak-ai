import { useState, useCallback } from 'react';
import { criminals, Criminal } from '../data/criminals';
import { cases, CaseRecord } from '../data/cases';
import { networkNodes, networkEdges, NetworkNode, NetworkEdge } from '../data/networks';

export interface ExplanationStep {
  title: string;
  kannadaTitle: string;
  detail: string;
  kannadaDetail: string;
  type: 'keyword' | 'filter' | 'network' | 'prediction';
}

export interface SearchResult {
  query: string;
  matchedCriminals: Criminal[];
  matchedCases: CaseRecord[];
  filteredNodes: NetworkNode[];
  filteredEdges: NetworkEdge[];
  explanations: ExplanationStep[];
  predictedAlerts: { title: string; kannadaTitle: string; desc: string; kannadaDesc: string; severity: 'high' | 'medium' }[];
  confidence: number;
}

export function useCrimeSearch() {
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);

  const processQuery = useCallback((queryStr: string): SearchResult => {
    const query = queryStr.trim().toLowerCase();
    
    // Matched data arrays
    let matchedCriminals: Criminal[] = [];
    let matchedCases: CaseRecord[] = [];
    let explanations: ExplanationStep[] = [];
    let predictedAlerts: { title: string; kannadaTitle: string; desc: string; kannadaDesc: string; severity: 'high' | 'medium' }[] = [];
    
    let isKannada = /[\u0D80-\u0DFF\u0C80-\u0CFF]/.test(queryStr); // Detect Kannada unicode character range
    let matchedKeywords: string[] = [];
    let matchedLocations: string[] = [];

    // 1. KEYWORD MAPPER
    // Suspects keywords
    const suspectMappings = [
      { id: 'C001', keys: ['suresh', 'gowda', 'kariya', 'ಸುರೇಶ್', 'ಗೌಡ', 'ಕರಿಯ'] },
      { id: 'C002', keys: ['ramesh', 'kumar', 'techie', 'ರಮೇಶ್', 'ಕುಮಾರ್', 'ಟೆಕ್ಕಿ'] },
      { id: 'C003', keys: ['yusuf', 'bhaiya', 'ಮೊಹಮ್ಮದ್', 'ಯೂಸುಫ್', 'ಭಯ್ಯಾ'] },
      { id: 'C004', keys: ['anand', 'murthy', 'chabi', 'ಆನಂದ್', 'ಮೂರ್ತಿ', 'ಚಾಬಿ'] },
      { id: 'C005', keys: ['prakash', 'shetty', 'blade', 'ಪ್ರಕಾಶ್', 'ಶೆಟ್ಟಿ', 'ಬ್ಲೇಡ್'] }
    ];

    // Crime Type keywords
    const crimeMappings = [
      { type: 'Extortion', keys: ['extortion', 'hafta', 'protection', 'threat', 'ಸುಲಿಗೆ', 'ಹಫ್ತಾ', 'ಬೆದರಿಕೆ'] },
      { type: 'Cybercrime', keys: ['cybercrime', 'phishing', 'hacker', 'hacking', 'ransomware', 'virus', 'ಸೈಬರ್', 'ಹ್ಯಾಕಿಂಗ್', 'ಕ್ರಿಪ್ಟೋ'] },
      { type: 'Drug Trafficking', keys: ['drug', 'drugs', 'trafficking', 'mdma', 'cartel', 'smuggle', 'ಡ್ರಗ್ಸ್', 'ಮಾದಕ', 'ತಸ್ಕರ'] },
      { type: 'House Burglary', keys: ['burglary', 'theft', 'break-in', 'locked house', 'thief', 'ಕಳ್ಳತನ', 'ಮನೆಗಳ್ಳತನ', 'ಬೀಗ'] },
      { type: 'Robbery', keys: ['robbery', 'heist', 'machete', 'snatch', 'dacoity', 'ದರೋಡೆ', 'ಮಚ್ಚು'] }
    ];

    // Location keywords
    const locationMappings = [
      { loc: 'indiranagar', keys: ['indiranagar', 'ಇಂದಿರಾನಗರ'] },
      { loc: 'vasant nagar', keys: ['vasant nagar', 'ವಸಂತ ನಗರ'] },
      { loc: 'majestic', keys: ['majestic', 'ಮೆಜೆಸ್ಟಿಕ್'] },
      { loc: 'ullal', keys: ['ullal', 'mangalu', 'ಉಳ್ಳಾಲ', 'ಮಂಗಳೂರು'] },
      { loc: 'jayanagar', keys: ['jayanagar', 'ಜಯನಗರ'] },
      { loc: 'mysuru', keys: ['mysuru', 'mysore', 'ಮೈಸೂರು'] }
    ];

    // Match Suspects
    suspectMappings.forEach(mapping => {
      const match = mapping.keys.some(k => query.includes(k.toLowerCase()));
      if (match) {
        const crim = criminals.find(c => c.id === mapping.id);
        if (crim && !matchedCriminals.includes(crim)) {
          matchedCriminals.push(crim);
          matchedKeywords.push(crim.name);
        }
      }
    });

    // Match Crime Types
    let filterCrimeTypes: string[] = [];
    crimeMappings.forEach(mapping => {
      const match = mapping.keys.some(k => query.includes(k.toLowerCase()));
      if (match) {
        filterCrimeTypes.push(mapping.type);
        matchedKeywords.push(mapping.type);
      }
    });

    // Match Locations
    locationMappings.forEach(mapping => {
      const match = mapping.keys.some(k => query.includes(k.toLowerCase()));
      if (match) {
        matchedLocations.push(mapping.loc);
        matchedKeywords.push(mapping.loc);
      }
    });

    // 2. QUERY EXECUTION LOGIC
    // Filter cases based on extracted parameters
    cases.forEach(c => {
      let score = 0;
      
      // Filter by type
      if (filterCrimeTypes.length > 0 && filterCrimeTypes.includes(c.type)) {
        score += 3;
      }
      
      // Filter by location
      if (matchedLocations.length > 0 && matchedLocations.some(l => c.location.toLowerCase().includes(l) || c.kannadaLocation.includes(l))) {
        score += 3;
      }

      // Filter by suspect association
      if (matchedCriminals.length > 0 && matchedCriminals.some(crim => c.suspectIds.includes(crim.id))) {
        score += 4;
      }

      // Text search fallback for query strings
      if (c.title.toLowerCase().includes(query) || c.kannadaTitle.includes(query) || 
          c.description.toLowerCase().includes(query) || c.kannadaDescription.includes(query)) {
        score += 2;
      }

      if (score >= 2) {
        matchedCases.push(c);
      }
    });

    // If we searched for a criminal directly but didn't find specific filters, fetch all cases they are linked to
    if (matchedCriminals.length > 0 && matchedCases.length === 0) {
      const crimIds = matchedCriminals.map(c => c.id);
      matchedCases = cases.filter(c => c.suspectIds.some(id => crimIds.includes(id)));
    }

    // 3. EXPLAINABLE AI REASONING STEPS
    if (matchedKeywords.length > 0) {
      explanations.push({
        title: "NLP Entity Extraction",
        kannadaTitle: "ನೈಸರ್ಗಿಕ ಭಾಷಾ ಪ್ರಕ್ರಿಯೆ (NLP) ಘಟಕ ಹೊರತೆಗೆಯುವಿಕೆ",
        detail: `Extracted entities from query: "${matchedKeywords.join(', ')}". Language: ${isKannada ? 'Kannada' : 'English'}.`,
        kannadaDetail: `ಪ್ರಶ್ನೆಯಿಂದ ಹೊರತೆಗೆಯಲಾದ ಮುಖ್ಯ ಪದಗಳು: "${matchedKeywords.join(', ')}". ಭಾಷೆ: ${isKannada ? 'ಕನ್ನಡ' : 'ಇಂಗ್ಲಿಷ್'}.`,
        type: 'keyword'
      });
    }

    if (matchedCriminals.length > 0) {
      const names = matchedCriminals.map(c => c.name).join(', ');
      explanations.push({
        title: "Database Filtering (Suspects)",
        kannadaTitle: "ಡೇಟಾಬೇಸ್ ಶೋಧನೆ (ಶಂಕಿತರು)",
        detail: `Queried and retrieved records for suspect(s): ${names}. Cross-referencing current active status and cases.`,
        kannadaDetail: `ಶಂಕಿತ(ರ) ದಾಖಲೆಗಳನ್ನು ಹಿಂಪಡೆಯಲಾಗಿದೆ: ${matchedCriminals.map(c => c.kannadaName).join(', ')}. ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ಮತ್ತು ಪ್ರಕರಣಗಳ ತಾಳೆ ನೋಡಲಾಗುತ್ತಿದೆ.`,
        type: 'filter'
      });
    }

    if (filterCrimeTypes.length > 0) {
      explanations.push({
        title: "Database Filtering (Crime Categories)",
        kannadaTitle: "ಡೇಟಾಬೇಸ್ ಶೋಧನೆ (ಅಪರಾಧ ವಿಭಾಗಗಳು)",
        detail: `Filtered incidents matching category: ${filterCrimeTypes.join(', ')}.`,
        kannadaDetail: `ಅಪರಾಧ ವಿಭಾಗಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಘಟನೆಗಳನ್ನು ಶೋಧಿಸಲಾಗಿದೆ: ${filterCrimeTypes.join(', ')}.`,
        type: 'filter'
      });
    }

    // 4. NETWORK GRAPH COMPOSITION
    // Build custom network filtered nodes and edges
    let filteredNodes: NetworkNode[] = [];
    let filteredEdges: NetworkEdge[] = [];

    if (matchedCriminals.length > 0 || matchedCases.length > 0) {
      const targetIds = new Set<string>();
      
      // Add matched criminals
      matchedCriminals.forEach(c => targetIds.add(c.id));
      
      // Add suspects of matched cases
      matchedCases.forEach(c => c.suspectIds.forEach(id => targetIds.add(id)));

      // Expand to include directly connected nodes in the relationship graph
      const expandedIds = new Set<string>(targetIds);
      networkEdges.forEach(edge => {
        if (targetIds.has(edge.source)) {
          expandedIds.add(edge.target);
        } else if (targetIds.has(edge.target)) {
          expandedIds.add(edge.source);
        }
      });

      // Filter nodes and edges
      filteredNodes = networkNodes.filter(node => expandedIds.has(node.id));
      filteredEdges = networkEdges.filter(edge => expandedIds.has(edge.source) && expandedIds.has(edge.target));

      explanations.push({
        title: "Criminal Link Analysis",
        kannadaTitle: "ಅಪರಾಧ ಜಾಲ ವಿಶ್ಲೇಷಣೆ",
        detail: `Identified ${filteredNodes.length} related entities (associates, vehicles, phones) and ${filteredEdges.length} connections representing crime networks.`,
        kannadaDetail: `ಅಪರಾಧ ಜಾಲಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ${filteredNodes.length} ಘಟಕಗಳು (ಸಹಚರರು, ವಾಹನಗಳು, ಫೋನ್‌ಗಳು) ಮತ್ತು ${filteredEdges.length} ಕೊಂಡಿಗಳನ್ನು ಪತ್ತೆ ಮಾಡಲಾಗಿದೆ.`,
        type: 'network'
      });
    } else {
      // Default to entire network if query is generic
      filteredNodes = networkNodes;
      filteredEdges = networkEdges;
    }

    // 5. PROACTIVE CRIME PREVENTION INTELLIGENCE (PREDICTIVE ALERTS)
    // Check if query concerns active/wanted threats and predict trends
    const wantedSuspects = matchedCriminals.filter(c => c.status === 'Wanted');
    if (wantedSuspects.length > 0) {
      wantedSuspects.forEach(ws => {
        if (ws.primaryCrimeType === 'Extortion') {
          predictedAlerts.push({
            title: "Extortion Threat Warning",
            kannadaTitle: "ಸುಲಿಗೆ ಬೆದರಿಕೆ ಮುನ್ಸೂಚನೆ",
            severity: "high",
            desc: `Suresh Gowda (Alias: Kariya) is Wanted and active. Pattern matches: immediate threat to construction complexes in Jayanagar/Vasant Nagar. Increased patrol suggested.`,
            kannadaDesc: `ಸುರೇಶ್ ಗೌಡ (ಕರಿಯ) ತಲೆಮರೆಸಿಕೊಂಡಿದ್ದು ಸಕ್ರಿಯನಾಗಿದ್ದಾನೆ. ಹೊಸ ಮುನ್ಸೂಚನೆ: ಜಯನಗರ/ವಸಂತ ನಗರದಲ್ಲಿ ಕಟ್ಟಡ ನಿರ್ಮಾಣ ವಲಯದ ಮೇಲೆ ದಾಳಿ ಸಂಭವ. ಗಸ್ತು ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು.`
          });
        }
      });
    }

    if (query.includes('theft') || query.includes('burglary') || query.includes('ಕಳ್ಳತನ') || query.includes('ಮನೆಗಳ್ಳತನ')) {
      predictedAlerts.push({
        title: "Predictive Burglary Warning",
        kannadaTitle: "ಮನೆಗಳ್ಳತನ ಮುನ್ನೆಚ್ಚರಿಕೆ",
        severity: "medium",
        desc: `High probability of burglary in locked luxury complexes in Jayanagar/Mysuru Vijaynagar during upcoming weekend. Recidivist Anand Murthy matches this historical profile.`,
        kannadaDesc: `ಮುಂಬರುವ ವಾರಾಂತ್ಯದಲ್ಲಿ ಜಯನಗರ/ಮೈಸೂರು ವಿಜಯನಗರದ ಬೀಗ ಹಾಕಿದ ಮನೆಗಳಲ್ಲಿ ಕಳ್ಳತನದ ಹೆಚ್ಚಿನ ಸಂಭವನೀಯತೆ ಇದೆ. ಹಳೆಯ ಅಪರಾಧಿ ಆನಂದ್ ಮೂರ್ತಿ ಕಾರ್ಯವಿಧಾನ ಇದಕ್ಕೆ ಹೋಲುತ್ತದೆ.`
      });
    }

    if (query.includes('drugs') || query.includes('trafficking') || query.includes('ಡ್ರಗ್ಸ್') || query.includes('ಮಾದಕ')) {
      predictedAlerts.push({
        title: "Transit Node Drug Risk",
        kannadaTitle: "ಮಾದಕ ದ್ರವ್ಯ ಸಾಗಣೆ ಎಚ್ಚರಿಕೆ",
        severity: "medium",
        desc: `Coastal drug supply routes indicate MDMA transit from Goa/Kerala heading to private university clusters near Mangaluru and Bengaluru East. Coastal Cartel courier arrest history patterns confirm this node.`,
        kannadaDesc: `ಕರಾವಳಿ ಡ್ರಗ್ ಸರಬರಾಜು ಮಾರ್ಗಗಳು ಗೋವಾ/ಕೇರಳದಿಂದ ಮಂಗಳೂರು ಮತ್ತು ಬೆಂಗಳೂರು ಪೂರ್ವದ ಖಾಸಗಿ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಿಗೆ ಎಂಡಿಎಂಎ ಸಾಗಣೆಯನ್ನು ಸೂಚಿಸುತ್ತವೆ.`
      });
    }

    if (predictedAlerts.length > 0) {
      explanations.push({
        title: "Proactive Crime Prevention",
        kannadaTitle: "ಪೂರ್ವಭಾವಿ ಅಪರಾಧ ತಡೆ ಇಂಟೆಲಿಜೆನ್ಸ್",
        detail: `Synthesized current spatial, temporal, and modus operandi factors. Generated ${predictedAlerts.length} early warning alert(s).`,
        kannadaDetail: `ಪ್ರಸ್ತುತ ಸ್ಥಳ, ಸಮಯ ಮತ್ತು ಅಪರಾಧ ವಿಧಾನಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ${predictedAlerts.length} ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಸೃಜಿಸಲಾಗಿದೆ.`,
        type: 'prediction'
      });
    }

    // Determine confidence
    let confidence = 50; // default
    if (matchedKeywords.length > 0) confidence += 20;
    if (matchedCriminals.length > 0) confidence += 15;
    if (matchedCases.length > 0) confidence += 15;
    if (confidence > 100) confidence = 100;

    const result: SearchResult = {
      query: queryStr,
      matchedCriminals,
      matchedCases,
      filteredNodes,
      filteredEdges,
      explanations,
      predictedAlerts,
      confidence
    };

    setCurrentResult(result);
    return result;
  }, []);

  const clearSearch = useCallback(() => {
    setCurrentResult(null);
  }, []);

  return {
    currentResult,
    processQuery,
    clearSearch
  };
}
