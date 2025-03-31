const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { aggregateMergedCells, mergeRowsByFirstElement, extractTablesAsSingleTable } = require("./utils/tableHelpers")
const { resolveMergedValues, format } = require("./utils/parsers")
const { pipe } = require('./utils/pipe');
const { writeTableToCSV } = require('./utils/csv');


const filePath = process.argv[2];

if (!filePath) {
    console.error('Uso: npm start <caminho-do-arquivo-xls>');
    process.exit(1);
}


if (!fs.existsSync(filePath)) {
    console.error('Erro: Arquivo não encontrado.');
    process.exit(1);
}

let sheet

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    sheet = workbook.Sheets[sheetName];
} catch (error) {
    console.error('Erro ao ler o arquivo:', error.message);
}

const processedData = pipe(sheet, [
    extractTablesAsSingleTable,
    aggregateMergedCells,
    resolveMergedValues,
    format,
    writeTableToCSV
]);