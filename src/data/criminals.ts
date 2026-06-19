export interface Criminal {
  id: string;
  name: string;
  kannadaName: string;
  alias: string;
  kannadaAlias: string;
  age: number;
  status: 'Active' | 'In Custody' | 'Wanted' | 'Inactive';
  primaryCrimeType: 'Cybercrime' | 'Drug Trafficking' | 'House Burglary' | 'Robbery' | 'Extortion';
  modusOperandi: string;
  kannadaModusOperandi: string;
  lastKnownLocation: string;
  kannadaLastKnownLocation: string;
  riskScore: number;
  gangAffiliation: string;
  biography: string;
  kannadaBiography: string;
  physicalTraits: string[];
  kannadaPhysicalTraits: string[];
  contactNumber: string;
  associatedVehicles: string[];
}

export const criminals: Criminal[] = [
  {
    id: "C001",
    name: "Suresh Gowda",
    kannadaName: "ಸುರೇಶ್ ಗೌಡ",
    alias: "Kariya",
    kannadaAlias: "ಕರಿಯ",
    age: 42,
    status: "Wanted",
    primaryCrimeType: "Extortion",
    modusOperandi: "Targets construction business owners in Bengaluru East. Demands protection money ('hafta') using shell numbers. Employs local street operatives for intimidation.",
    kannadaModusOperandi: "ಬೆಂಗಳೂರು ಪೂರ್ವದಲ್ಲಿ ಬಿಲ್ಡರ್‌ಗಳನ್ನು ಗುರಿಯಾಗಿಸುತ್ತಾನೆ. ನಕಲಿ ಸಿಮ್ ಕಾರ್ಡ್ ಬಳಸಿ ಹಣಕ್ಕಾಗಿ ಬೆದರಿಕೆ ಹಾಕುತ್ತಾನೆ. ಬೆದರಿಸಲು ಸ್ಥಳೀಯ ಗೂಂಡಾಗಳನ್ನು ಬಳಸಿಕೊಳ್ಳುತ್ತಾನೆ.",
    lastKnownLocation: "Koramangala, Bengaluru",
    kannadaLastKnownLocation: "ಕೋರಮಂಗಲ, ಬೆಂಗಳೂರು",
    riskScore: 92,
    gangAffiliation: "Kariya Syndicate",
    biography: "Involved in local land disputes and extortion since 2018. Escaped custody in Mysuru in late 2025. Currently active in hiding.",
    kannadaBiography: "೨೦೧೮ ರಿಂದ ಭೂವಿವಾದ ಹಾಗೂ ಸುಲಿಗೆ ದಂಧೆಯಲ್ಲಿ ಸಕ್ರಿಯ. ೨೦೨೫ ರ ಕೊನೆಯಲ್ಲಿ ಮೈಸೂರು ಜೈಲಿನಿಂದ ತಪ್ಪಿಸಿಕೊಂಡಿದ್ದನು. ಪ್ರಸ್ತುತ ತಲೆಮರೆಸಿಕೊಂಡಿದ್ದಾನೆ.",
    physicalTraits: ["Dark complexion", "Scar on right cheek", "Height: 5ft 10in"],
    kannadaPhysicalTraits: ["ಕಪ್ಪು ಮೈಬಣ್ಣ", "ಬಲ ಕೆನ್ನೆಯ ಮೇಲೆ ಗಾಯದ ಗುರುತು", "ಎತ್ತರ: ೫ ಅಡಿ ೧೦ ಇಂಚು"],
    contactNumber: "+91 98845 23112",
    associatedVehicles: ["KA-01-MJ-8800 (Black SUV)", "KA-03-HA-4321"]
  },
  {
    id: "C002",
    name: "Ramesh Kumar",
    kannadaName: "ರಮೇಶ್ ಕುಮಾರ್",
    alias: "Techie Ramesh",
    kannadaAlias: "ಟೆಕ್ಕಿ ರಮೇಶ್",
    age: 29,
    status: "Active",
    primaryCrimeType: "Cybercrime",
    modusOperandi: "Phishing websites mimicking banking portals. Distributes ransomware targeting government contractors. Routes funds via cryptocurrency mixers.",
    kannadaModusOperandi: "ಬ್ಯಾಂಕಿಂಗ್ ಪೋರ್ಟಲ್‌ಗಳನ್ನು ಹೋಲುವ ನಕಲಿ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಮೂಲಕ ವಂಚನೆ. ಸರ್ಕಾರಿ ಗುತ್ತಿಗೆದಾರರನ್ನು ಗುರಿಯಾಗಿಸಿ ಹ್ಯಾಕಿಂಗ್. ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿ ಮೂಲಕ ಹಣ ವರ್ಗಾವಣೆ.",
    lastKnownLocation: "Indiranagar, Bengaluru",
    kannadaLastKnownLocation: "ಇಂದಿರಾನಗರ, ಬೆಂಗಳೂರು",
    riskScore: 78,
    gangAffiliation: "Silicon Shadows",
    biography: "Former software engineer expelled for internal data theft. Recruits engineering dropouts to run large-scale financial spoofing farms.",
    kannadaBiography: "ಮಾಜಿ ತಂತ್ರಾಂಶ ಎಂಜಿನಿಯರ್. ದತ್ತಾಂಶ ಕಳ್ಳತನದ ಆರೋಪದ ಮೇಲೆ ಕೆಲಸದಿಂದ ವಜಾಗೊಂಡಿದ್ದನು. ಇಂಜಿನಿಯರಿಂಗ್ ಮದ್ಯದಲ್ಲೇ ಬಿಟ್ಟ ಯುವಕರನ್ನು ಸೇರಿಸಿ ಸೈಬರ್ ವಂಚನೆ ಜಾಲ ನಡೆಸುತ್ತಿದ್ದಾನೆ.",
    physicalTraits: ["Wears thick spectacles", "Lean build", "Height: 5ft 8in"],
    kannadaPhysicalTraits: ["ದಪ್ಪ ಕನ್ನಡಕ ಧರಿಸುತ್ತಾನೆ", "ತೆಳ್ಳಗಿನ ಶರೀರ", "ಎತ್ತರ: ೫ ಅಡಿ ೮ ಇಂಚು"],
    contactNumber: "+91 88901 00234",
    associatedVehicles: ["KA-05-NB-1024 (White Sedan)"]
  },
  {
    id: "C003",
    name: "Mohammad Yusuf",
    kannadaName: "ಮೊಹಮ್ಮದ್ ಯೂಸುಫ್",
    alias: "Bhaiya",
    kannadaAlias: "ಭಯ್ಯಾ",
    age: 38,
    status: "In Custody",
    primaryCrimeType: "Drug Trafficking",
    modusOperandi: "Smuggles synthetic drugs from border states. Utilizes student networks in colleges near Mangaluru and Manipal for distribution.",
    kannadaModusOperandi: "ನೆರೆ ರಾಜ್ಯಗಳಿಂದ ಸಂಶ್ಲೇಷಿತ ಡ್ರಗ್ಸ್ (ಎಂಡಿಎಂಎ) ಸಾಗಣೆ ಮಾಡುತ್ತಾನೆ. ಮಂಗಳೂರು ಮತ್ತು ಮಣಿಪಾಲದ ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಜಾಲದಲ್ಲಿ ಬಳಸಿಕೊಳ್ಳುತ್ತಾನೆ.",
    lastKnownLocation: "Kadri, Mangaluru",
    kannadaLastKnownLocation: "ಕದ್ರಿ, ಮಂಗಳೂರು",
    riskScore: 85,
    gangAffiliation: "Coastal Cartel",
    biography: "Arrested near Ullal beach in March 2026 with 5kg of MDMA. Under trial. Currently logged at Mangaluru Central Prison.",
    kannadaBiography: "ಮಾರ್ಚ್ ೨೦೨೬ ರಲ್ಲಿ ಉಳ್ಳಾಲ ಕಡಲತೀರದ ಬಳಿ ೫ ಕೆಜಿ ಎಂಡಿಎಂಎ ಸಮೇತ ಬಂಧಿಸಲಾಯಿತು. ಪ್ರಸ್ತುತ ಮಂಗಳೂರು ಕೇಂದ್ರ ಕಾರಾಗೃಹದಲ್ಲಿದ್ದಾನೆ.",
    physicalTraits: ["Beard", "Tattoo of an anchor on left arm", "Height: 5ft 7in"],
    kannadaPhysicalTraits: ["ಗಡ್ಡ ಬಿಟ್ಟಿದ್ದಾನೆ", "ಎಡಗೈ ಮೇಲೆ ಆ್ಯಂಕರ್ ಹಚ್ಚೆ", "ಎತ್ತರ: ೫ ಅಡಿ ೭ ಇಂಚು"],
    contactNumber: "+91 97723 11440",
    associatedVehicles: ["KL-14-AA-9999 (Blue Hatchback)"]
  },
  {
    id: "C004",
    name: "Anand Murthy",
    kannadaName: "ಆನಂದ್ ಮೂರ್ತಿ",
    alias: "Chabi Anand",
    kannadaAlias: "ಚಾಬಿ ಆನಂದ್",
    age: 51,
    status: "Wanted",
    primaryCrimeType: "House Burglary",
    modusOperandi: "Conducts recce of locked houses in residential areas like Jayanagar and JP Nagar during daytime. Uses brass lock cutters. Disables local CCTV cameras before breaking in.",
    kannadaModusOperandi: "ಜಯನಗರ ಮತ್ತು ಜೆ.ಪಿ ನಗರದ ಬೀಗ ಹಾಕಿದ ಮನೆಗಳ ಮೇಲೆ ಕಣ್ಣಿಡುತ್ತಾನೆ. ಹಿತ್ತಾಳೆ ಬೀಗ ಕತ್ತರಿಸುವ ಸಾಧನಗಳನ್ನು ಬಳಸುತ್ತಾನೆ. ಒಳ ನುಗ್ಗುವ ಮುನ್ನ ಸಿಸಿಟಿವಿ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸುತ್ತಾನೆ.",
    lastKnownLocation: "Vijayanagar, Mysuru",
    kannadaLastKnownLocation: "ವಿಜಯನಗರ, ಮೈಸೂರು",
    riskScore: 72,
    gangAffiliation: "Lockbreakers Gang",
    biography: "A veteran thief with 15 prior cases of residential burglary across South Karnataka. Master of creating duplicate keys on-site.",
    kannadaBiography: "ದಕ್ಷಿಣ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಮನೆಗಳ್ಳತನದ ೧೫ಕ್ಕೂ ಹೆಚ್ಚು ಪ್ರಕರಣಗಳಿರುವ ಹಿರಿಯ ಅಪರಾಧಿ. ನಕಲಿ ಕೀಲಿ ತಯಾರಿಸುವಲ್ಲಿ ನಿಸ್ಸೀಮ.",
    physicalTraits: ["Limps while walking", "Bald patches", "Height: 5ft 6in"],
    kannadaPhysicalTraits: ["ನಡೆಯುವಾಗ ಕುಂಟುತ್ತಾನೆ", "ಬೋಳು ತಲೆ", "ಎತ್ತರ: ೫ ಅಡಿ ೬ ಇಂಚು"],
    contactNumber: "+91 91234 56789",
    associatedVehicles: ["KA-09-ER-5678 (Red Scooter)"]
  },
  {
    id: "C005",
    name: "Prakash Shetty",
    kannadaName: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿ",
    alias: "Blade Prakash",
    kannadaAlias: "ಬ್ಲೇಡ್ ಪ್ರಕಾಶ್",
    age: 35,
    status: "Active",
    primaryCrimeType: "Robbery",
    modusOperandi: "Targets gold transport personnel and cash couriers near Majestic area. Uses motorbikes for swift snatch-and-escape maneuvers.",
    kannadaModusOperandi: "ಮೆಜೆಸ್ಟಿಕ್ ಪ್ರದೇಶದಲ್ಲಿ ಚಿನ್ನ ಸಾಗಿಸುವ ನೌಕರರು ಮತ್ತು ನಗದು ಸಾಗಣೆದಾರರನ್ನು ಗುರಿಯಾಗಿಸುತ್ತಾನೆ. ದರೋಡೆ ಮಾಡಿ ದ್ವಿಚಕ್ರ ವಾಹನದಲ್ಲಿ ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ಪರಾರಿಯಾಗುತ್ತಾನೆ.",
    lastKnownLocation: "Majestic, Bengaluru",
    kannadaLastKnownLocation: "ಮೆಜೆಸ್ಟಿಕ್, ಬೆಂಗಳೂರು",
    riskScore: 80,
    gangAffiliation: "Kariya Syndicate",
    biography: "Linked directly as a field enforcer for Suresh Gowda. Known to carry lethal sharp weapons. Escaped roadblock checks in Kalasipalya in May 2026.",
    kannadaBiography: "ಸುರೇಶ್ ಗೌಡನ ಮುಖ್ಯ ಆಪ್ತ ವಲಯದಲ್ಲಿ ಸಕ್ರಿಯ. ಮಾರಕಾಸ್ತ್ರಗಳನ್ನು ಹೊಂದಿರುವ ಸಂಭವವಿದೆ. ಮೇ ೨೦೨೬ ರಲ್ಲಿ ಕಲಾಸಿಪಾಳ್ಯದಲ್ಲಿ ಪೋಲಿಸ್ ತಪಾಸಣೆಯಿಂದ ತಪ್ಪಿಸಿಕೊಂಡಿದ್ದನು.",
    physicalTraits: ["Deep scar near left eye", "Stout build", "Height: 5ft 9in"],
    kannadaPhysicalTraits: ["ಎಡಗಣ್ಣಿನ ಹತ್ತಿರ ಆಳವಾದ ಗಾಯದ ಗುರುತು", "ದಪ್ಪನೆಯ ಶರೀರ", "ಎತ್ತರ: ೫ ಅಡಿ ೯ ಇಂಚು"],
    contactNumber: "+91 90088 12345",
    associatedVehicles: ["KA-02-HP-1122 (Pulsar Motorbike)", "KA-01-ZZ-5050"]
  }
];
