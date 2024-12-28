const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const CartPage = require('./WebComponent/CartPage');
const CartItemPage = require('./WebComponent/CartItemPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true})
}

describe('TestCase 3', function() {
    this.timeout(40000);
    let driver;

    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
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