const ttyTable = require('tty-table');
const markdownTable = require('markdown-table');

const metrics = [
    { name: 'performanceScore', value: 'Performance Score' },
    { name: 'firstContentfulPaint', value: 'First Contentful Paint' },
    { name: 'firstMeaningfulPaint', value: 'First Meaningful Paint' },
    { name: 'speedIndex', value: 'Speed Index' },
    { name: 'estimatedInputLatency', value: 'Estimated Input Latency' },
    { name: 'totalBlockingTime', value: 'Total Blocking Time' },
    { name: 'maxPotentialFid', value: 'Max Potential FID' },
    { name: 'timeToFirstByte', value: 'Time To First Byte' },
    { name: 'firstCpuIdle', value: 'First CPU Idle' },
    { name: 'interactive', value: 'Time to Iteractive' },
    { name: 'networkRequests', value: 'NetworkRequests' },
    { name: 'totalByteWeight', value: 'Total Byte Weight' },
    { name: 'domSize', value: 'DOM Size' },
];

const buildTable = results => {
    const header = ['Metric'].concat(results.map(r => r.name));
    const rows = metrics.map(metric => {
        const row = [metric.value];
        results.forEach(result => {
            row.push(result.metrics[metric.name]);
        });
        return row;
    });

    return { header, rows };
};

exports.printConsole = results => {
    const { header, rows } = buildTable(results);
    const ttyHeader = header.map(h => ({ value: h }));

    console.log(ttyTable(ttyHeader, rows).render());
};

exports.printMarkdown = results => {
    const { header, rows } = buildTable(results);
    const options = {
        align: header.map((v, i) => (i === 0 ? 'l' : 'c')),
    };
    const table = markdownTable([header, ...rows], options);
    console.log('\n');
    console.log(table);
};
