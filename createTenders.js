var readlines = require('n-readlines');
var fs = require('fs')
var liner = new readlines('base2.json');
var outputFileName = "createdFiles/tenders.txt";

var i = 0;
var contractLine;

var optionsInitial = {
    enconding: "utf-8",
    flag: "w",
};
fs.writeFileSync(outputFileName, "", optionsInitial);
var optionsAfter = {
    enconding: "utf-8",
    flag: "a",
};

const sep = "|";


// for each contract
while (contractLine = liner.next()) {

    i++;
    var contractObject = JSON.parse(contractLine.toString('utf-8'));
    contractObject.records.forEach(function (record) {
        let ocid = record.compiledRelease.ocid;
        let tender = record.compiledRelease.tender;
        let id = "";
        let description = "";
        let status = "";
        let procurementMethod = "";
        let procurementMethodDetails = "";
        let procurementMethodRationale = "";
        if (tender.id != null) {
            id = tender.id;
            id = id.replace(sep, " ");
            id = id.replace(/\r?\n|\r/g, " ");
        }
        if (tender.description != null) {
            description = tender.description;
            description = description.replace(sep, " ");
            description = description.replace(/\r?\n|\r/g, " ");
        }
        if (tender.status != null) {
            status = tender.status;
            status = status.replace(sep, " ");
            status = status.replace(/\r?\n|\r/g, " ");
        }
        if (tender.procurementMethod != null) {
            procurementMethod = tender.procurementMethod;
            procurementMethod = procurementMethod.replace(sep, " ");
            procurementMethod = procurementMethod.replace(/\r?\n|\r/g, " ");
        }

        if (tender.procurementMethodDetails != null) {
            procurementMethodDetails = tender.procurementMethodDetails;
            procurementMethodDetails = procurementMethodDetails.replace(sep, " ");
            procurementMethodDetails = procurementMethodDetails.replace(/\r?\n|\r/g, " ");
        }
        if (tender.procurementMethodRationale != null) {
            procurementMethodRationale = tender.procurementMethodRationale;
            procurementMethodRationale = procurementMethodRationale.replace(sep, " ");
            procurementMethodRationale = procurementMethodRationale.replace(/\r?\n|\r/g, " ");
        }



        let outputLine = ocid + sep + id + sep + description + sep + status + sep + tender.value.amount + sep + tender.value.currency + sep + procurementMethod + sep + procurementMethodDetails + sep + procurementMethodRationale + sep + tender.numberOfTenderers + "\r\n";
        fs.writeFileSync(outputFileName, outputLine, optionsAfter);


    });
    // JSON file is too large, limit tests to first 100 lines (for testing purposes)
    /*if(i>=100){

        break;
    }*/
}


console.log("Finished: " + i + " tenders");
