const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const mapper = require('./result-mapper');

exports.run = async (url, options, config = null) => {
    let chrome;
    try {
        chrome = await chromeLauncher.launch(options);
        options.port = chrome.port;
        const { lhr } = await lighthouse(url, options, config);
        await chrome.kill();
        return mapper.map(lhr);
    } catch (error) {
        if (chrome) {
            chrome.kill();
        }
        return Promise.reject(error);
    }
};
