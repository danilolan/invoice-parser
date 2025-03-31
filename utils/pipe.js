function pipe(value, functions) {
    return functions.reduce((acc, func) => func(acc), value);
}

module.exports = { pipe };