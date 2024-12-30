const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CartPage = require('../WebComponent/CartPage');
const CartItemPage = require('../WebComponent/CartItemPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const CheckoutInfoPage = require('../WebComponent/CheckoutInfoPage');
const OverviewPage = require('../WebComponent/OverviewPage');
const CompletePage = require('../WebComponent/CompletePage');

const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true})
}

describe('TestCase 4', function() {
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
        const checkoutPage = new CheckoutPage(driver);
        await checkoutPage.checkout_button();
        const infoPage = new CheckoutInfoPage(driver);
        await infoPage.continue('fira', 'abcd', '12345');
        const overviewPage = new OverviewPage(driver);
        await overviewPage.finish_button();
    });

    it('Order Completed', async function () {
        const completePage = new CompletePage(driver);
        const header = await completePage.isComplete();
        assert.strictEqual(header, 'Thank you for your order!', 'Expected complete message not match');
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