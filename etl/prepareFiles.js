const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
    createReadStream,
    createWriteStream
} = require('fs');

const { promisify } = require('util');
const pipe = promisify(pipeline);

async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
}

const folder = "etl/createdFiles/";
const files = ["activities.txt", "awards.txt", "awardsDocuments.txt", "awardsSuppliers.txt", "buyers.txt", "buyers_allCae.txt", "buyers_primarycae.txt", "contracts.txt", "parties.txt", "suppliers.txt", "suppliers_allCae.txt", "suppliers_primarycae.txt", "tenders.txt"];

files.forEach(file => {
    let fileOrigin = folder + file;
    let fileDestination = folder + "final/" + file + ".gz";
    do_gzip(fileOrigin, fileDestination)
        .catch((err) => {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        });


});

