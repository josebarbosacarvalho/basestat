var readlines = require('n-readlines');
var fs = require('fs')
var liner = new readlines('base2.json');
var outputFileName = "createdFiles/buyers.txt";

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
            if (party.roles.find(function (obj) { return obj == 'buyer' })) {

                if (!buyers.has(party.id)) {
                    var buyerNames = new Map();
                    buyerNames.set(party.name, 1);
                    buyers.set(party.id, buyerNames);
                }
                else {
                    // Get existing buyer, and add name occurrence
                    var buyer = buyers.get(party.id);
                    //console.log(buyer);
                    if (!buyer.get(party.name)) {
                        buyer.set(party.name, 1);
                    }
                    else {
                        var count = buyer.get(party.name);
                        count++;
                        buyer.set(party.name, count);
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
