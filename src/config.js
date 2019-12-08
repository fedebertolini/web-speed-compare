const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const DEFAULT_FLAGS = ['--no-sandbox', '--headless', '--incognito'];
const DEFAULT_RUNS = 3;

exports.getConfig = () => {
    const configFile = argv['config-file'];
    if (!configFile) {
        throw new Error('Missing argument: --config-file');
    }
    const file = fs.readFileSync(configFile, 'utf-8');
    const config = JSON.parse(file);
    if (!config.pages || !config.pages.length) {
        throw new Error('Config file must contain a non-empty `pages` array of objects');
    }

    setDefaults(config);
    return config;
};

const setDefaults = config => {
    config.runs = config.runs || DEFAULT_RUNS;
    if (!config.chromeFlags || !config.chromeFlags.length) {
        config.chromeFlags = DEFAULT_FLAGS;
    }
    config.pages.forEach(page => {
        page.blockedPatterns = page.blockedPatterns || [];
        page.name = page.name || `${page.url} - ${page.blockedPatterns.join('|')}`;
    });
};
