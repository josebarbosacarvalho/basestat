var readlines = require('n-readlines');
var fs = require('fs')
var liner = new readlines('base2.json');
var outputFileName = "createdFiles/parties.txt";

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
        record.compiledRelease.parties.forEach(function (party) {
            var partyId = party.id;
            party.roles.forEach(function (role) {
                j++;
                var outputLine = ocid + sep + tenderId + sep + partyId + sep + role + "\r\n";
                fs.writeFileSync(outputFileName, outputLine, optionsAfter);
            });





        });



    });
    // JSON file is too large, limit tests to first 100 lines (for testing purposes)
    /*if(i>=700){

        break;
    }*/
}


console.log("Finished: " + i + " contracts. " + j + " parties.");
