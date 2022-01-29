const puppeteer = require('puppeteer-extra');
const { getGamesAmerica, getGamesEurope, getGamesJapan, getQueriedGamesAmerica, getPrices, getActiveShops } = require('nintendo-switch-eshop');
import {prepareRaw} from './nintendo/prepare-raw.js'
const pako = require('pako');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
var userAgent = require('user-agents');
const puppeteerService = require('./nintendo/crawler')
puppeteer.use(StealthPlugin());




(async () => {
    const browser = await puppeteer.launch({headless: true, args:[ '--disable-web-security', '--disable-site-isolation-trials' ]});
    const page = await browser.newPage();
    await page.setRequestInterception(true)
    // await page.setUserAgent(userAgent.toString())
    // await page.setJavaScriptEnabled(true);
    // await page.setBypassCSP(true)

    // @ts-ignore
    page.on('request', r => {
        r.continue()
    })
    // @ts-ignore
    page.on("response", async r => {
        if (r.url().includes('https://web.np.playstation.com/api/graphql/v1//op?operationName=categoryGridRetrieve')) {
            console.log(await r.json())
        }
    });
    await page.goto('https://store.playstation.com/ru-ru/category/44d8bb20-653e-431e-8ad0-c0a365f68d2f/3');

    // await page.waitForTimeout(10000)

    await browser.close();
})();
