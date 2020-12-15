CREATE TABLE award 
(
    ocid VARCHAR(30) NOT NULL,
    tenderId VARCHAR(20) NOT NULL,
    awardId VARCHAR(8) NOT NULL,
    awardDate TIMESTAMPTZ,
    valueAmount FLOAT(24) NOT NULL,
    valueCurrency VARCHAR(3) NOT NULL,
    startDate TIMESTAMPTZ,
    endDate TIMESTAMPTZ,
    durationInDays INTEGER(10) NOT NULL,
    maxEntentDate TIMESTAMPTZ
);

CREATE TABLE awardDocument 
(
    ocid VARCHAR(30) NOT NULL,
    tenderId VARCHAR(20) NOT NULL,
    docId VARCHAR(20) NOT NULL,
    docType VARCHAR(30) NOT NULL,
    docDescription VARCHAR(1000) NOT NULL,
    docUrl VARCHAR(255) NOT NULL,
    docDate TIMESTAMPTZ
    

);


CREATE TABLE awardSupplier 
(
    ocid VARCHAR(30) NOT NULL,
    tenderId VARCHAR(20) NOT NULL,
    valueAmount FLOAT(24) NOT NULL,
    valueCurrency VARCHAR(3) NOT NULL,
    supplierId VARCHAR(40) NOT NULL
);

CREATE TABLE buyer 
(
  partyId VARCHAR(9) NOT NULL,
  partyName VARCHAR(150) NOT NULL
);

CREATE TABLE buyerMainActivity
(
  partyId VARCHAR(9) NOT NULL,
  partyName VARCHAR(150) NOT NULL,
  activityCode VARCHAR(5) NOT NULL,
  activityName VARCHAR8(162) NOT NULL
);

CREATE TABLE buyerAllActivity
(
  partyId VARCHAR(9) NOT NULL,
  partyName VARCHAR(150) NOT NULL,
  activityType VARCHAR(17) NOT NULL,
  activityCode VARCHAR(5) NOT NULL,
  activityName VARCHAR8(162) NOT NULL
);


CREATE TABLE publicContract
(
  ocid VARCHAR(30) NOT NULL,
  tenderId VARCHAR(20) NOT NULL,
  contractId VARCHAR(12) NOT NULL
  awardId VARCHAR(8) NOT NULL
  description VARCHAR(1700),
  status VARCHAR(10) NOT NULL,
  startDate TIMESTAMPTZ,
  endDate TIMESTAMPTZ,
  durationInDays INTEGER(10) NOT NULL,
  maxEntentDate TIMESTAMPTZ,
  amount FLOAT(24) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  dateSigned TIMESTAMPTZ
);

CREATE TABLE party
(
    ocid VARCHAR(30) NOT NULL,
    tenderId VARCHAR(20) NOT NULL,
    partyId VARCHAR(40) NOT NULL,
    role VARCHAR(16) NOT NULL
);

CREATE TABLE supplier 
(
  partyId VARCHAR(40) NOT NULL,
  partyName VARCHAR(155) NOT NULL
);

CREATE TABLE supplierMainActivity
(
  partyId VARCHAR(9) NOT NULL,
  partyName VARCHAR(158) NOT NULL,
  activityCode VARCHAR(5) NOT NULL,
  activityName VARCHAR8(161) NOT NULL
);

CREATE TABLE supplierAllActivity
(
  partyId VARCHAR(9) NOT NULL,
  partyName VARCHAR(158) NOT NULL,
  activityType VARCHAR(17) NOT NULL,
  activityCode VARCHAR(5) NOT NULL,
  activityName VARCHAR8(162) NOT NULL
);

CREATE TABLE tender 
(
  ocid VARCHAR(30) NOT NULL,
  tenderId VARCHAR(20) NOT NULL,
  description VARCHAR(100) NOT NULL,
  status VARCHAR(10) NOT NULL,
  valueAmount FLOAT(24) NOT NULL,
  valueCurrency VARCHAR(3) NOT NULL,
  procurementMethod VARCHAR(10) NOT NULL,
  procurementMethodDetails VARCHAR(10) NOT NULL,
  procurementMethodRationale VARCHAR(10) NOT NULL,
  numberOfTenderers INTEGER(10) NOT NULL  
);

CREATE TABLE activities 
(
  level INTEGER(1) NOT NULL,
  code VARCHAR(5) NOT NULL,
  designation VARCHAR(200) NOT NULL,
  level1 VARCHAR(1) NOT NULL,
  level2 VARCHAR(2) NOT NULL,
  level3 VARCHAR(3) NOT NULL,
  level4 VARCHAR(4) NOT NULL,
  level5 VARCHAR(5) NOT NULL
);


