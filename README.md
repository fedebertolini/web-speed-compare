# web-speed-compare

NodeJS app that runs lighthouse against multiple websites and reports the comparison. This was built with the purpose of assessing the impact of 3rd party scripts on a website, by measuring the website's performance blocking scripts one by one.

## How to use

-   Install it as a global package: `npm i -g web-speed-compare`.
-   Create a json config file based on the [example-config.json file](https://github.com/fedebertolini/web-speed-compare/blob/master/example-config.json).
-   Run the tool: `web-speed-compare --config-file=config.json`.

## Arguments

-   `--config-file` (required): path to the configuration json file.
-   `--output` (optional): by default the tool will print the report in a nice table. You can specify ``--output=md` to print the result in a markdown table.

## Configuration file

Example:

```json
{
    "chromeFlags": ["--no-sandbox", "--headless", "--incognito"],
    "runs": 5,
    "pages": [
        {
            "url": "https://github.com/",
            "name": "Github",
            "blockedPatterns": []
        },
        {
            "url": "https://github.com/",
            "name": "Github w/o spotify image",
            "blockedPatterns": ["*spotify*"]
        }
    ]
}
```

-   `chromeFlags`: array of flags that will be passed to the Chrome launcher.
-   `runs`: number of times the tool will run Lighthouse on each page. The results will show the median of each metric. With a higher number the metrics will be more accurate, but the tool will take longer to run. Defaults to 3.
-   `pages`: array of objects with the information of pages to run the tool against.
    -   `url`: url of the page
    -   `name`: name to be used in the report
    -   `blockedPatterns`: array of strings with patterns of the assets that will be blocked by Chrome. You can use this to block 3rd party scripts and measure the website's performance without them.

## Example

`web-speed-compare --config-file=config.json --output=md`

```
| Metric                  | Google | Google w/o JS | Google w/o icons |
| :---------------------- | :----: | :-----------: | :--------------: |
| Performance Score       |   96   |      100      |        96        |
| First Contentful Paint  |  1245  |      1269     |       1268       |
| First Meaningful Paint  |  1260  |      1272     |       1294       |
| Speed Index             |  1602  |      1480     |       1656       |
| Estimated Input Latency |   42   |       12      |        45        |
| Total Blocking Time     |   312  |       0       |        340       |
| Max Potential FID       |   238  |       48      |        230       |
| Time To First Byte      |   97   |       98      |        92        |
| First CPU Idle          |  3426  |      1272     |       3411       |
| Time to Iteractive      |  3662  |      1272     |       3647       |
| NetworkRequests         |   29   |       10      |        30        |
| Total Byte Weight       | 308711 |     83967     |      305444      |
| DOM Size                |   411  |      388      |        411       |
```
