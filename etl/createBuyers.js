var readlines = require('n-readlines');
var fs = require('fs')
var liner = new readlines('base2.json');
var outputFileName = "etl/createdFiles/buyers.txt";

var i = 0;
var contractLine;



var buyers = new Map();


// for each contract
while (contractLine = liner.next()) {

    i++;
    var contractObject = JSON.parse(contractLine.toString('utf-8'));
    contractObject.records.forEach(function (record) {
        record.compiledRelease.parties.forEach(function (party) {
            // Return parties that are buyers
            let partyId = party.id;
            if (party.id != null) {
                partyId = partyId.replace(/\|/g, " ");
                partyId = partyId.trim();
                partyId = partyId.replace(/\r?\n|\r/g, " ");
            }

            if (party.roles.find(function (obj) { return obj == 'buyer' })) {

                if (!buyers.has(partyId)) {
                    var buyerNames = new Map();

                    let partyName = party.name;
                    partyName = partyName.replace(/\|/g, " ");
                    partyName = partyName.trim();
                    partyName = partyName.replace(/\r?\n|\r/g, " ");

                    buyerNames.set(partyName, 1);
                    buyers.set(partyId, buyerNames);
                }
                else {
                    // Get existing buyer, and add name occurrence
                    var buyer = buyers.get(partyId);
                    let partyName = party.name;
                    partyName = partyName.replace(/\|/g, " ");
                    partyName = partyName.trim();
                    partyName = partyName.replace(/\r?\n|\r/g, " ");

                    //console.log(buyer);
                    if (!buyer.get(partyName)) {
                        buyer.set(partyName, 1);
                    }
                    else {
                        var count = buyer.get(partyName);
                        count++;
                        buyer.set(partyName, count);
                    }


                }


            }
        });

    });
    // JSON file is too large, limit tests to first 100 lines (for testing purposes)
    /*if(i>100){

        break;
    }*/
}



var optionsInitial = {
    enconding: "utf-8",
    flag: "w",
};
fs.writeFileSync(outputFileName, "", optionsInitial);
var optionsAfter = {
    enconding: "utf-8",
    flag: "a",
};



for (const [key, value] of buyers.entries()) {
    var text = key;
    var countNames = 0;
    var name = "";
    for (const [key2, value2] of value.entries()) {
        if (value2 > countNames) {
            countNames = value2;
            name = key2;
        }
    }
    text += "|" + name + "\r\n";

    fs.writeFileSync(outputFileName, text, optionsAfter);
}


console.log("Finished: " + buyers.size + " buyers");
