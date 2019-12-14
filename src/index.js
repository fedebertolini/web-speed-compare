#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

const runner = require('./runner');
const aggregate = require('./result-aggregation');
const { getConfig } = require('./config');
const report = require('./report');

(async () => {
    try {
        const { pages, runs, chromeFlags } = getConfig();
        const lhOptions = { chromeFlags };

        for (let i = 0; i < runs; i++) {
            console.log(`Run ${i + 1} of ${runs}`);
            for (let j = 0; j < pages.length; j++) {
                const page = pages[j];
                page.results = page.results || [];
                const lhConfig = {
                    extends: 'lighthouse:default',
                    passes: [{ blockedUrlPatterns: page.blockedPatterns }],
                };
                const result = await runner.run(page.url, lhOptions, lhConfig);
                page.results.push(result);
            }
        }

        const results = pages.map(page => ({
            name: page.name,
            metrics: aggregate(page.results),
        }));

        if (argv.output === 'md') {
            report.printMarkdown(results);
        } else {
            report.printConsole(results);
        }
    } catch (error) {
        console.error(error);
    }
})();
