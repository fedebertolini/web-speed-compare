exports.map = result => ({
    firstContentfulPaint: Math.floor(result.audits['first-contentful-paint'].numericValue),
    firstMeaningfulPaint: Math.floor(result.audits['first-meaningful-paint'].numericValue),
    speedIndex: Math.floor(result.audits['speed-index'].numericValue),
    estimatedInputLatency: Math.floor(result.audits['estimated-input-latency'].numericValue),
    totalBlockingTime: Math.floor(result.audits['total-blocking-time'].numericValue),
    maxPotentialFid: Math.floor(result.audits['max-potential-fid'].numericValue),
    timeToFirstByte: Math.floor(result.audits['time-to-first-byte'].numericValue),
    firstCpuIdle: Math.floor(result.audits['first-cpu-idle'].numericValue),
    interactive: Math.floor(result.audits['interactive'].numericValue),
    networkRequests: result.audits['network-requests'].numericValue,
    totalByteWeight: result.audits['total-byte-weight'].numericValue,
    domSize: result.audits['dom-size'].numericValue,
    performanceScore: result.categories.performance.score * 100,
});