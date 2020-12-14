var readlines = require('n-readlines');
var fs = require('fs');
var liner = new readlines('base2.json');
var outputFileName = "createdFiles/contracts.txt";

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
var sep = "|";


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
                id = contract.id;
                id = id.replace(sep, " ");
                id = id.replace(/\r?\n|\r/g, " ");
            }
            if (contract.awardID != null) {
                awardId = contract.awardID;
                awardId = awardId.replace(sep, " ");
                awardId = awardId.replace(/\r?\n|\r/g, " ");
            }
            if (contract.description != null) {
                description = contract.description;
                description = description.replace(sep, " ");
                description = description.replace(/\r?\n|\r/g, " ");

            }
            if (contract.status != null) {
                status = contract.status;
                status = status.replace(sep, " ");
                status = status.replace(/\r?\n|\r/g, " ");
            }
            if (contract.period.startDate != null) {
                startDate = contract.period.startDate;
                startDate = startDate.replace(sep, " ");
                startDate = startDate.replace(/\r?\n|\r/g, " ");
            }
            if (contract.period.endDate != null) {
                endDate = contract.period.endDate;
                endDate = endDate.replace(sep, " ");
                endDate = endDate.replace(/\r?\n|\r/g, " ");
            }
            if (contract.period.durationInDays != null) {
                durationInDays = contract.period.durationInDays;

            }
            if (contract.period.maxExtentDate != null) {
                maxExtentDate = contract.period.maxExtentDate;
                maxEntentDate = maxExtentDate.replace(sep, " ");
                maxEntentDate = maxExtentDate.replace(/\r?\n|\r/g, " ");
            }
            if (contract.value.amount != null) {
                amount = contract.value.amount;
            }
            if (contract.value.currency != null) {
                currency = contract.value.currency;
                currency = currency.replace(sep, " ");
                currency = currency.replace(/\r?\n|\r/g, " ");
            }
            if (contract.dateSigned != null) {
                dateSigned = contract.dateSigned;
                dateSigned = dateSigned.replace(sep, " ");
                dateSigned = dateSigned.replace(/\r?\n|\r/g, " ");
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
