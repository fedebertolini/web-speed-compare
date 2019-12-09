#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

const runner = require('./runner');
const aggregate = require('./result-aggregation');
const { getConfig } = require('./config');
const report = require('./report');

const results = [];

(async () => {
    try {
        const { pages, runs, chromeFlags } = getConfig();
        const lhOptions = { chromeFlags };

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const pageResults = [];
            const lhConfig = {
                extends: 'lighthouse:default',
                passes: [{ blockedUrlPatterns: page.blockedPatterns }],
            };

            for (let j = 0; j < runs; j++) {
                console.log(`${page.name} - ${j + 1}/${runs}`);
                const result = await runner.run(page.url, lhOptions, lhConfig);
                pageResults.push(result);
            }

            results.push({
                name: page.name,
                metrics: aggregate(pageResults),
            });
        }

        if (argv.output === 'md') {
            report.printMarkdown(results);
        } else {
            report.printConsole(results);
        }
    } catch (error) {
        console.error(error);
    }
})();
