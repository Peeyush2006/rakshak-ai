export interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  kannadaTitle: string;
  type: 'Cybercrime' | 'Drug Trafficking' | 'House Burglary' | 'Robbery' | 'Extortion';
  status: 'Under Investigation' | 'Closed' | 'Cold Case';
  date: string;
  location: string;
  kannadaLocation: string;
  district: string;
  kannadaDistrict: string;
  description: string;
  kannadaDescription: string;
  assignedOfficer: string;
  kannadaAssignedOfficer: string;
  suspectIds: string[];
  evidence: string[];
  kannadaEvidence: string[];
  riskLevel: 'High' | 'Medium' | 'Low';
}

export const cases: CaseRecord[] = [
  {
    id: "CASE-2026-001",
    caseNumber: "CR-2026-00918",
    title: "Vasant Nagar extortion attempt on Builder",
    kannadaTitle: "ವಸಂತ ನಗರದಲ್ಲಿ ಬಿಲ್ಡರ್ ಮೇಲೆ ಸುಲಿಗೆ ಯತ್ನ",
    type: "Extortion",
    status: "Under Investigation",
    date: "2026-05-12",
    location: "Vasant Nagar, Bengaluru East",
    kannadaLocation: "ವಸಂತ ನಗರ, ಬೆಂಗಳೂರು ಪೂರ್ವ",
    district: "Bengaluru City",
    kannadaDistrict: "ಬೆಂಗಳೂರು ನಗರ",
    description: "Extortion call demanding 50 Lakhs from a real estate developer. Threatening calls traced back to a burner SIM card, linked to agents of Suresh Gowda. Site supervisor was physically assaulted as a warning.",
    kannadaDescription: "ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಉದ್ಯಮಿಯಿಂದ ೫೦ ಲಕ್ಷ ರೂಪಾಯಿ ಸುಲಿಗೆಗೆ ಬೇಡಿಕೆ. ಬೆದರಿಕೆ ಕರೆಗಳು ಸುರೇಶ್ ಗೌಡನ ಸಹಚರರಿಗೆ ಸಂಬಂಧಿಸಿದ ನಕಲಿ ಸಿಮ್ ಕಾರ್ಡ್‌ನಿಂದ ಬಂದಿವೆ. ಎಚ್ಚರಿಕೆಯಾಗಿ ಸೈಟ್ ಮೇಲ್ವಿಚಾರಕನ ಮೇಲೆ ಹಲ್ಲೆ ನಡೆಸಲಾಗಿದೆ.",
    assignedOfficer: "ACP Pradeep Rao",
    kannadaAssignedOfficer: "ಎಸಿಪಿ ಪ್ರದೀಪ್ ರಾವ್",
    suspectIds: ["C001", "C005"],
    evidence: [
      "Recorded phone audio file (Extortion demand)",
      "CCTV footage of two men fleeing on KA-02-HP-1122",
      "Assault weapon (iron rod) recovered near construction site"
    ],
    kannadaEvidence: [
      "ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್ (ಸುಲಿಗೆ ಬೇಡಿಕೆ ಕರೆ)",
      "ಆರೋಪಿಗಳು KA-02-HP-1122 ವಾಹನದಲ್ಲಿ ಓಡಿಹೋಗುತ್ತಿರುವ ಸಿಸಿಟಿವಿ ದೃಶ್ಯಾವಳಿ",
      "ಕಟ್ಟಡ ನಿರ್ಮಾಣ ಸ್ಥಳದ ಬಳಿ ದೊರೆತ ಹಲ್ಲೆಗೆ ಬಳಸಿದ ಕಬ್ಬಿಣದ ರಾಡ್"
    ],
    riskLevel: "High"
  },
  {
    id: "CASE-2026-002",
    caseNumber: "CR-2026-01102",
    title: "Phishing attack on Karnataka Power Corporation",
    kannadaTitle: "ಕರ್ನಾಟಕ ಪವರ್ ಕಾರ್ಪೊರೇಷನ್ ಮೇಲೆ ಸೈಬರ್ ದಾಳಿ",
    type: "Cybercrime",
    status: "Under Investigation",
    date: "2026-05-28",
    location: "KPMG Road, Indiranagar, Bengaluru",
    kannadaLocation: "ಇಂದಿರಾನಗರ, ಬೆಂಗಳೂರು",
    district: "Bengaluru City",
    kannadaDistrict: "ಬೆಂಗಳೂರು ನಗರ",
    description: "Spoofed email domain mimicking the finance department sent to accounts executive. Induced a wire transfer of 1.2 Crores to a shell account. Money trails converted to cryptocurrency within 45 minutes.",
    kannadaDescription: "ಆರ್ಥಿಕ ಇಲಾಖೆಯ ಹೆಸರಿನಲ್ಲಿ ನಕಲಿ ಇಮೇಲ್ ಕಳುಹಿಸಿ ಖಾತೆ ಅಧಿಕಾರಿಯನ್ನು ವಂಚಿಸಲಾಗಿದೆ. ೧.೨ ಕೋಟಿ ರೂಪಾಯಿ ಹಣವನ್ನು ನಕಲಿ ಖಾತೆಗೆ ವರ್ಗಾಯಿಸಿಕೊಳ್ಳಲಾಗಿದೆ. ೪೫ ನಿಮಿಷಗಳಲ್ಲಿ ಹಣವನ್ನು ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿಯಾಗಿ ಪರಿವರ್ತಿಸಲಾಗಿದೆ.",
    assignedOfficer: "Inspector Veena Patil (Cyber Crime Cell)",
    kannadaAssignedOfficer: "ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ವೀಣಾ ಪಾಟೀಲ್ (ಸೈಬರ್ ಕ್ರೈಮ್)",
    suspectIds: ["C002"],
    evidence: [
      "SMTP server transaction logs with spoofed IP addresses",
      "Cryptocurrency wallet address: 3J98t1WpEZ73CNmQ...",
      "Emails recovered from corporate server"
    ],
    kannadaEvidence: [
      "ನಕಲಿ ಐಪಿ ವಿಳಾಸಗಳಿರುವ ಎಸ್‌ಎಂಟಿಪಿ ಸರ್ವರ್ ವಹಿವಾಟು ದಾಖಲೆಗಳು",
      "ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿ ವಾಲೆಟ್ ವಿಳಾಸ: 3J98t1WpEZ73CNmQ...",
      "ಕಂಪನಿಯ ಸರ್ವರ್‌ನಿಂದ ವಶಪಡಿಸಿಕೊಂಡ ಇಮೇಲ್‌ಗಳು"
    ],
    riskLevel: "Medium"
  },
  {
    id: "CASE-2026-003",
    caseNumber: "CR-2026-00445",
    title: "MDMA distribution ring bust near Mangaluru college",
    kannadaTitle: "ಮಂಗಳೂರು ಕಾಲೇಜು ಬಳಿ ಎಂಡಿಎಂಎ ಜಾಲ ಪತ್ತೆ",
    type: "Drug Trafficking",
    status: "Closed",
    date: "2026-03-14",
    location: "Ullal, Mangaluru",
    kannadaLocation: "ಉಳ್ಳಾಲ, ಮಂಗಳೂರು",
    district: "Dakshina Kannada",
    kannadaDistrict: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    description: "Targeted raid conducted on a beach shack following a tip-off from student informants. Recovered 5kg MDMA packets hidden in fishing nets. Caught Mohammad Yusuf red-handed.",
    kannadaDescription: "ವಿದ್ಯಾರ್ಥಿಗಳಿಂದ ಬಂದ ಖಚಿತ ಮಾಹಿತಿ ಮೇರೆಗೆ ಬೀಚ್ ಹೌಸ್ ಮೇಲೆ ದಾಳಿ. ಮೀನುಗಾರಿಕಾ ಬಲೆಯಲ್ಲಿ ಬಚ್ಚಿಟ್ಟಿದ್ದ ೫ ಕೆಜಿ ಎಂಡಿಎಂಎ ವಶಕ್ಕೆ ಪಡೆಯಲಾಗಿದೆ. ಮೊಹಮ್ಮದ್ ಯೂಸುಫ್‌ನನ್ನು ರೆಡ್ ಹ್ಯಾಂಡ್ ಆಗಿ ಹಿಡಿಯಲಾಗಿದೆ.",
    assignedOfficer: "DSP Sharanappa Gowda",
    kannadaAssignedOfficer: "ಡಿಎಸ್ಪಿ ಶರಣಪ್ಪ ಗೌಡ",
    suspectIds: ["C003"],
    evidence: [
      "5kg MDMA testing grade lab report confirming 98% purity",
      "Seized WhatsApp chats scheduling deliveries",
      "Confiscated Blue Hatchback (KL-14-AA-9999)"
    ],
    kannadaEvidence: [
      "೯೮% ಶುದ್ಧತೆ ದೃಢೀಕರಿಸುವ ೫ ಕೆಜಿ ಎಂಡಿಎಂಎ ಪ್ರಯೋಗಾಲಯದ ವರದಿ",
      "ದಾಸ್ತಾನು ಮತ್ತು ವಿತರಣೆಗೆ ಸಂಬಂಧಿಸಿದ ವಾಟ್ಸಾಪ್ ಚಾಟ್‌ಗಳು",
      "ವಶಪಡಿಸಿಕೊಂಡ ವಾಹನ (KL-14-AA-9999)"
    ],
    riskLevel: "High"
  },
  {
    id: "CASE-2026-004",
    caseNumber: "CR-2026-00812",
    title: "Gold heist at residence in Jayanagar 4th Block",
    kannadaTitle: "ಜಯನಗರ ೪ನೇ ಬ್ಲಾಕ್ ಮನೆಯಲ್ಲಿ ಚಿನ್ನಾಭರಣ ಕಳ್ಳತನ",
    type: "House Burglary",
    status: "Under Investigation",
    date: "2026-04-22",
    location: "Jayanagar 4th Block, Bengaluru South",
    kannadaLocation: "ಜಯನಗರ ೪ನೇ ಬ್ಲಾಕ್, ಬೆಂಗಳೂರು ದಕ್ಷಿಣ",
    district: "Bengaluru City",
    kannadaDistrict: "ಬೆಂಗಳೂರು ನಗರ",
    description: "Locked house broken into between 2:00 PM and 5:00 PM. Lock broken cleanly using high-grade brass cutters. Gold ornaments worth 40 Lakhs and 5 Lakhs cash stolen. Suspected hand of Anand Murthy due to identical MO.",
    kannadaDescription: "ಮಧ್ಯಾಹ್ನ ೨ ರಿಂದ ಸಂಜೆ ೫ ರ ನಡುವೆ ಬೀಗ ಹಾಕಿದ ಮನೆಗೆ ನುಗ್ಗಿದ್ದಾರೆ. ಬೀಗವನ್ನು ಕತ್ತರಿಸುವ ಮೂಲಕ ಒಳಹೊಕ್ಕಿದ್ದಾರೆ. ೪೦ ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನಾಭರಣ ಮತ್ತು ೫ ಲಕ್ಷ ನಗದು ಕಳವು ಮಾಡಲಾಗಿದೆ. ವಿಧಾನವನ್ನು ನೋಡಿ ಆನಂದ್ ಮೂರ್ತಿ ಕೈವಾಡವೆಂದು ಶಂಕಿಸಲಾಗಿದೆ.",
    assignedOfficer: "Inspector Satish Hegde",
    kannadaAssignedOfficer: "ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಸತೀಶ್ ಹೆಗಡೆ",
    suspectIds: ["C004"],
    evidence: [
      "Broken brass padlock from main entrance door",
      "Footprints matching size 9 formal shoes",
      "Local informant tip placing Anand Murthy in Bengaluru on April 22"
    ],
    kannadaEvidence: [
      "ಮುಖ್ಯ ದ್ವಾರದ ಒಡೆದ ಹಿತ್ತಾಳೆ ಬೀಗ",
      "೯ ನಂಬರ್ ಗಾತ್ರದ ಬೂಟಿನ ಹೆಜ್ಜೆ ಗುರುತುಗಳು",
      "ಏಪ್ರಿಲ್ ೨೨ ರಂದು ಆನಂದ್ ಮೂರ್ತಿ ಬೆಂಗಳೂರಿನಲ್ಲಿದ್ದ ಬಗ್ಗೆ ಸ್ಥಳೀಯ ಖಬರಿ ಮಾಹಿತಿ"
    ],
    riskLevel: "Medium"
  },
  {
    id: "CASE-2026-005",
    caseNumber: "CR-2026-01055",
    title: "Majestic Gold Courier Robbery at knifepoint",
    kannadaTitle: "ಮೆಜೆಸ್ಟಿಕ್‌ನಲ್ಲಿ ಚಾಕು ತೋರಿಸಿ ಚಿನ್ನ ಸಾಗಣೆದಾರರ ದರೋಡೆ",
    type: "Robbery",
    status: "Under Investigation",
    date: "2026-05-18",
    location: "Majestic Underpass, Bengaluru Central",
    kannadaLocation: "ಮೆಜೆಸ್ಟಿಕ್ ಅಂಡರ್‌ಪಾಸ್, ಬೆಂಗಳೂರು ಕೇಂದ್ರ",
    district: "Bengaluru City",
    kannadaDistrict: "ಬೆಂಗಳೂರು ನಗರ",
    description: "A wholesale jewelry courier was intercepted in a pedestrian underpass. Robbers brandished machetes and snatched a bag containing 1.5kg gold biscuits. Assailants fled on a black Pulsar motorbike.",
    kannadaDescription: "ಚಿನ್ನಾಭರಣ ಸಾಗಣೆದಾರನನ್ನು ಸಾರ್ವಜನಿಕ ಸುರಂಗ ಮಾರ್ಗದಲ್ಲಿ ಅಡ್ಡಗಟ್ಟಲಾಗಿದೆ. ಮಚ್ಚು ತೋರಿಸಿ ಬೆದರಿಸಿ ೧.೫ ಕೆಜಿ ಚಿನ್ನದ ಬಿಸ್ಕತ್‌ಗಳಿದ್ದ ಬ್ಯಾಗ್ ಕಿತ್ತುಕೊಂಡಿದ್ದಾರೆ. ದರೋಡೆಕೋರರು ಕಪ್ಪು ಪಲ್ಸರ್ ಬೈಕ್‌ನಲ್ಲಿ ಪರಾರಿಯಾಗಿದ್ದಾರೆ.",
    assignedOfficer: "ACP Pradeep Rao",
    kannadaAssignedOfficer: "ಎಸಿಪಿ ಪ್ರದೀಪ್ ರಾವ್",
    suspectIds: ["C001", "C005"],
    evidence: [
      "CCTV grab of Black Pulsar with partially obscured registration (KA-02-HP-11**)",
      "Fingerprints recovered from discarded packaging",
      "Eyewitness sketches matching 'Blade Prakash'"
    ],
    kannadaEvidence: [
      "ಭಾಗಶಃ ಮುಚ್ಚಿದ ನೋಂದಣಿ ಸಂಖ್ಯೆಯುಳ್ಳ ಕಪ್ಪು ಪಲ್ಸರ್‌ನ ಸಿಸಿಟಿವಿ ಚಿತ್ರ (KA-02-HP-11**)",
      "ಬಿಸಾಡಿದ ಬ್ಯಾಗ್‌ನಿಂದ ಸಂಗ್ರಹಿಸಿದ ಬೆರಳಚ್ಚುಗಳು",
      "ಪ್ರತ್ಯಕ್ಷದರ್ಶಿಗಳು ನೀಡಿದ ಆಧಾರದ ಮೇಲೆ 'ಬ್ಲೇಡ್ ಪ್ರಕಾಶ್' ರೇಖಾಚಿತ್ರ"
    ],
    riskLevel: "High"
  }
];
