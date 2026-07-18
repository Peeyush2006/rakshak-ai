-- Karnataka Police Department
-- Police FIR System Seed Data (DML)
-- Bilingual Dataset (English & Kannada)

-- 1. State
INSERT INTO State (StateID, StateName, NationalityID, Active) VALUES (29, 'Karnataka', 1, 1);
INSERT INTO State (StateID, StateName, NationalityID, Active) VALUES (32, 'Kerala', 1, 1);

-- 2. District
INSERT INTO District (DistrictID, DistrictName, StateID, Active) VALUES (1, 'Bengaluru City', 29, 1);
INSERT INTO District (DistrictID, DistrictName, StateID, Active) VALUES (2, 'Dakshina Kannada', 29, 1);
INSERT INTO District (DistrictID, DistrictName, StateID, Active) VALUES (3, 'Mysuru', 29, 1);

-- 3. Court
INSERT INTO Court (CourtID, CourtName, DistrictID, StateID, Active) VALUES (101, 'City Civil Court Bengaluru', 1, 29, 1);
INSERT INTO Court (CourtID, CourtName, DistrictID, StateID, Active) VALUES (102, 'District Sessions Court Mangaluru', 2, 29, 1);
INSERT INTO Court (CourtID, CourtName, DistrictID, StateID, Active) VALUES (103, 'District Court Mysuru', 3, 29, 1);

-- 4. UnitType
INSERT INTO UnitType (UnitTypeID, UnitTypeName, CityDistState, Hierarchy, Active) VALUES (1, 'Police Station', 'City/District', 3, 1);
INSERT INTO UnitType (UnitTypeID, UnitTypeName, CityDistState, Hierarchy, Active) VALUES (2, 'Circle Office', 'District', 2, 1);
INSERT INTO UnitType (UnitTypeID, UnitTypeName, CityDistState, Hierarchy, Active) VALUES (3, 'Commissionerate', 'City/State', 1, 1);

-- 5. Unit (Police Stations)
INSERT INTO Unit (UnitID, UnitName, TypeID, ParentUnit, NationalityID, StateID, DistrictID, Active) VALUES (1001, 'Vasant Nagar Police Station', 1, NULL, 1, 29, 1, 1);
INSERT INTO Unit (UnitID, UnitName, TypeID, ParentUnit, NationalityID, StateID, DistrictID, Active) VALUES (1002, 'Indiranagar Police Station', 1, NULL, 1, 29, 1, 1);
INSERT INTO Unit (UnitID, UnitName, TypeID, ParentUnit, NationalityID, StateID, DistrictID, Active) VALUES (1003, 'Ullal Police Station', 1, NULL, 1, 29, 2, 1, 1);
INSERT INTO Unit (UnitID, UnitName, TypeID, ParentUnit, NationalityID, StateID, DistrictID, Active) VALUES (1004, 'Majestic Police Station', 1, NULL, 1, 29, 1, 1);

-- 6. Rank
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (1, 'Police Constable', 6, 1);
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (2, 'Police Sub-Inspector', 5, 1);
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (3, 'Inspector of Police', 4, 1);
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (4, 'Deputy Superintendent of Police', 3, 1);
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (5, 'Assistant Commissioner of Police', 2, 1);
INSERT INTO Rank (RankID, RankName, Hierarchy, Active) VALUES (6, 'Commissioner of Police', 1, 1);

-- 7. Designation
INSERT INTO Designation (DesignationID, DesignationName, Active, SortOrder) VALUES (1, 'Station House Officer (SHO)', 1, 1);
INSERT INTO Designation (DesignationID, DesignationName, Active, SortOrder) VALUES (2, 'Investigating Officer (IO)', 1, 2);
INSERT INTO Designation (DesignationID, DesignationName, Active, SortOrder) VALUES (3, 'Field Officer', 1, 3);
INSERT INTO Designation (DesignationID, DesignationName, Active, SortOrder) VALUES (4, 'Beat Patrol Head', 1, 4);

-- 8. Employee (Police Personnel)
INSERT INTO Employee (EmployeeID, DistrictID, UnitID, RankID, DesignationID, KGID, FirstName, EmployeeDOB, GenderID, BloodGroupID, PhysicallyChallenged, AppointmentDate) 
VALUES (201, 1, 1001, 5, 2, 'KGID-1998-00214', 'Pradeep Rao', '1975-04-12', 1, 2, 0, '1998-06-15');
INSERT INTO Employee (EmployeeID, DistrictID, UnitID, RankID, DesignationID, KGID, FirstName, EmployeeDOB, GenderID, BloodGroupID, PhysicallyChallenged, AppointmentDate) 
VALUES (202, 1, 1002, 3, 1, 'KGID-2005-01048', 'Veena Patil', '1981-11-23', 2, 1, 0, '2005-09-01');
INSERT INTO Employee (EmployeeID, DistrictID, UnitID, RankID, DesignationID, KGID, FirstName, EmployeeDOB, GenderID, BloodGroupID, PhysicallyChallenged, AppointmentDate) 
VALUES (203, 2, 1003, 4, 2, 'KGID-2000-00891', 'Sharanappa Gowda', '1977-08-05', 1, 3, 0, '2000-02-18');
INSERT INTO Employee (EmployeeID, DistrictID, UnitID, RankID, DesignationID, KGID, FirstName, EmployeeDOB, GenderID, BloodGroupID, PhysicallyChallenged, AppointmentDate) 
VALUES (204, 1, 1004, 2, 2, 'KGID-2012-00566', 'Rajesh Kumar', '1988-02-14', 1, 4, 0, '2012-07-20');

-- 9. CaseCategory
INSERT INTO CaseCategory (CaseCategoryID, LookupValue) VALUES (1, 'FIR (First Information Report)');
INSERT INTO CaseCategory (CaseCategoryID, LookupValue) VALUES (2, 'UDR (Un-natural Death Report)');
INSERT INTO CaseCategory (CaseCategoryID, LookupValue) VALUES (3, 'Zero FIR');
INSERT INTO CaseCategory (CaseCategoryID, LookupValue) VALUES (4, 'PAR (Petitioner Enquiry)');

-- 10. GravityOffence
INSERT INTO GravityOffence (GravityOffenceID, LookupValue) VALUES (1, 'Heinous');
INSERT INTO GravityOffence (GravityOffenceID, LookupValue) VALUES (2, 'Non-Heinous');

-- 11. CaseStatusMaster
INSERT INTO CaseStatusMaster (CaseStatusID, CaseStatusName) VALUES (1, 'Under Investigation');
INSERT INTO CaseStatusMaster (CaseStatusID, CaseStatusName) VALUES (2, 'Closed (Charge Sheeted)');
INSERT INTO CaseStatusMaster (CaseStatusID, CaseStatusName) VALUES (3, 'Cold Case (Undetected)');

-- 12. CrimeHead
INSERT INTO CrimeHead (CrimeHeadID, CrimeGroupName, Active) VALUES (1, 'Crimes Against Body', 1);
INSERT INTO CrimeHead (CrimeHeadID, CrimeGroupName, Active) VALUES (2, 'Cybercrime', 1);
INSERT INTO CrimeHead (CrimeHeadID, CrimeGroupName, Active) VALUES (3, 'Drug Trafficking', 1);
INSERT INTO CrimeHead (CrimeHeadID, CrimeGroupName, Active) VALUES (4, 'Property Theft & House Burglary', 1);
INSERT INTO CrimeHead (CrimeHeadID, CrimeGroupName, Active) VALUES (5, 'Extortion', 1);

-- 13. CrimeSubHead
INSERT INTO CrimeSubHead (CrimeSubHeadID, CrimeHeadID, CrimeHeadName, SeqID) VALUES (11, 1, 'Murder', 1);
INSERT INTO CrimeSubHead (CrimeSubHeadID, CrimeHeadID, CrimeHeadName, SeqID) VALUES (21, 2, 'Phishing & Wire Fraud', 1);
INSERT INTO CrimeSubHead (CrimeSubHeadID, CrimeHeadID, CrimeHeadName, SeqID) VALUES (31, 3, 'MDMA Sale & Distribution', 1);
INSERT INTO CrimeSubHead (CrimeSubHeadID, CrimeHeadID, CrimeHeadName, SeqID) VALUES (41, 4, 'Locked House Burglary', 1);
INSERT INTO CrimeSubHead (CrimeSubHeadID, CrimeHeadID, CrimeHeadName, SeqID) VALUES (51, 5, 'Construction Protection Demands', 1);

-- 14. CasteMaster
INSERT INTO CasteMaster (caste_master_id, caste_master_name) VALUES (1, 'General');
INSERT INTO CasteMaster (caste_master_id, caste_master_name) VALUES (2, 'OBC');
INSERT INTO CasteMaster (caste_master_id, caste_master_name) VALUES (3, 'SC');
INSERT INTO CasteMaster (caste_master_id, caste_master_name) VALUES (4, 'ST');

-- 15. ReligionMaster
INSERT INTO ReligionMaster (ReligionID, ReligionName) VALUES (1, 'Hindu');
INSERT INTO ReligionMaster (ReligionID, ReligionName) VALUES (2, 'Muslim');
INSERT INTO ReligionMaster (ReligionID, ReligionName) VALUES (3, 'Christian');
INSERT INTO ReligionMaster (ReligionID, ReligionName) VALUES (4, 'Other');

-- 16. OccupationMaster
INSERT INTO OccupationMaster (OccupationID, OccupationName) VALUES (1, 'Builder & Developer');
INSERT INTO OccupationMaster (OccupationID, OccupationName) VALUES (2, 'Software Engineer');
INSERT INTO OccupationMaster (OccupationID, OccupationName) VALUES (3, 'Fisherman');
INSERT INTO OccupationMaster (OccupationID, OccupationName) VALUES (4, 'Retired Resident');
INSERT INTO OccupationMaster (OccupationID, OccupationName) VALUES (5, 'Daily Wage Laborer');

-- 17. Act
INSERT INTO Act (ActCode, ActDescription, ShortName, Active) VALUES ('IPC', 'Indian Penal Code 1860', 'IPC', 1);
INSERT INTO Act (ActCode, ActDescription, ShortName, Active) VALUES ('NDPS', 'Narcotic Drugs and Psychotropic Substances Act 1985', 'NDPS', 1);
INSERT INTO Act (ActCode, ActDescription, ShortName, Active) VALUES ('IT_ACT', 'Information Technology Act 2000', 'IT Act', 1);

-- 18. Section
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IPC', '384', 'Punishment for extortion', 1);
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IPC', '307', 'Attempt to murder', 1);
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IPC', '302', 'Punishment for murder', 1);
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IPC', '457', 'Lurking house-trespass by night or house-breaking by night', 1);
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('NDPS', '20', 'Contravention in relation to cannabis plant and cannabis', 1);
INSERT INTO Section (ActCode, SectionCode, SectionDescription, Active) VALUES ('IT_ACT', '66D', 'Cheating by personation by using computer resource', 1);

-- 19. CrimeHeadActSection
INSERT INTO CrimeHeadActSection (CrimeHeadID, ActCode, SectionCode) VALUES (5, 'IPC', '384');
INSERT INTO CrimeHeadActSection (CrimeHeadID, ActCode, SectionCode) VALUES (1, 'IPC', '307');
INSERT INTO CrimeHeadActSection (CrimeHeadID, ActCode, SectionCode) VALUES (2, 'IT_ACT', '66D');
INSERT INTO CrimeHeadActSection (CrimeHeadID, ActCode, SectionCode) VALUES (3, 'NDPS', '20');
INSERT INTO CrimeHeadActSection (CrimeHeadID, ActCode, SectionCode) VALUES (4, 'IPC', '457');

-- 20. CaseMaster
INSERT INTO CaseMaster (CaseMasterID, CrimeNo, CaseNo, CrimeRegisteredDate, PolicePersonID, PoliceStationID, CaseCategoryID, GravityOffenceID, CrimeMajorHeadID, CrimeMinorHeadID, CaseStatusID, CourtID, IncidentFromDate, IncidentToDate, InfoReceivedPSDate, latitude, longitude, BriefFacts)
VALUES (
    1, 
    '100011001202600001', 
    '202600001', 
    '2026-05-12', 
    201, 1001, 1, 1, 5, 51, 1, 101, 
    '2026-05-11 20:30:00', '2026-05-11 21:00:00', '2026-05-12 09:15:00', 
    12.988450, 77.592300, 
    'Extortion call demanding 50 Lakhs from a real estate developer. Threatening calls traced back to a burner SIM card, linked to agents of Suresh Gowda. Site supervisor was physically assaulted as a warning.'
);

INSERT INTO CaseMaster (CaseMasterID, CrimeNo, CaseNo, CrimeRegisteredDate, PolicePersonID, PoliceStationID, CaseCategoryID, GravityOffenceID, CrimeMajorHeadID, CrimeMinorHeadID, CaseStatusID, CourtID, IncidentFromDate, IncidentToDate, InfoReceivedPSDate, latitude, longitude, BriefFacts)
VALUES (
    2, 
    '100011002202600002', 
    '202600002', 
    '2026-05-28', 
    202, 1002, 1, 2, 2, 21, 1, 101, 
    '2026-05-28 10:15:00', '2026-05-28 11:30:00', '2026-05-28 14:00:00', 
    12.978500, 77.640200, 
    'Spoofed email domain mimicking the finance department sent to accounts executive. Induced a wire transfer of 1.2 Crores to a shell account. Money trails converted to cryptocurrency within 45 minutes.'
);

INSERT INTO CaseMaster (CaseMasterID, CrimeNo, CaseNo, CrimeRegisteredDate, PolicePersonID, PoliceStationID, CaseCategoryID, GravityOffenceID, CrimeMajorHeadID, CrimeMinorHeadID, CaseStatusID, CourtID, IncidentFromDate, IncidentToDate, InfoReceivedPSDate, latitude, longitude, BriefFacts)
VALUES (
    3, 
    '100021003202600003', 
    '202600003', 
    '2026-03-14', 
    203, 1003, 1, 1, 3, 31, 2, 102, 
    '2026-03-13 22:00:00', '2026-03-14 02:00:00', '2026-03-14 05:30:00', 
    12.871000, 74.843100, 
    'Targeted raid conducted on a beach shack following a tip-off from student informants. Recovered 5kg MDMA packets hidden in fishing nets. Caught Mohammad Yusuf red-handed.'
);

INSERT INTO CaseMaster (CaseMasterID, CrimeNo, CaseNo, CrimeRegisteredDate, PolicePersonID, PoliceStationID, CaseCategoryID, GravityOffenceID, CrimeMajorHeadID, CrimeMinorHeadID, CaseStatusID, CourtID, IncidentFromDate, IncidentToDate, InfoReceivedPSDate, latitude, longitude, BriefFacts)
VALUES (
    4, 
    '100011004202600004', 
    '202600004', 
    '2026-04-05', 
    204, 1004, 1, 2, 4, 41, 3, 101, 
    '2026-04-04 18:00:00', '2026-04-05 06:00:00', '2026-04-05 08:30:00', 
    12.975600, 77.572800, 
    'Locked house burglary in Majestic sector. The thief bypassed digital security cameras, broke front door lock using professional tools, and escaped with 150g gold ornaments.'
);

-- 21. ComplainantDetails
-- (ComplainantID, CaseMasterID, ComplainantName, AgeYear, OccupationID, ReligionID, CasteID, GenderID)
INSERT INTO ComplainantDetails (ComplainantID, CaseMasterID, ComplainantName, AgeYear, OccupationID, ReligionID, CasteID, GenderID)
VALUES (1, 1, 'K. Srinivasa Rao', 54, 1, 1, 1, 1);
INSERT INTO ComplainantDetails (ComplainantID, CaseMasterID, ComplainantName, AgeYear, OccupationID, ReligionID, CasteID, GenderID)
VALUES (2, 2, 'Priya Sharma', 31, 2, 1, 1, 2);
INSERT INTO ComplainantDetails (ComplainantID, CaseMasterID, ComplainantName, AgeYear, OccupationID, ReligionID, CasteID, GenderID)
VALUES (3, 3, 'Dr. Anand Hegde', 59, 4, 1, 1, 1);
INSERT INTO ComplainantDetails (ComplainantID, CaseMasterID, ComplainantName, AgeYear, OccupationID, ReligionID, CasteID, GenderID)
VALUES (4, 4, 'Lakshmi Rao', 62, 4, 1, 1, 2);

-- 22. ActSectionAssociation
-- (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID)
INSERT INTO ActSectionAssociation (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID) VALUES (1, 'IPC', '384', 1, 1);
INSERT INTO ActSectionAssociation (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID) VALUES (1, 'IPC', '307', 1, 2);
INSERT INTO ActSectionAssociation (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID) VALUES (2, 'IT_ACT', '66D', 1, 1);
INSERT INTO ActSectionAssociation (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID) VALUES (3, 'NDPS', '20', 1, 1);
INSERT INTO ActSectionAssociation (CaseMasterID, ActID, SectionID, ActOrderID, SectionOrderID) VALUES (4, 'IPC', '457', 1, 1);

-- 23. Victim
-- (VictimMasterID, CaseMasterID, VictimName, AgeYear, GenderID, VictimPolice)
INSERT INTO Victim (VictimMasterID, CaseMasterID, VictimName, AgeYear, GenderID, VictimPolice)
VALUES (1, 1, 'Manjunath Swamy', 38, 1, '0');
INSERT INTO Victim (VictimMasterID, CaseMasterID, VictimName, AgeYear, GenderID, VictimPolice)
VALUES (2, 2, 'Karnataka Power Corporation (KPC)', 0, 4, '0');
INSERT INTO Victim (VictimMasterID, CaseMasterID, VictimName, AgeYear, GenderID, VictimPolice)
VALUES (3, 3, 'State of Karnataka (Narcotic Threat)', 0, 4, '1');
INSERT INTO Victim (VictimMasterID, CaseMasterID, VictimName, AgeYear, GenderID, VictimPolice)
VALUES (4, 4, 'Lakshmi Rao', 62, 2, '0');

-- 24. Accused
-- (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
INSERT INTO Accused (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
VALUES (301, 1, 'Suresh Gowda (Alias: Kariya)', 42, 1, 'A1');
INSERT INTO Accused (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
VALUES (302, 1, 'Prakash Shetty (Alias: Blade)', 36, 1, 'A2');
INSERT INTO Accused (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
VALUES (303, 2, 'Ramesh Kumar (Alias: Techie)', 29, 1, 'A1');
INSERT INTO Accused (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
VALUES (304, 3, 'Mohammad Yusuf (Alias: Bhaiya)', 33, 1, 'A1');
INSERT INTO Accused (AccusedMasterID, CaseMasterID, AccusedName, AgeYear, GenderID, PersonID)
VALUES (305, 4, 'Anand Murthy (Alias: Chabi)', 48, 1, 'A1');

-- 25. ArrestSurrender
-- (ArrestSurrenderID, CaseMasterID, ArrestSurrenderTypeID, ArrestSurrenderDate, ArrestSurrenderStateId, ArrestSurrenderDistrictId, PoliceStationID, IOID, CourtID, AccusedMasterID, IsAccused, IsComplainantAccused)
INSERT INTO ArrestSurrender (ArrestSurrenderID, CaseMasterID, ArrestSurrenderTypeID, ArrestSurrenderDate, ArrestSurrenderStateId, ArrestSurrenderDistrictId, PoliceStationID, IOID, CourtID, AccusedMasterID, IsAccused, IsComplainantAccused)
VALUES (501, 3, 1, '2026-03-14', 29, 2, 1003, 203, 102, 304, 1, 0);
INSERT INTO ArrestSurrender (ArrestSurrenderID, CaseMasterID, ArrestSurrenderTypeID, ArrestSurrenderDate, ArrestSurrenderStateId, ArrestSurrenderDistrictId, PoliceStationID, IOID, CourtID, AccusedMasterID, IsAccused, IsComplainantAccused)
VALUES (502, 2, 1, '2026-06-01', 29, 1, 1002, 202, 101, 303, 1, 0);
INSERT INTO ArrestSurrender (ArrestSurrenderID, CaseMasterID, ArrestSurrenderTypeID, ArrestSurrenderDate, ArrestSurrenderStateId, ArrestSurrenderDistrictId, PoliceStationID, IOID, CourtID, AccusedMasterID, IsAccused, IsComplainantAccused)
VALUES (503, 1, 1, '2026-05-15', 29, 1, 1001, 201, 101, 302, 1, 0);

-- 26. ChargesheetDetails
-- (CSID, CaseMasterID, csdate, cstype, PolicePersonID)
INSERT INTO ChargesheetDetails (CSID, CaseMasterID, csdate, cstype, PolicePersonID)
VALUES (801, 3, '2026-04-10 11:00:00', 'A', 203);
