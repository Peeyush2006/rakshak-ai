// Karnataka Police Department
// In-Memory Relational Database Mock for the Police FIR System

export const State = [
  { StateID: 29, StateName: 'Karnataka', NationalityID: 1, Active: 1 },
  { StateID: 32, StateName: 'Kerala', NationalityID: 1, Active: 1 }
];

export const District = [
  { DistrictID: 1, DistrictName: 'Bengaluru City', StateID: 29, Active: 1 },
  { DistrictID: 2, DistrictName: 'Dakshina Kannada', StateID: 29, Active: 1 },
  { DistrictID: 3, DistrictName: 'Mysuru', StateID: 29, Active: 1 }
];

export const Court = [
  { CourtID: 101, CourtName: 'City Civil Court Bengaluru', DistrictID: 1, StateID: 29, Active: 1 },
  { CourtID: 102, CourtName: 'District Sessions Court Mangaluru', DistrictID: 2, StateID: 29, Active: 1 },
  { CourtID: 103, CourtName: 'District Court Mysuru', DistrictID: 3, StateID: 29, Active: 1 }
];

export const UnitType = [
  { UnitTypeID: 1, UnitTypeName: 'Police Station', CityDistState: 'City/District', Hierarchy: 3, Active: 1 },
  { UnitTypeID: 2, UnitTypeName: 'Circle Office', CityDistState: 'District', Hierarchy: 2, Active: 1 },
  { UnitTypeID: 3, UnitTypeName: 'Commissionerate', CityDistState: 'City/State', Hierarchy: 1, Active: 1 }
];

export const Unit = [
  { UnitID: 1001, UnitName: 'Vasant Nagar Police Station', TypeID: 1, ParentUnit: null, NationalityID: 1, StateID: 29, DistrictID: 1, Active: 1 },
  { UnitID: 1002, UnitName: 'Indiranagar Police Station', TypeID: 1, ParentUnit: null, NationalityID: 1, StateID: 29, DistrictID: 1, Active: 1 },
  { UnitID: 1003, UnitName: 'Ullal Police Station', TypeID: 1, ParentUnit: null, NationalityID: 1, StateID: 29, DistrictID: 2, Active: 1 },
  { UnitID: 1004, UnitName: 'Majestic Police Station', TypeID: 1, ParentUnit: null, NationalityID: 1, StateID: 29, DistrictID: 1, Active: 1 }
];

export const Rank = [
  { RankID: 1, RankName: 'Police Constable', Hierarchy: 6, Active: 1 },
  { RankID: 2, RankName: 'Police Sub-Inspector', Hierarchy: 5, Active: 1 },
  { RankID: 3, RankName: 'Inspector of Police', Hierarchy: 4, Active: 1 },
  { RankID: 4, RankName: 'Deputy Superintendent of Police', Hierarchy: 3, Active: 1 },
  { RankID: 5, RankName: 'Assistant Commissioner of Police', Hierarchy: 2, Active: 1 },
  { RankID: 6, RankName: 'Commissioner of Police', Hierarchy: 1, Active: 1 }
];

export const Designation = [
  { DesignationID: 1, DesignationName: 'Station House Officer (SHO)', Active: 1, SortOrder: 1 },
  { DesignationID: 2, DesignationName: 'Investigating Officer (IO)', Active: 1, SortOrder: 2 },
  { DesignationID: 3, DesignationName: 'Field Officer', Active: 1, SortOrder: 3 },
  { DesignationID: 4, DesignationName: 'Beat Patrol Head', Active: 1, SortOrder: 4 }
];

export const Employee = [
  { EmployeeID: 201, DistrictID: 1, UnitID: 1001, RankID: 5, DesignationID: 2, KGID: 'KGID-1998-00214', FirstName: 'Pradeep Rao', EmployeeDOB: '1975-04-12', GenderID: 1, BloodGroupID: 2, PhysicallyChallenged: 0, AppointmentDate: '1998-06-15' },
  { EmployeeID: 202, DistrictID: 1, UnitID: 1002, RankID: 3, DesignationID: 1, KGID: 'KGID-2005-01048', FirstName: 'Veena Patil', EmployeeDOB: '1981-11-23', GenderID: 2, BloodGroupID: 1, PhysicallyChallenged: 0, AppointmentDate: '2005-09-01' },
  { EmployeeID: 203, DistrictID: 2, UnitID: 1003, RankID: 4, DesignationID: 2, KGID: 'KGID-2000-00891', FirstName: 'Sharanappa Gowda', EmployeeDOB: '1977-08-05', GenderID: 1, BloodGroupID: 3, PhysicallyChallenged: 0, AppointmentDate: '2000-02-18' },
  { EmployeeID: 204, DistrictID: 1, UnitID: 1004, RankID: 2, DesignationID: 2, KGID: 'KGID-2012-00566', FirstName: 'Rajesh Kumar', EmployeeDOB: '1988-02-14', GenderID: 1, BloodGroupID: 4, PhysicallyChallenged: 0, AppointmentDate: '2012-07-20' }
];

export const CaseCategory = [
  { CaseCategoryID: 1, LookupValue: 'FIR (First Information Report)' },
  { CaseCategoryID: 2, LookupValue: 'UDR (Un-natural Death Report)' },
  { CaseCategoryID: 3, LookupValue: 'Zero FIR' },
  { CaseCategoryID: 4, LookupValue: 'PAR (Petitioner Enquiry)' }
];

export const GravityOffence = [
  { GravityOffenceID: 1, LookupValue: 'Heinous' },
  { GravityOffenceID: 2, LookupValue: 'Non-Heinous' }
];

export const CaseStatusMaster = [
  { CaseStatusID: 1, CaseStatusName: 'Under Investigation' },
  { CaseStatusID: 2, CaseStatusName: 'Closed (Charge Sheeted)' },
  { CaseStatusID: 3, CaseStatusName: 'Cold Case (Undetected)' }
];

export const CrimeHead = [
  { CrimeHeadID: 1, CrimeGroupName: 'Crimes Against Body', Active: 1 },
  { CrimeHeadID: 2, CrimeGroupName: 'Cybercrime', Active: 1 },
  { CrimeHeadID: 3, CrimeGroupName: 'Drug Trafficking', Active: 1 },
  { CrimeHeadID: 4, CrimeGroupName: 'Property Theft & House Burglary', Active: 1 },
  { CrimeHeadID: 5, CrimeGroupName: 'Extortion', Active: 1 }
];

export const CrimeSubHead = [
  { CrimeSubHeadID: 11, CrimeHeadID: 1, CrimeHeadName: 'Murder', SeqID: 1 },
  { CrimeSubHeadID: 21, CrimeHeadID: 2, CrimeHeadName: 'Phishing & Wire Fraud', SeqID: 1 },
  { CrimeSubHeadID: 31, CrimeHeadID: 3, CrimeHeadName: 'MDMA Sale & Distribution', SeqID: 1 },
  { CrimeSubHeadID: 41, CrimeHeadID: 4, CrimeHeadName: 'Locked House Burglary', SeqID: 1 },
  { CrimeSubHeadID: 51, CrimeHeadID: 5, CrimeHeadName: 'Construction Protection Demands', SeqID: 1 }
];

export const CasteMaster = [
  { caste_master_id: 1, caste_master_name: 'General' },
  { caste_master_id: 2, caste_master_name: 'OBC' },
  { caste_master_id: 3, caste_master_name: 'SC' },
  { caste_master_id: 4, caste_master_name: 'ST' }
];

export const ReligionMaster = [
  { ReligionID: 1, ReligionName: 'Hindu' },
  { ReligionID: 2, ReligionName: 'Muslim' },
  { ReligionID: 3, ReligionName: 'Christian' },
  { ReligionID: 4, ReligionName: 'Other' }
];

export const OccupationMaster = [
  { OccupationID: 1, OccupationName: 'Builder & Developer' },
  { OccupationID: 2, OccupationName: 'Software Engineer' },
  { OccupationID: 3, OccupationName: 'Fisherman' },
  { OccupationID: 4, OccupationName: 'Retired Resident' },
  { OccupationID: 5, OccupationName: 'Daily Wage Laborer' }
];

export const Act = [
  { ActCode: 'IPC', ActDescription: 'Indian Penal Code 1860', ShortName: 'IPC', Active: 1 },
  { ActCode: 'NDPS', ActDescription: 'Narcotic Drugs and Psychotropic Substances Act 1985', ShortName: 'NDPS', Active: 1 },
  { ActCode: 'IT_ACT', ActDescription: 'Information Technology Act 2000', ShortName: 'IT Act', Active: 1 }
];

export const Section = [
  { ActCode: 'IPC', SectionCode: '384', SectionDescription: 'Punishment for extortion', Active: 1 },
  { ActCode: 'IPC', SectionCode: '307', SectionDescription: 'Attempt to murder', Active: 1 },
  { ActCode: 'IPC', SectionCode: '302', SectionDescription: 'Punishment for murder', Active: 1 },
  { ActCode: 'IPC', SectionCode: '457', SectionDescription: 'Lurking house-trespass by night or house-breaking by night', Active: 1 },
  { ActCode: 'NDPS', SectionCode: '20', SectionDescription: 'Contravention in relation to cannabis plant and cannabis', Active: 1 },
  { ActCode: 'IT_ACT', SectionCode: '66D', SectionDescription: 'Cheating by personation by using computer resource', Active: 1 }
];

export const CrimeHeadActSection = [
  { CrimeHeadID: 5, ActCode: 'IPC', SectionCode: '384' },
  { CrimeHeadID: 1, ActCode: 'IPC', SectionCode: '307' },
  { CrimeHeadID: 2, ActCode: 'IT_ACT', SectionCode: '66D' },
  { CrimeHeadID: 3, ActCode: 'NDPS', SectionCode: '20' },
  { CrimeHeadID: 4, ActCode: 'IPC', SectionCode: '457' }
];

export const CaseMaster = [
  {
    CaseMasterID: 1,
    CrimeNo: '104430006202600001', // Conforming to: 1 digit Category (1) + 4 digit Dist (0044) + 4 digit Station (3000) + 4 digit Year (6202) + 5 digit Serial
    CaseNo: '202600001',
    CrimeRegisteredDate: '2026-05-12',
    PolicePersonID: 201,
    PoliceStationID: 1001,
    CaseCategoryID: 1,
    GravityOffenceID: 1,
    CrimeMajorHeadID: 5,
    CrimeMinorHeadID: 51,
    CaseStatusID: 1,
    CourtID: 101,
    IncidentFromDate: '2026-05-11 20:30:00',
    IncidentToDate: '2026-05-11 21:00:00',
    InfoReceivedPSDate: '2026-05-12 09:15:00',
    latitude: 12.988450,
    longitude: 77.592300,
    BriefFacts: 'Extortion call demanding 50 Lakhs from a real estate developer. Threatening calls traced back to a burner SIM card, linked to agents of Suresh Gowda. Site supervisor was physically assaulted as a warning.'
  },
  {
    CaseMasterID: 2,
    CrimeNo: '104430006202600002',
    CaseNo: '202600002',
    CrimeRegisteredDate: '2026-05-28',
    PolicePersonID: 202,
    PoliceStationID: 1002,
    CaseCategoryID: 1,
    GravityOffenceID: 2,
    CrimeMajorHeadID: 2,
    CrimeMinorHeadID: 21,
    CaseStatusID: 1,
    CourtID: 101,
    IncidentFromDate: '2026-05-28 10:15:00',
    IncidentToDate: '2026-05-28 11:30:00',
    InfoReceivedPSDate: '2026-05-28 14:00:00',
    latitude: 12.978500,
    longitude: 77.640200,
    BriefFacts: 'Spoofed email domain mimicking the finance department sent to accounts executive. Induced a wire transfer of 1.2 Crores to a shell account. Money trails converted to cryptocurrency within 45 minutes.'
  },
  {
    CaseMasterID: 3,
    CrimeNo: '304430006202600003',
    CaseNo: '202600003',
    CrimeRegisteredDate: '2026-03-14',
    PolicePersonID: 203,
    PoliceStationID: 1003,
    CaseCategoryID: 1,
    GravityOffenceID: 1,
    CrimeMajorHeadID: 3,
    CrimeMinorHeadID: 31,
    CaseStatusID: 2,
    CourtID: 102,
    IncidentFromDate: '2026-03-13 22:00:00',
    IncidentToDate: '2026-03-14 02:00:00',
    InfoReceivedPSDate: '2026-03-14 05:30:00',
    latitude: 12.871000,
    longitude: 74.843100,
    BriefFacts: 'Targeted raid conducted on a beach shack following a tip-off from student informants. Recovered 5kg MDMA packets hidden in fishing nets. Caught Mohammad Yusuf red-handed.'
  },
  {
    CaseMasterID: 4,
    CrimeNo: '104430006202600004',
    CaseNo: '202600004',
    CrimeRegisteredDate: '2026-04-05',
    PolicePersonID: 204,
    PoliceStationID: 1004,
    CaseCategoryID: 1,
    GravityOffenceID: 2,
    CrimeMajorHeadID: 4,
    CrimeMinorHeadID: 41,
    CaseStatusID: 3,
    CourtID: 101,
    IncidentFromDate: '2026-04-04 18:00:00',
    IncidentToDate: '2026-04-05 06:00:00',
    InfoReceivedPSDate: '2026-04-05 08:30:00',
    latitude: 12.975600,
    longitude: 77.572800,
    BriefFacts: 'Locked house burglary in Majestic sector. The thief bypassed digital security cameras, broke front door lock using professional tools, and escaped with 150g gold ornaments.'
  }
];

export const ComplainantDetails = [
  { ComplainantID: 1, CaseMasterID: 1, ComplainantName: 'K. Srinivasa Rao', AgeYear: 54, OccupationID: 1, ReligionID: 1, CasteID: 1, GenderID: 1 },
  { ComplainantID: 2, CaseMasterID: 2, ComplainantName: 'Priya Sharma', AgeYear: 31, OccupationID: 2, ReligionID: 1, CasteID: 1, GenderID: 2 },
  { ComplainantID: 3, CaseMasterID: 3, ComplainantName: 'Dr. Anand Hegde', AgeYear: 59, OccupationID: 4, ReligionID: 1, CasteID: 1, GenderID: 1 },
  { ComplainantID: 4, CaseMasterID: 4, ComplainantName: 'Lakshmi Rao', AgeYear: 62, OccupationID: 4, ReligionID: 1, CasteID: 1, GenderID: 2 }
];

export const ActSectionAssociation = [
  { CaseMasterID: 1, ActID: 'IPC', SectionID: '384', ActOrderID: 1, SectionOrderID: 1 },
  { CaseMasterID: 1, ActID: 'IPC', SectionID: '307', ActOrderID: 1, SectionOrderID: 2 },
  { CaseMasterID: 2, ActID: 'IT_ACT', SectionID: '66D', ActOrderID: 1, SectionOrderID: 1 },
  { CaseMasterID: 3, ActID: 'NDPS', SectionID: '20', ActOrderID: 1, SectionOrderID: 1 },
  { CaseMasterID: 4, ActID: 'IPC', SectionID: '457', ActOrderID: 1, SectionOrderID: 1 }
];

export const Victim = [
  { VictimMasterID: 1, CaseMasterID: 1, VictimName: 'Manjunath Swamy', AgeYear: 38, GenderID: 1, VictimPolice: '0' },
  { VictimMasterID: 2, CaseMasterID: 2, VictimName: 'Karnataka Power Corporation (KPC)', AgeYear: 0, GenderID: 4, VictimPolice: '0' },
  { VictimMasterID: 3, CaseMasterID: 3, VictimName: 'State of Karnataka (Narcotics threat)', AgeYear: 0, GenderID: 4, VictimPolice: '1' },
  { VictimMasterID: 4, CaseMasterID: 4, VictimName: 'Lakshmi Rao', AgeYear: 62, GenderID: 2, VictimPolice: '0' }
];

export const Accused = [
  { AccusedMasterID: 301, CaseMasterID: 1, AccusedName: 'Suresh Gowda (Alias: Kariya)', AgeYear: 42, GenderID: 1, PersonID: 'A1' },
  { AccusedMasterID: 302, CaseMasterID: 1, AccusedName: 'Prakash Shetty (Alias: Blade)', AgeYear: 36, GenderID: 1, PersonID: 'A2' },
  { AccusedMasterID: 303, CaseMasterID: 2, AccusedName: 'Ramesh Kumar (Alias: Techie)', AgeYear: 29, GenderID: 1, PersonID: 'A1' },
  { AccusedMasterID: 304, CaseMasterID: 3, AccusedName: 'Mohammad Yusuf (Alias: Bhaiya)', AgeYear: 33, GenderID: 1, PersonID: 'A1' },
  { AccusedMasterID: 305, CaseMasterID: 4, AccusedName: 'Anand Murthy (Alias: Chabi)', AgeYear: 48, GenderID: 1, PersonID: 'A1' }
];

export const ArrestSurrender = [
  { ArrestSurrenderID: 501, CaseMasterID: 3, ArrestSurrenderTypeID: 1, ArrestSurrenderDate: '2026-03-14', ArrestSurrenderStateId: 29, ArrestSurrenderDistrictId: 2, PoliceStationID: 1003, IOID: 203, CourtID: 102, AccusedMasterID: 304, IsAccused: 1, IsComplainantAccused: 0 },
  { ArrestSurrenderID: 502, CaseMasterID: 2, ArrestSurrenderTypeID: 1, ArrestSurrenderDate: '2026-06-01', ArrestSurrenderStateId: 29, ArrestSurrenderDistrictId: 1, PoliceStationID: 1002, IOID: 202, CourtID: 101, AccusedMasterID: 303, IsAccused: 1, IsComplainantAccused: 0 },
  { ArrestSurrenderID: 503, CaseMasterID: 1, ArrestSurrenderTypeID: 1, ArrestSurrenderDate: '2026-05-15', ArrestSurrenderStateId: 29, ArrestSurrenderDistrictId: 1, PoliceStationID: 1001, IOID: 201, CourtID: 101, AccusedMasterID: 302, IsAccused: 1, IsComplainantAccused: 0 }
];

export const ChargesheetDetails = [
  { CSID: 801, CaseMasterID: 3, csdate: '2026-04-10 11:00:00', cstype: 'A', PolicePersonID: 203 }
];

// Mapping of table names to their respective array datasets
export const tablesData: Record<string, any[]> = {
  State,
  District,
  Court,
  UnitType,
  Unit,
  Rank,
  Designation,
  Employee,
  CaseCategory,
  GravityOffence,
  CaseStatusMaster,
  CrimeHead,
  CrimeSubHead,
  CasteMaster,
  ReligionMaster,
  OccupationMaster,
  Act,
  Section,
  CrimeHeadActSection,
  CaseMaster,
  ComplainantDetails,
  ActSectionAssociation,
  Victim,
  Accused,
  ArrestSurrender,
  ChargesheetDetails
};

// Help descriptions for each table to be viewed in the Schema Explorer
export const tableMetadata: Record<string, { description: string; columns: { name: string; type: string; key?: 'PK' | 'FK'; description: string }[] }> = {
  State: {
    description: 'Defines the state-level entities referenced across courts, units, and districts.',
    columns: [
      { name: 'StateID', type: 'INT', key: 'PK', description: 'Unique identifier for the state' },
      { name: 'StateName', type: 'VARCHAR', description: 'Name of the state (e.g. Karnataka)' },
      { name: 'NationalityID', type: 'INT', description: 'Nationality reference ID' },
      { name: 'Active', type: 'BIT', description: 'Status flag indicating if state record is active' }
    ]
  },
  District: {
    description: 'District divisions within a state. Referenced by courts, units, and police personnel.',
    columns: [
      { name: 'DistrictID', type: 'INT', key: 'PK', description: 'Unique identifier for the district' },
      { name: 'DistrictName', type: 'VARCHAR', description: 'Name of the district' },
      { name: 'StateID', type: 'INT', key: 'FK', description: 'FK to State table' },
      { name: 'Active', type: 'BIT', description: 'Whether the district is active' }
    ]
  },
  Court: {
    description: 'Courts before which accused persons are produced and trials are heard.',
    columns: [
      { name: 'CourtID', type: 'INT', key: 'PK', description: 'Unique identifier for the court' },
      { name: 'CourtName', type: 'VARCHAR', description: 'Full official name of the court' },
      { name: 'DistrictID', type: 'INT', key: 'FK', description: 'FK to District where court is located' },
      { name: 'StateID', type: 'INT', key: 'FK', description: 'FK to State where court is located' },
      { name: 'Active', type: 'BIT', description: 'Active status of the court' }
    ]
  },
  UnitType: {
    description: 'Categorization of police units (e.g., Police Station, Circle Office, Commissionerate).',
    columns: [
      { name: 'UnitTypeID', type: 'INT', key: 'PK', description: 'Unique identifier for the unit type' },
      { name: 'UnitTypeName', type: 'VARCHAR', description: 'Category name (e.g., Police Station)' },
      { name: 'CityDistState', type: 'VARCHAR', description: 'Administrative scope level' },
      { name: 'Hierarchy', type: 'INT', description: 'Hierarchy level number (lower = higher authority)' },
      { name: 'Active', type: 'BIT', description: 'Active status of unit type' }
    ]
  },
  Unit: {
    description: 'Police offices and stations where cases are filed and officers are assigned.',
    columns: [
      { name: 'UnitID', type: 'INT', key: 'PK', description: 'Unique identifier for the police unit' },
      { name: 'UnitName', type: 'VARCHAR', description: 'Name of the police station/office' },
      { name: 'TypeID', type: 'INT', key: 'FK', description: 'FK to UnitType table' },
      { name: 'ParentUnit', type: 'INT', description: 'Self-reference to parent UnitID for hierarchical structure' },
      { name: 'NationalityID', type: 'INT', description: 'Nationality reference ID' },
      { name: 'StateID', type: 'INT', key: 'FK', description: 'FK to State the unit belongs to' },
      { name: 'DistrictID', type: 'INT', key: 'FK', description: 'FK to District the unit belongs to' },
      { name: 'Active', type: 'BIT', description: 'Whether the unit is currently active' }
    ]
  },
  Rank: {
    description: 'Police ranks defining authority hierarchy within the department (e.g. Constable, Inspector).',
    columns: [
      { name: 'RankID', type: 'INT', key: 'PK', description: 'Unique identifier for the rank' },
      { name: 'RankName', type: 'VARCHAR', description: 'Official rank name' },
      { name: 'Hierarchy', type: 'INT', description: 'Rank level order (lower = higher rank)' },
      { name: 'Active', type: 'BIT', description: 'Active status of rank record' }
    ]
  },
  Designation: {
    description: 'Functional roles assigned to police employees (e.g., Investigating Officer, SHO).',
    columns: [
      { name: 'DesignationID', type: 'INT', key: 'PK', description: 'Unique identifier for designation' },
      { name: 'DesignationName', type: 'VARCHAR', description: 'Title of function role' },
      { name: 'Active', type: 'BIT', description: 'Active status' },
      { name: 'SortOrder', type: 'INT', description: 'Display sort order for user interfaces' }
    ]
  },
  Employee: {
    description: 'Master list of police personnel, officers, and staff members.',
    columns: [
      { name: 'EmployeeID', type: 'INT', key: 'PK', description: 'Unique identifier for employee' },
      { name: 'DistrictID', type: 'INT', key: 'FK', description: 'FK to District where employee is posted' },
      { name: 'UnitID', type: 'INT', key: 'FK', description: 'FK to Unit the employee is assigned to' },
      { name: 'RankID', type: 'INT', key: 'FK', description: 'FK to Rank of employee' },
      { name: 'DesignationID', type: 'INT', key: 'FK', description: 'FK to Designation of employee' },
      { name: 'KGID', type: 'VARCHAR', description: 'Unique Karnataka Government ID number' },
      { name: 'FirstName', type: 'VARCHAR', description: 'First name of the police officer' },
      { name: 'EmployeeDOB', type: 'DATE', description: 'Date of birth of the employee' },
      { name: 'GenderID', type: 'INT', description: 'Gender lookup value' },
      { name: 'BloodGroupID', type: 'INT', description: 'Blood group lookup value' },
      { name: 'PhysicallyChallenged', type: 'BIT', description: 'Flag indicating physical challenge (1=Yes, 0=No)' },
      { name: 'AppointmentDate', type: 'DATE', description: 'Date of appointment to govt service' }
    ]
  },
  CaseCategory: {
    description: 'Broad classifications of incidents registered (e.g., FIR, UDR, Petitioner Enquiry).',
    columns: [
      { name: 'CaseCategoryID', type: 'INT', key: 'PK', description: 'Unique identifier for case category' },
      { name: 'LookupValue', type: 'VARCHAR', description: 'Name of category (e.g., FIR, UDR, PAR)' }
    ]
  },
  GravityOffence: {
    description: 'Gravity classifications determining crime severity rating (e.g., Heinous, Non-Heinous).',
    columns: [
      { name: 'GravityOffenceID', type: 'INT', key: 'PK', description: 'Unique identifier for gravity level' },
      { name: 'LookupValue', type: 'VARCHAR', description: 'Gravity level description' }
    ]
  },
  CaseStatusMaster: {
    description: 'Valid operational status states for an active case or investigation.',
    columns: [
      { name: 'CaseStatusID', type: 'INT', key: 'PK', description: 'Unique identifier for status state' },
      { name: 'CaseStatusName', type: 'VARCHAR', description: 'Status name (e.g., Under Investigation)' }
    ]
  },
  CrimeHead: {
    description: 'Major classifications of criminal offenses (e.g., Crimes Against Body, Cybercrime).',
    columns: [
      { name: 'CrimeHeadID', type: 'INT', key: 'PK', description: 'Unique identifier for major crime head' },
      { name: 'CrimeGroupName', type: 'VARCHAR', description: 'Major crime group name' },
      { name: 'Active', type: 'BIT', description: 'Active status' }
    ]
  },
  CrimeSubHead: {
    description: 'Sub-classifications of offenses falling under a major crime head (e.g. Murder, Phishing).',
    columns: [
      { name: 'CrimeSubHeadID', type: 'INT', key: 'PK', description: 'Unique identifier for crime sub-head' },
      { name: 'CrimeHeadID', type: 'INT', key: 'FK', description: 'FK to parent CrimeHead' },
      { name: 'CrimeHeadName', type: 'VARCHAR', description: 'Name of sub-head (e.g., Murder, Robbery)' },
      { name: 'SeqID', type: 'INT', description: 'Display sort sequence' }
    ]
  },
  CasteMaster: {
    description: 'Lookup table containing caste classifications for complainants.',
    columns: [
      { name: 'caste_master_id', type: 'INT', key: 'PK', description: 'Unique identifier for caste' },
      { name: 'caste_master_name', type: 'VARCHAR', description: 'Caste name' }
    ]
  },
  ReligionMaster: {
    description: 'Lookup table listing religions for demographic charting.',
    columns: [
      { name: 'ReligionID', type: 'INT', key: 'PK', description: 'Unique identifier for religion' },
      { name: 'ReligionName', type: 'VARCHAR', description: 'Religion name (e.g., Hindu, Muslim)' }
    ]
  },
  OccupationMaster: {
    description: 'Lookup table of occupations for complainants and victims.',
    columns: [
      { name: 'OccupationID', type: 'INT', key: 'PK', description: 'Unique identifier for occupation' },
      { name: 'OccupationName', type: 'VARCHAR', description: 'Occupation name (e.g., Builder, Engineer)' }
    ]
  },
  Act: {
    description: 'Legal acts under which offenses are categorized (e.g. Indian Penal Code, NDPS).',
    columns: [
      { name: 'ActCode', type: 'VARCHAR', key: 'PK', description: 'Unique code for the legal act' },
      { name: 'ActDescription', type: 'VARCHAR', description: 'Full description of the act' },
      { name: 'ShortName', type: 'VARCHAR', description: 'Short abbreviation of the act' },
      { name: 'Active', type: 'BIT', description: 'Active status' }
    ]
  },
  Section: {
    description: 'Specific sections within legal acts designating crimes (e.g., Sec 384 of IPC).',
    columns: [
      { name: 'ActCode', type: 'VARCHAR', key: 'FK', description: 'FK to parent ActCode' },
      { name: 'SectionCode', type: 'VARCHAR', description: 'Section number/clause (e.g., 302, 307)' },
      { name: 'SectionDescription', type: 'VARCHAR', description: 'Detailed legal definition of section' },
      { name: 'Active', type: 'BIT', description: 'Active status' }
    ]
  },
  CrimeHeadActSection: {
    description: 'Junction mapping associating major crime heads to specific legal act sections.',
    columns: [
      { name: 'CrimeHeadID', type: 'INT', key: 'FK', description: 'FK to CrimeHead' },
      { name: 'ActCode', type: 'VARCHAR', key: 'FK', description: 'FK to Act' },
      { name: 'SectionCode', type: 'VARCHAR', key: 'FK', description: 'FK to Section' }
    ]
  },
  CaseMaster: {
    description: 'Core table storing central registration records of FIR cases and investigations.',
    columns: [
      { name: 'CaseMasterID', type: 'INT', key: 'PK', description: 'Primary key - unique case ID' },
      { name: 'CrimeNo', type: 'VARCHAR', description: 'Crime Number (Bilingual serial code assigned at station level)' },
      { name: 'CaseNo', type: 'VARCHAR', description: 'Case Number (Year + 5-digit serial, e.g., 202600001)' },
      { name: 'CrimeRegisteredDate', type: 'DATE', description: 'Date the FIR was officially registered' },
      { name: 'PolicePersonID', type: 'INT', key: 'FK', description: 'FK to Employee (Officer who registered FIR)' },
      { name: 'PoliceStationID', type: 'INT', key: 'FK', description: 'FK to Unit (Police Station handling the case)' },
      { name: 'CaseCategoryID', type: 'INT', key: 'FK', description: 'FK to CaseCategory (FIR, UDR, PAR)' },
      { name: 'GravityOffenceID', type: 'INT', key: 'FK', description: 'FK to GravityOffence (Heinous/Non-Heinous)' },
      { name: 'CrimeMajorHeadID', type: 'INT', key: 'FK', description: 'FK to CrimeHead major classification' },
      { name: 'CrimeMinorHeadID', type: 'INT', key: 'FK', description: 'FK to CrimeSubHead minor classification' },
      { name: 'CaseStatusID', type: 'INT', key: 'FK', description: 'FK to CaseStatusMaster (Investigation status)' },
      { name: 'CourtID', type: 'INT', key: 'FK', description: 'FK to Court handling hearings' },
      { name: 'IncidentFromDate', type: 'DATETIME', description: 'Start date and time of incident occurrence' },
      { name: 'IncidentToDate', type: 'DATETIME', description: 'End date and time of incident occurrence' },
      { name: 'InfoReceivedPSDate', type: 'DATETIME', description: 'Time information was received by police station' },
      { name: 'latitude', type: 'DECIMAL', description: 'GPS latitude coordinate of incident location' },
      { name: 'longitude', type: 'DECIMAL', description: 'GPS longitude coordinate of incident location' },
      { name: 'BriefFacts', type: 'NVARCHAR(MAX)', description: 'Text narrative summarizing incident details' }
    ]
  },
  ComplainantDetails: {
    description: 'Demographics and details of the person registering the complaint.',
    columns: [
      { name: 'ComplainantID', type: 'INT', key: 'PK', description: 'Unique identifier for complainant' },
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to associated CaseMaster record' },
      { name: 'ComplainantName', type: 'VARCHAR', description: 'Full name of the complainant' },
      { name: 'AgeYear', type: 'INT', description: 'Age of the complainant in years' },
      { name: 'OccupationID', type: 'INT', key: 'FK', description: 'FK to OccupationMaster' },
      { name: 'ReligionID', type: 'INT', key: 'FK', description: 'FK to ReligionMaster' },
      { name: 'CasteID', type: 'INT', key: 'FK', description: 'FK to CasteMaster' },
      { name: 'GenderID', type: 'INT', description: 'Gender lookup code' }
    ]
  },
  ActSectionAssociation: {
    description: 'Junction linking registered cases to the specific legal act sections invoked.',
    columns: [
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to associated CaseMaster' },
      { name: 'ActID', type: 'VARCHAR', key: 'FK', description: 'FK to Act (ActCode)' },
      { name: 'SectionID', type: 'VARCHAR', key: 'FK', description: 'FK to Section (SectionCode)' },
      { name: 'ActOrderID', type: 'INT', description: 'Display rank/order order of Act in case file' },
      { name: 'SectionOrderID', type: 'INT', description: 'Display rank/order of Section under Act' }
    ]
  },
  Victim: {
    description: 'Master list of victims associated with the registered cases.',
    columns: [
      { name: 'VictimMasterID', type: 'INT', key: 'PK', description: 'Unique identifier for the victim' },
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to associated CaseMaster record' },
      { name: 'VictimName', type: 'VARCHAR', description: 'Full name of the victim' },
      { name: 'AgeYear', type: 'INT', description: 'Age of the victim in years' },
      { name: 'GenderID', type: 'INT', description: 'Gender lookup code' },
      { name: 'VictimPolice', type: 'VARCHAR', description: 'Flag whether victim is a police officer (1=Yes, 0=No)' }
    ]
  },
  Accused: {
    description: 'Master list of accused persons named in the cases.',
    columns: [
      { name: 'AccusedMasterID', type: 'INT', key: 'PK', description: 'Unique identifier for the accused' },
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to associated CaseMaster record' },
      { name: 'AccusedName', type: 'VARCHAR', description: 'Full name of the accused person' },
      { name: 'AgeYear', type: 'INT', description: 'Age of the accused' },
      { name: 'GenderID', type: 'INT', description: 'Gender lookup code' },
      { name: 'PersonID', type: 'VARCHAR', description: 'Accused ordering code (e.g. A1, A2, A3)' }
    ]
  },
  ArrestSurrender: {
    description: 'Records of arrests or voluntary surrenders of accused persons.',
    columns: [
      { name: 'ArrestSurrenderID', type: 'INT', key: 'PK', description: 'Unique identifier for arrest/surrender event' },
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to CaseMaster' },
      { name: 'ArrestSurrenderTypeID', type: 'INT', description: 'Type event: 1=Arrest, 2=Surrender' },
      { name: 'ArrestSurrenderDate', type: 'DATE', description: 'Date the arrest or surrender occurred' },
      { name: 'ArrestSurrenderStateId', type: 'INT', key: 'FK', description: 'FK to State where event occurred' },
      { name: 'ArrestSurrenderDistrictId', type: 'INT', key: 'FK', description: 'FK to District where event occurred' },
      { name: 'PoliceStationID', type: 'INT', key: 'FK', description: 'FK to Unit (PS handling arrest)' },
      { name: 'IOID', type: 'INT', key: 'FK', description: 'FK to Employee (Investigating Officer who made arrest)' },
      { name: 'CourtID', type: 'INT', key: 'FK', description: 'FK to Court accused was produced before' },
      { name: 'AccusedMasterID', type: 'INT', key: 'FK', description: 'FK to Accused' },
      { name: 'IsAccused', type: 'BIT', description: 'Whether the person is primary accused in case' },
      { name: 'IsComplainantAccused', type: 'BIT', description: 'Whether complainant is also listed as accused' }
    ]
  },
  ChargesheetDetails: {
    description: 'Final investigation report filings and chargesheet details submitted to courts.',
    columns: [
      { name: 'CSID', type: 'INT', key: 'PK', description: 'Unique identifier for the chargesheet' },
      { name: 'CaseMasterID', type: 'INT', key: 'FK', description: 'FK to associated CaseMaster' },
      { name: 'csdate', type: 'DATETIME', description: 'Chargesheet submission date' },
      { name: 'cstype', type: 'CHAR', description: 'Final report code: A=Chargesheet, B=False Case, C=Undetected' },
      { name: 'PolicePersonID', type: 'INT', key: 'FK', description: 'FK to Employee (Officer submitting chargesheet)' }
    ]
  }
};
