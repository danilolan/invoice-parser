const config = {
    csv: {
        path: "./outputs/data.csv",
        header: [
            { id: 'date', title: 'Date' },
            { id: 'notes', title: 'Notes' },
            { id: 'amount', title: 'Amount' },
        ],
        rowsId: [0,1,2]
    }
}

module.exports = { config }