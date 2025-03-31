function resolveMergedValues(table) {
    function resolveAgglutinatedRow(row) {
        // Check if there are merged values to process
        if (row[3].includes(' | ')) {
            const numericValues = row[3].split(' | ').map(Number);  // Splitting and converting to numbers
            const stringValues = row[1].split(' | ');  // Splitting the string values
    
            const maxNumericValue = Math.max(...numericValues);  // Getting the max numeric value
            const stringValue = stringValues[0] === "dólar de conversão" ? stringValues[1] : stringValues[0]
    
            return [row[0], stringValue, row[2], maxNumericValue];
        }
        // Return the row as it is if it doesn't have agglutinated values
        return row;
    }

    return table.map(row => resolveAgglutinatedRow(row));
}

function format(table){
    const parsedTable = table.map( row => {
        const value = parseFloat(row[3]) 
        if(!value || value === 0) return undefined
        return [
            row[0], 
            row[1], 
            value
        ]
    })

    return parsedTable.filter( item => item != null)
}

module.exports = { resolveMergedValues, format };
