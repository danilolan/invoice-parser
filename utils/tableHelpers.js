const XLSX = require('xlsx');

function extractTablesAsSingleTable(sheet) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let combinedTable = [];
    let currentTable = [];
    let startIndex = -1;

    for (let row = range.s.r; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
        const cellValue = sheet[cellAddress]?.v;

        if (cellValue && cellValue.toLowerCase().includes('data')) {
            if (currentTable.length > 0) {
                combinedTable = [...combinedTable, ...currentTable];
                currentTable = [];
            }
            startIndex = row + 1;
            continue;
        }

        if (startIndex !== -1) {
            const rowData = [];
            let isEmpty = true;

            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddr = XLSX.utils.encode_cell({ r: row, c: col });
                const cellVal = sheet[cellAddr]?.v || '';

                if (cellVal !== '') isEmpty = false;
                rowData.push(cellVal);
            }

            if (isEmpty) {
                combinedTable = [...combinedTable, ...currentTable];
                currentTable = [];
                startIndex = -1;
            } else {
                currentTable.push(rowData);
            }
        }
    }

    if (currentTable.length > 0) {
        combinedTable = [...combinedTable, ...currentTable];
    }

    return combinedTable;
}

function aggregateMergedCells(table) {
    let result = [];
    let currentRow = [];
    let currentDate = '';

    for (let i = 0; i < table.length; i++) {
        const row = table[i];

        if (row[0] !== '') {
            // When a new date is found, push the current row to the result and start a new row
            if (currentRow.length > 0) {
                result.push(currentRow);
            }
            currentDate = row[0];
            currentRow = [currentDate, row[1], row[2], row[3].toString()];
        } else {
            // Merge the data from the current row
            currentRow[1] += ' | ' + row[1];
            currentRow[3] += ' | ' + row[3].toString();
        }
    }

    // Add the last merged row
    if (currentRow.length > 0) {
        result.push(currentRow);
    }

    return result;
}

module.exports = { aggregateMergedCells, extractTablesAsSingleTable };
