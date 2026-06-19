export interface NetworkNode {
  id: string;
  label: string;
  kannadaLabel: string;
  type: 'criminal' | 'gang' | 'phone' | 'vehicle' | 'location';
  riskScore?: number;
  details: string;
  kannadaDetails: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'accomplice' | 'gang_member' | 'calls' | 'relative' | 'co_arrest' | 'vehicle_use' | 'location_base';
  label: string;
  kannadaLabel: string;
  weight: number; // 1 to 5 representing strength/confidence
}

export const networkNodes: NetworkNode[] = [
  // Criminals
  { id: "C001", label: "Suresh Gowda (Kariya)", kannadaLabel: "ಸುರೇಶ್ ಗೌಡ (ಕರಿಯ)", type: "criminal", riskScore: 92, details: "Syndicate Leader. Extortion, Land Grabbing.", kannadaDetails: "ಸಂಡಿಕೇಟ್ ನಾಯಕ. ಸುಲಿಗೆ, ಭೂಕಬಳಿಕೆ." },
  { id: "C002", label: "Ramesh Kumar (Techie)", kannadaLabel: "ರಮೇಶ್ ಕುಮಾರ್ (ಟೆಕ್ಕಿ)", type: "criminal", riskScore: 78, details: "Cyber Syndicate Hacker. Phishing, Ransomware.", kannadaDetails: "ಹ್ಯಾಕರ್. ಫಿಶಿಂಗ್, ರಾನ್ಸಮ್‌ವೇರ್." },
  { id: "C003", label: "Mohammad Yusuf (Bhaiya)", kannadaLabel: "ಮೊಹಮ್ಮದ್ ಯೂಸುಫ್ (ಭಯ್ಯಾ)", type: "criminal", riskScore: 85, details: "Coastal Drug Smuggler. MDMA distribution.", kannadaDetails: "ಡ್ರಗ್ ತಸ್ಕರ. ಎಂಡಿಎಂಎ ಜಾಲ." },
  { id: "C004", label: "Anand Murthy (Chabi)", kannadaLabel: "ಆನಂದ್ ಮೂರ್ತಿ (ಚಾಬಿ)", type: "criminal", riskScore: 72, details: "Expert lockbreaker. Residential theft.", kannadaDetails: "ಮನೆಗಳ್ಳತನದ ನಿಸ್ಸೀಮ." },
  { id: "C005", label: "Prakash Shetty (Blade)", kannadaLabel: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿ (ಬ್ಲೇಡ್)", type: "criminal", riskScore: 80, details: "Suresh Gowda's field enforcer. Armed robbery.", kannadaDetails: "ಸುರೇಶ್ ಗೌಡನ ಸಹಚರ. ಸಶಸ್ತ್ರ ದರೋಡೆ." },
  
  // Gangs
  { id: "G001", label: "Kariya Syndicate", kannadaLabel: "ಕರಿಯ ಸಿಂಡಿಕೇಟ್", type: "gang", details: "Extortion and armed robbery syndicate in Bengaluru East.", kannadaDetails: "ಬೆಂಗಳೂರು ಪೂರ್ವದಲ್ಲಿ ಸುಲಿಗೆ ಹಾಗೂ ದರೋಡೆ ಜಾಲ." },
  { id: "G002", label: "Silicon Shadows", kannadaLabel: "ಸಿಲಿಕಾನ್ ಶಾಡೋಸ್", type: "gang", details: "Cybercrime cell operating out of Indiranagar and Outer Ring Road.", kannadaDetails: "ಇಂದಿರಾನಗರ ಮತ್ತು ಹೊರ ವರ್ತುಲ ರಸ್ತೆಯಲ್ಲಿರುವ ಸೈಬರ್ ಅಪರಾಧ ಗುಂಪು." },
  { id: "G003", label: "Coastal Cartel", kannadaLabel: "ಕೋಸ್ಟಲ್ ಕಾರ್ಟೆಲ್", type: "gang", details: "Inter-state drug smuggling operation spanning Mangaluru-Goa.", kannadaDetails: "ಮಂಗಳೂರು-ಗೋವಾ ನಡುವೆ ಡ್ರಗ್ಸ್ ಸಾಗಿಸುವ ಜಾಲ." },

  // Phone Numbers
  { id: "P001", label: "+91 98845 23112", kannadaLabel: "+91 98845 23112", type: "phone", details: "Registered to Suresh Gowda. Burner Sim.", kannadaDetails: "ಸುರೇಶ್ ಗೌಡನ ಹೆಸರಿನಲ್ಲಿದೆ. ನಕಲಿ ಸಿಮ್." },
  { id: "P002", label: "+91 90088 12345", kannadaLabel: "+91 90088 12345", type: "phone", details: "Registered to Prakash Shetty. Active call log.", kannadaDetails: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿಯ ಹೆಸರಿನಲ್ಲಿದೆ. ಸಕ್ರಿಯ ಕಾಲ್ ಲಾಗ್." },
  { id: "P003", label: "+91 88901 00234", kannadaLabel: "+91 88901 00234", type: "phone", details: "Registered to Ramesh Kumar. Connected to VPN IPs.", kannadaDetails: "ರಮೇಶ್ ಕುಮಾರ್ ಹೆಸರಿನಲ್ಲಿದೆ. ವಿಪಿಎನ್‌ಗೆ ಕನೆಕ್ಟ್ ಆಗಿದೆ." },

  // Vehicles
  { id: "V001", label: "KA-01-MJ-8800 (Black SUV)", kannadaLabel: "KA-01-MJ-8800 (ಕಪ್ಪು ಎಸ್‌ಯುವಿ)", type: "vehicle", details: "Owned by Suresh Gowda. Seen at Vasant Nagar crime scene.", kannadaDetails: "ಸುರೇಶ್ ಗೌಡನ ಮಾಲೀಕತ್ವ. ವಸಂತ ನಗರ ದರೋಡೆ ವೇಳೆ ಪತ್ತೆ." },
  { id: "V002", label: "KA-02-HP-1122 (Pulsar Bike)", kannadaLabel: "KA-02-HP-1122 (ಪಲ್ಸರ್ ಬೈಕ್)", type: "vehicle", details: "Owned by Prakash Shetty. Used in Majestic courier robbery.", kannadaDetails: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿಯ ಮಾಲೀಕತ್ವ. ಮೆಜೆಸ್ಟಿಕ್ ದರೋಡೆಗೆ ಬಳಸಲಾಗಿದೆ." },

  // Key locations
  { id: "L001", label: "Vasant Nagar, Bengaluru", kannadaLabel: "ವಸಂತ ನಗರ, ಬೆಂಗಳೂರು", type: "location", details: "Extortion hotspot.", kannadaDetails: "ಸುಲಿಗೆ ಜಾಲದ ಕೇಂದ್ರ." },
  { id: "L002", label: "Majestic, Bengaluru", kannadaLabel: "ಮೆಜೆಸ್ಟಿಕ್, ಬೆಂಗಳೂರು", type: "location", details: "Robbery and transit hub.", kannadaDetails: "ದರೋಡೆ ಮತ್ತು ಸಾರಿಗೆ ಹಬ್." },
  { id: "L003", label: "Ullal Beach, Mangaluru", kannadaLabel: "ಉಳ್ಳಾಲ ಬೀಚ್, ಮಂಗಳೂರು", type: "location", details: "Drug drop zone.", kannadaDetails: "ಡ್ರಗ್ಸ್ ಸರಬರಾಜು ಸ್ಥಳ." }
];

export const networkEdges: NetworkEdge[] = [
  // Gang members
  { id: "E001", source: "C001", target: "G001", type: "gang_member", label: "Syndicate Boss", kannadaLabel: "ಸಿಂಡಿಕೇಟ್ ಮುಖ್ಯಸ್ಥ", weight: 5 },
  { id: "E002", source: "C005", target: "G001", type: "gang_member", label: "Enforcer", kannadaLabel: "ಶೂಟರ್ / ದಾಳಿಕೋರ", weight: 5 },
  { id: "E003", source: "C002", target: "G002", type: "gang_member", label: "Lead Hacker", kannadaLabel: "ಮುಖ್ಯ ಹ್ಯಾಕರ್", weight: 5 },
  { id: "E004", source: "C003", target: "G003", type: "gang_member", label: "Local Distributor", kannadaLabel: "ಸ್ಥಳೀಯ ವಿತರಕ", weight: 4 },

  // Criminal accomplice relations
  { id: "E005", source: "C001", target: "C005", type: "accomplice", label: "Direct Commands", kannadaLabel: "ನೇರ ಆದೇಶ", weight: 5 },
  
  // Call connections
  { id: "E006", source: "P001", target: "P002", type: "calls", label: "12 Calls (May 2026)", kannadaLabel: "೧೨ ಕರೆಗಳು (ಮೇ ೨೦೨೬)", weight: 4 },
  { id: "E007", source: "C001", target: "P001", type: "calls", label: "User", kannadaLabel: "ಬಳಕೆದಾರ", weight: 5 },
  { id: "E008", source: "C005", target: "P002", type: "calls", label: "User", kannadaLabel: "ಬಳಕೆದಾರ", weight: 5 },
  { id: "E009", source: "C002", target: "P003", type: "calls", label: "User", kannadaLabel: "ಬಳಕೆದಾರ", weight: 5 },

  // Vehicles
  { id: "E010", source: "C001", target: "V001", type: "vehicle_use", label: "Registered Owner", kannadaLabel: "ನೋಂದಾಯಿತ ಮಾಲೀಕ", weight: 5 },
  { id: "E011", source: "C005", target: "V002", type: "vehicle_use", label: "Registered Owner", kannadaLabel: "ನೋಂದಾಯಿತ ಮಾಲೀಕ", weight: 5 },
  { id: "E012", source: "C005", target: "V001", type: "vehicle_use", label: "Driver/Passenger", kannadaLabel: "ಚಾಲಕ/ಪ್ರಯಾಣಿಕ", weight: 3 }, // Suresh's SUV used by Prakash

  // Location base
  { id: "E013", source: "C001", target: "L001", type: "location_base", label: "Operates In", kannadaLabel: "ಕಾರ್ಯನಿರ್ವಹಣೆ", weight: 4 },
  { id: "E014", source: "C005", target: "L002", type: "location_base", label: "Operates In", kannadaLabel: "ಕಾರ್ಯನಿರ್ವಹಣೆ", weight: 4 },
  { id: "E015", source: "C003", target: "L003", type: "location_base", label: "Arrest Location", kannadaLabel: "ಬಂಧನದ ಸ್ಥಳ", weight: 5 }
];
