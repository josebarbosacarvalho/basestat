const axios = require('axios').default;
const readlines = require('n-readlines');
const fs = require('fs');
const { parse } = require('node-html-parser');


const serviceURL = "http://www.sicae.pt/Detalhe.aspx?NIPC=";
const inputFile = 'createdFiles/buyers.txt';
const outputFilePrimary = "createdFiles/buyers_primarycae.txt";
const outputFileAll = "createdFiles/buyers_allCae.txt";
const optionsInitial = {
  enconding: "utf-8",
  flag: "w",
};
const optionsAfter = {
  enconding: "utf-8",
  flag: "a",
};

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const getTodosSeries = async function (items) {
  let results = [];
  console.log(items.size);
  for (let [key, value] of items) {
    await delay();
    var urlRequested = serviceURL + key;
    //console.log(urlRequested);
    const res = await axios.get(
      urlRequested
    ).then(res => {
      //console.log(res.status);
      //results.push(res.data);
      if (res.status == 200) {
        console.log(res.config.url);
        var root = parse(res.data);
        var listaCAE = new Map();
        if (root == null)
          return;

        if (root.querySelector(".ClassErro") != null) {
          return;
        }


        if (root.querySelector('#ctl00_MainContent_ipNipc') == null) {
          return;
        }
        else {
          var nipc = root.querySelector('#ctl00_MainContent_ipNipc').getAttribute("value");
          var name = root.querySelector('#ctl00_MainContent_ipFirma').getAttribute("value");

          //Remove strange characters from data
          nipc = nipc.replace(/\|/g, " ");
          nipc = nipc.trim();
          nipc = nipc.replace(/\r?\n|\r/g, " ");

          name = name.replace(/\|/g, " ");
          name = name.trim();
          name = name.replace(/\r?\n|\r/g, " ");

        }

        if (nipc == null || name == null)
          return;

        //Get primary CAE
        const cae = root.querySelectorAll('#letrasCAE');
        var caeKey = "";
        var caeValue = { id: "", text: "" };
        cae.forEach(function (cae_child) {
          // If title is not defined, the key is being returned
          if (!cae_child.getAttribute("title")) {
            caeKey = cae_child.text;
          }
          // If title is defined, the value is being returned
          else {
            caeValue.id = cae_child.text;
            caeValue.text = cae_child.getAttribute("title");
            listaCAE.set(caeKey, caeValue);
            caeKey = "";
            caeValue = { id: "", text: "" };
          }


        });

        // Write CAE Principal
        const sep = "|";
        if (!listaCAE.get("CAE Principal")) {
          // DO NOTHING
        }
        else {

          var text = nipc + sep + name + sep + listaCAE.get("CAE Principal").id + sep + listaCAE.get("CAE Principal").text + "\r\n";
          // MISSING WRITE TO FILE
          fs.writeFileSync(outputFilePrimary, text, optionsAfter);


        }

        // Write CAE All
        var textBase = nipc + sep + name + sep;
        var textAll = "";
        if (!listaCAE.get("CAE Principal")) {
          // DO NOTHING
        }
        else {
          //var textBase = listaCAE.get("CAE Principal").id + sep + listaCAE.get("CAE Principal").text;
          var textAll = "";
          for (let [key, value] of listaCAE) {
            textAll = textBase + key + sep + value.id + sep + value.text + "\r\n";
            fs.writeFileSync(outputFileAll, textAll, optionsAfter);
          }

        }
        //root = null;
        //listaCAE = null;

      }
      else {
        console.log("HTTP error: " + res.status + " URL: " + err.config.url);
      }

    }).catch(err => {
      // Handle Error Here

      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log("Error: " + err.response.status + ": " + err.response.statusText + " URL: " + err.config.url);

      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
      } else {
        // anything else
      }

    });



  }
  return results;
};

function getNIFC(party) {
  var line = party.toString('utf-8');
  var lineSplit = line.split("|");
  var nipc = lineSplit[0];
  return nipc;
}

async function main() {
  //const strings = [1, 2, 3, 4];
  var liner = new readlines(inputFile);
  var parties = new Map();

  fs.writeFileSync(outputFilePrimary, "", optionsInitial);
  fs.writeFileSync(outputFileAll, "", optionsInitial);


  var numberParties = 0;
  while (party = liner.next()) {
    numberParties++;
    if (party != null) {
      var nipc = getNIFC(party);
      console.log(nipc);
      parties.set(nipc, nipc);
    }
  }


  const results = await getTodosSeries(parties);
  console.log(results);

}

main();