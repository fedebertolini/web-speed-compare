module.exports = (resultsArray = []) => {
    if (!resultsArray.length) {
        throw new Error('param `resultsArray` must be an array with at least one element');
    }

    const keys = Object.keys(resultsArray[0]);
    const aggregatedResult = {};

    keys.forEach(key => {
        const values = resultsArray.map(r => r[key]);
        const sortedValues = values.sort(sortNumbers);
        aggregatedResult[key] = median(sortedValues);
    });

    return aggregatedResult;
};

const sortNumbers = (a, b) => a - b;

const median = values => {
    if (values.length === 1) return values[0];
    const half = Math.floor(values.length / 2);
    return values[half];
};
