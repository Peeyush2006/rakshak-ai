-- Karnataka Police Department
-- Police FIR System DB Schema (DDL)
-- Database Design Document

-- 1. State Table
CREATE TABLE State (
    StateID INT PRIMARY KEY,
    StateName VARCHAR(100) NOT NULL,
    NationalityID INT NOT NULL,
    Active BIT DEFAULT 1
);

-- 2. District Table
CREATE TABLE District (
    DistrictID INT PRIMARY KEY,
    DistrictName VARCHAR(100) NOT NULL,
    StateID INT,
    Active BIT DEFAULT 1,
    FOREIGN KEY (StateID) REFERENCES State(StateID)
);

-- 3. Court Table
CREATE TABLE Court (
    CourtID INT PRIMARY KEY,
    CourtName VARCHAR(200) NOT NULL,
    DistrictID INT,
    StateID INT,
    Active BIT DEFAULT 1,
    FOREIGN KEY (DistrictID) REFERENCES District(DistrictID),
    FOREIGN KEY (StateID) REFERENCES State(StateID)
);

-- 4. UnitType Table
CREATE TABLE UnitType (
    UnitTypeID INT PRIMARY KEY,
    UnitTypeName VARCHAR(100) NOT NULL, -- e.g. Police Station, Circle Office
    CityDistState VARCHAR(100),
    Hierarchy INT,
    Active BIT DEFAULT 1
);

-- 5. Unit (Police Station/Office) Table
CREATE TABLE Unit (
    UnitID INT PRIMARY KEY,
    UnitName VARCHAR(150) NOT NULL,
    TypeID INT,
    ParentUnit INT,
    NationalityID INT,
    StateID INT,
    DistrictID INT,
    Active BIT DEFAULT 1,
    FOREIGN KEY (TypeID) REFERENCES UnitType(UnitTypeID),
    FOREIGN KEY (ParentUnit) REFERENCES Unit(UnitID),
    FOREIGN KEY (StateID) REFERENCES State(StateID),
    FOREIGN KEY (DistrictID) REFERENCES District(DistrictID)
);

-- 6. Rank Table
CREATE TABLE Rank (
    RankID INT PRIMARY KEY,
    RankName VARCHAR(100) NOT NULL, -- e.g. Constable, Inspector, DSP
    Hierarchy INT,
    Active BIT DEFAULT 1
);

-- 7. Designation Table
CREATE TABLE Designation (
    DesignationID INT PRIMARY KEY,
    DesignationName VARCHAR(100) NOT NULL, -- e.g. Investigating Officer, SHO
    Active BIT DEFAULT 1,
    SortOrder INT
);

-- 8. Employee Table
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    DistrictID INT,
    UnitID INT,
    RankID INT,
    DesignationID INT,
    KGID VARCHAR(50) UNIQUE NOT NULL, -- Karnataka Government ID
    FirstName VARCHAR(100) NOT NULL,
    EmployeeDOB DATE,
    GenderID INT,
    BloodGroupID INT,
    PhysicallyChallenged BIT DEFAULT 0,
    AppointmentDate DATE,
    FOREIGN KEY (DistrictID) REFERENCES District(DistrictID),
    FOREIGN KEY (UnitID) REFERENCES Unit(UnitID),
    FOREIGN KEY (RankID) REFERENCES Rank(RankID),
    FOREIGN KEY (DesignationID) REFERENCES Designation(DesignationID)
);

-- 9. CaseCategory Table
CREATE TABLE CaseCategory (
    CaseCategoryID INT PRIMARY KEY,
    LookupValue VARCHAR(100) NOT NULL -- e.g. FIR, UDR, PAR
);

-- 10. GravityOffence Table
CREATE TABLE GravityOffence (
    GravityOffenceID INT PRIMARY KEY,
    LookupValue VARCHAR(100) NOT NULL -- e.g. Heinous, Non-Heinous
);

-- 11. CaseStatusMaster Table
CREATE TABLE CaseStatusMaster (
    CaseStatusID INT PRIMARY KEY,
    CaseStatusName VARCHAR(100) NOT NULL -- e.g. Under Investigation, Charge Sheeted, Closed
);

-- 12. CrimeHead Table
CREATE TABLE CrimeHead (
    CrimeHeadID INT PRIMARY KEY,
    CrimeGroupName VARCHAR(200) NOT NULL, -- e.g. Crimes Against Body
    Active BIT DEFAULT 1
);

-- 13. CrimeSubHead Table
CREATE TABLE CrimeSubHead (
    CrimeSubHeadID INT PRIMARY KEY,
    CrimeHeadID INT,
    CrimeHeadName VARCHAR(200) NOT NULL, -- Name of the sub-head e.g. Murder, Robbery
    SeqID INT,
    FOREIGN KEY (CrimeHeadID) REFERENCES CrimeHead(CrimeHeadID)
);

-- 14. CasteMaster Table
CREATE TABLE CasteMaster (
    caste_master_id INT PRIMARY KEY,
    caste_master_name VARCHAR(100) NOT NULL
);

-- 15. ReligionMaster Table
CREATE TABLE ReligionMaster (
    ReligionID INT PRIMARY KEY,
    ReligionName VARCHAR(100) NOT NULL
);

-- 16. OccupationMaster Table
CREATE TABLE OccupationMaster (
    OccupationID INT PRIMARY KEY,
    OccupationName VARCHAR(150) NOT NULL
);

-- 17. Act Table
CREATE TABLE Act (
    ActCode VARCHAR(50) PRIMARY KEY, -- e.g. IPC, NDPS
    ActDescription VARCHAR(500),
    ShortName VARCHAR(100),
    Active BIT DEFAULT 1
);

-- 18. Section Table
CREATE TABLE Section (
    ActCode VARCHAR(50),
    SectionCode VARCHAR(50),
    SectionDescription VARCHAR(500),
    Active BIT DEFAULT 1,
    PRIMARY KEY (ActCode, SectionCode),
    FOREIGN KEY (ActCode) REFERENCES Act(ActCode)
);

-- 19. CrimeHeadActSection Table
CREATE TABLE CrimeHeadActSection (
    CrimeHeadID INT,
    ActCode VARCHAR(50),
    SectionCode VARCHAR(50),
    PRIMARY KEY (CrimeHeadID, ActCode, SectionCode),
    FOREIGN KEY (CrimeHeadID) REFERENCES CrimeHead(CrimeHeadID),
    FOREIGN KEY (ActCode, SectionCode) REFERENCES Section(ActCode, SectionCode)
);

-- 20. CaseMaster Table
CREATE TABLE CaseMaster (
    CaseMasterID INT PRIMARY KEY,
    CrimeNo VARCHAR(50) UNIQUE NOT NULL, -- Category + District + Station + Year + Serial
    CaseNo VARCHAR(20) NOT NULL,        -- YYYY + Serial (Last 9 digits of CrimeNo)
    CrimeRegisteredDate DATE NOT NULL,
    PolicePersonID INT,
    PoliceStationID INT,
    CaseCategoryID INT,
    GravityOffenceID INT,
    CrimeMajorHeadID INT,
    CrimeMinorHeadID INT,
    CaseStatusID INT,
    CourtID INT,
    IncidentFromDate DATETIME,
    IncidentToDate DATETIME,
    InfoReceivedPSDate DATETIME,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    BriefFacts NVARCHAR(MAX),
    FOREIGN KEY (PolicePersonID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (PoliceStationID) REFERENCES Unit(UnitID),
    FOREIGN KEY (CaseCategoryID) REFERENCES CaseCategory(CaseCategoryID),
    FOREIGN KEY (GravityOffenceID) REFERENCES GravityOffence(GravityOffenceID),
    FOREIGN KEY (CrimeMajorHeadID) REFERENCES CrimeHead(CrimeHeadID),
    FOREIGN KEY (CrimeMinorHeadID) REFERENCES CrimeSubHead(CrimeSubHeadID),
    FOREIGN KEY (CaseStatusID) REFERENCES CaseStatusMaster(CaseStatusID),
    FOREIGN KEY (CourtID) REFERENCES Court(CourtID)
);

-- 21. ComplainantDetails Table
CREATE TABLE ComplainantDetails (
    ComplainantID INT PRIMARY KEY,
    CaseMasterID INT,
    ComplainantName VARCHAR(200) NOT NULL,
    AgeYear INT,
    OccupationID INT,
    ReligionID INT,
    CasteID INT,
    GenderID INT, -- 1=Male, 2=Female, 3=Other/Transgender
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID),
    FOREIGN KEY (OccupationID) REFERENCES OccupationMaster(OccupationID),
    FOREIGN KEY (ReligionID) REFERENCES ReligionMaster(ReligionID),
    FOREIGN KEY (CasteID) REFERENCES CasteMaster(caste_master_id)
);

-- 22. ActSectionAssociation Table
CREATE TABLE ActSectionAssociation (
    CaseMasterID INT,
    ActID VARCHAR(50),
    SectionID VARCHAR(50),
    ActOrderID INT,
    SectionOrderID INT,
    PRIMARY KEY (CaseMasterID, ActID, SectionID),
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID),
    FOREIGN KEY (ActID, SectionID) REFERENCES Section(ActCode, SectionCode)
);

-- 23. Victim Table
CREATE TABLE Victim (
    VictimMasterID INT PRIMARY KEY,
    CaseMasterID INT,
    VictimName VARCHAR(200) NOT NULL,
    AgeYear INT,
    GenderID INT,
    VictimPolice VARCHAR(10) DEFAULT '0', -- '1' if police, '0' otherwise
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID)
);

-- 24. Accused Table
CREATE TABLE Accused (
    AccusedMasterID INT PRIMARY KEY,
    CaseMasterID INT,
    AccusedName VARCHAR(200) NOT NULL,
    AgeYear INT,
    GenderID INT,
    PersonID VARCHAR(50), -- e.g. A1, A2, A3
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID)
);

-- 25. ArrestSurrender Table
CREATE TABLE ArrestSurrender (
    ArrestSurrenderID INT PRIMARY KEY,
    CaseMasterID INT,
    ArrestSurrenderTypeID INT, -- 1=Arrest, 2=Surrender
    ArrestSurrenderDate DATE,
    ArrestSurrenderStateId INT,
    ArrestSurrenderDistrictId INT,
    PoliceStationID INT,
    IOID INT, -- Investigating Officer ID
    CourtID INT,
    AccusedMasterID INT,
    IsAccused BIT DEFAULT 1,
    IsComplainantAccused BIT DEFAULT 0,
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID),
    FOREIGN KEY (ArrestSurrenderStateId) REFERENCES State(StateID),
    FOREIGN KEY (ArrestSurrenderDistrictId) REFERENCES District(DistrictID),
    FOREIGN KEY (PoliceStationID) REFERENCES Unit(UnitID),
    FOREIGN KEY (IOID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (CourtID) REFERENCES Court(CourtID),
    FOREIGN KEY (AccusedMasterID) REFERENCES Accused(AccusedMasterID)
);

-- 26. ChargesheetDetails Table
CREATE TABLE ChargesheetDetails (
    CSID INT PRIMARY KEY,
    CaseMasterID INT,
    csdate DATETIME NOT NULL,
    cstype CHAR(1) NOT NULL, -- Final report type: A-> Chargesheet, B-> False Case, C-> Undetected
    PolicePersonID INT,
    FOREIGN KEY (CaseMasterID) REFERENCES CaseMaster(CaseMasterID),
    FOREIGN KEY (PolicePersonID) REFERENCES Employee(EmployeeID)
);
