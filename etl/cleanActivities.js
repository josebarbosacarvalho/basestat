var readlines = require('n-readlines');
var fs = require('fs');
var inputFileName = "etl/createdFiles/activities.txt";
var outputFileName = "etl/createdFiles/activities2.txt";

var liner = new readlines(inputFileName);

const optionsInitial = {
    enconding: "utf-8",
    flag: "w",
};

const optionsAfter = {
    enconding: "utf-8",
    flag: "a",
};
const sep = "|";

fs.writeFileSync(outputFileName, "", optionsInitial);


// for each activity
while (activity = liner.next()) {
    var line = activity.toString('utf-8');
    var lineSplit = line.split(sep);

    let itemNum = 0;
    let outputText = "";
    for (let item of lineSplit) {
        if (itemNum == 0) {
            let value = parseInt(item, 10);
            outputText += value + sep;
        }
        else if (itemNum == 7) {
            outputText += item;
        }
        else {
            outputText += item + sep;
        }

        itemNum++;
    }
    outputText += "\r\n";

    fs.writeFileSync(outputFileName, outputText, optionsAfter);
}