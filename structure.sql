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
  activityCode VARCHAR(5) NOT NULL,
  activityName VARCHAR8(162) NOT NULL
);

var outputLineContract = ocid + sep + tenderId + sep + id + sep + awardId + sep + description + sep + status + sep + startDate + sep + endDate + sep + durationInDays + sep + maxExtentDate + sep + amount + sep + currency + sep + dateSigned + "\r\n";

CREATE TABLE publicContract
(
  ocid ocid VARCHAR(30) NOT NULL,
  tenderId VARCHAR(20) NOT NULL,
  contractId VARCHAR(12) NOT NULL
  awardId VARCHAR(8) NOT NULL
  description VARCHAR(2000),
  status VARCHAR(360),
  startDate
  endDate
  durationInDays
  maxEntentDate
  amount
  currency
  dateSigned    
);

CREATE TABLE party
(
    
);



CREATE TABLE supplier 
(
  p_partkey     INTEGER NOT NULL,
  p_name        VARCHAR(22) NOT NULL
);

CREATE TABLE supplierMainActivity
(

);

CREATE TABLE supplierAllActivity
(

);

CREATE TABLE tender 
(

);

CREATE TABLE activities 
(

);


