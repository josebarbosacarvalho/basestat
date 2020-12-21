var readlines = require('n-readlines');
var fs = require('fs');
const { start } = require('repl');
var liner = new readlines('base2.json');
var outputFileName = "etl/createdFiles/contracts.txt";

var i = 0;
var j = 0;
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
var sep = '|';


// for each contract
while (contractLine = liner.next()) {

    i++;
    var contractObject = JSON.parse(contractLine.toString('utf-8'));

    contractObject.records.forEach(function (record) {
        var ocid = record.compiledRelease.ocid;
        var tenderId = record.compiledRelease.tender.id;
        record.compiledRelease.contracts.forEach(function (contract) {
            j++
            var id = "";
            var awardId = "";
            var description = "";
            var status = "";
            var startDate = "";
            var endDate = "";
            var durationInDays = "";
            var maxExtentDate = "";
            var amount = "";
            var currency = "";
            var dateSigned = "";

            if (contract.id != null) {
                id = contract.id.toString();
                id = id.replace(/\|/g, " ");
                id = id.trim();
                id = id.replace(/\r?\n|\r/g, " ");
            }
            if (contract.awardID != null) {
                awardId = contract.awardID;
                awardId = awardId.replace(/\|/g, " ");
                awardId = awardId.trim();
                awardId = awardId.replace(/\r?\n|\r/g, " ");
            }
            if (contract.description != null) {
                description = contract.description;
                description = description.replace(/\|/g, " ");
                description = description.trim();
                description = description.replace(/\r?\n|\r/g, " ");
            }
            if (contract.status != null) {
                status = contract.status;
                status = status.replace(/\|/g, " ");
                status = status.trim();
                status = status.replace(/\r?\n|\r/g, " ");
            }
            if (contract.period.startDate != null) {
                startDate = contract.period.startDate;
                startDate = startDate.replace(/\|/g, " ");
                startDate = startDate.trim();
                startDate = startDate.replace(/\r?\n|\r/g, " ");
                startDate = startDate.replace("T", " ");
                startDate = startDate.replace("Z", "");

            }
            if (contract.period.endDate != null) {
                endDate = contract.period.endDate;
                endDate = endDate.replace(/\|/g, " ");
                endDate = endDate.trim();
                endDate = endDate.replace(/\r?\n|\r/g, " ");
                endDate = endDate.replace("T", " ");
                endDate = endDate.replace("Z", "");
            }
            if (contract.period.durationInDays != null) {
                durationInDays = contract.period.durationInDays;

            }
            if (contract.period.maxExtentDate != null) {
                maxExtentDate = contract.period.maxExtentDate;
                maxEntentDate = maxExtentDate.replace(/\|/g, " ");
                maxExtentDate = maxExtentDate.trim();
                maxEntentDate = maxExtentDate.replace(/\r?\n|\r/g, " ");
                maxExtentDate = maxExtentDate.replace("T", " ");
                maxExtentDate = maxExtentDate.replace("Z", "");
            }
            if (contract.value.amount != null) {
                amount = contract.value.amount;
            }
            if (contract.value.currency != null) {
                currency = contract.value.currency;
                currency = currency.replace(/\|/g, " ");
                currency = currency.trim();
                currency = currency.replace(/\r?\n|\r/g, " ");
            }
            if (contract.dateSigned != null) {
                dateSigned = contract.dateSigned;
                dateSigned = dateSigned.replace(/\|/g, " ");
                dateSigned = dateSigned.trim();
                dateSigned = dateSigned.replace(/\r?\n|\r/g, " ");
                dateSigned = dateSigned.replace("T", " ");
                dateSigned = dateSigned.replace("Z", "");
            }


            var outputLineContract = ocid + sep + tenderId + sep + id + sep + awardId + sep + description + sep + status + sep + startDate + sep + endDate + sep + durationInDays + sep + maxExtentDate + sep + amount + sep + currency + sep + dateSigned + "\r\n";
            fs.writeFileSync(outputFileName, outputLineContract, optionsAfter);

        });



    });
    // JSON file is too large, limit tests to first 100 lines (for testing purposes)
    /*if(i>=100){

        break;
    }*/
}


console.log("Finished: " + j + " contracts");
