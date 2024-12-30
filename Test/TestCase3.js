const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CartPage = require('../WebComponent/CartPage');
const CartItemPage = require('../WebComponent/CartItemPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true})
}

describe('TestCase 3 [cart] #Regression #Smoke', function() {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome':
        default:  
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    before(async function (){
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
        const cartPage = new CartPage(driver);
        await cartPage.cart();
        const cartitemPage = new CartItemPage(driver);
        await cartitemPage.cartIcon();
    });

    it('Item added to cart and verify cart', async function () {
        const cartitemPage = new CartItemPage(driver);
        const title1 = await cartitemPage.isOnCart();
        assert.strictEqual(title1, 'Sauce Labs Backpack', 'Expected item to be on Cart');
    });

    afterEach(async function (){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
            fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
    });

});