const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { config } = require('../config');

function writeTableToCSV(table) {
    const csvWriter = createCsvWriter({
        path: config.csv.path,
        header: config.csv.header
    });

    const records = table.map(row => ({
        date: row[config.csv.rowsId[0]],
        notes: row[config.csv.rowsId[1]],
        amount: row[config.csv.rowsId[2]],
    }));

    csvWriter.writeRecords(records)
        .then(() => console.log('CSV file was written successfully.'));
    
        return table
}

module.exports = { writeTableToCSV }