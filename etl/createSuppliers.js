var readlines = require('n-readlines');
var fs = require('fs')
var liner = new readlines('base2.json');
var outputFileName = "createdFiles/suppliers.txt";

var i = 0;
var contractLine;



var suppliers = new Map();


// for each contract
while (contractLine = liner.next()) {

    i++;
    var contractObject = JSON.parse(contractLine.toString('utf-8'));
    contractObject.records.forEach(function (record) {
        record.compiledRelease.parties.forEach(function (party) {
            // Return parties that are suppliers
            if (party.roles.find(function (obj) { return (obj == 'supplier' || obj == "tenderer") })) {

                if (!suppliers.has(party.id)) {
                    var supplierNames = new Map();
                    let partyName = party.name;
                    partyName = partyName.replace(/\|/g, " ");
                    partyName = partyName.trim();
                    partyName = partyName.replace(/\r?\n|\r/g, " ");

                    supplierNames.set(partyName, 1);
                    suppliers.set(party.id, supplierNames);
                }
                else {
                    // Get existing supplier, and add name occurrence
                    var supplier = suppliers.get(party.id);
                    let partyName = party.name;
                    partyName = partyName.replace(/\|/g, " ");
                    partyName = partyName.trim();
                    partyName = partyName.replace(/\r?\n|\r/g, " ");

                    //console.log(supplier);
                    if (!supplier.get(party.name)) {
                        supplier.set(partyName, 1);
                    }
                    else {
                        var count = supplier.get(partyName);
                        count++;
                        supplier.set(partyName, count);
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



for (const [key, value] of suppliers.entries()) {
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


console.log("Finished: " + suppliers.size + " suppliers");
