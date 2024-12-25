const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function saucedemologin(){
    //membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");

        //masukkan username & password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        //click button login
        await driver.findElement(By.id('login-button')).click();

        //memastikan user masuk ke dashboard mencari judul Swag Labs
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        //memastikan user dapat click burger button
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        //add to cart
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();

        //memastikan item sukses ditambahkan ke cart
        await driver.findElement(By.className('shopping_cart_link')).click();
        let itemCart = await driver.findElement(By.className('inventory_item_name')).getText();
        assert.strictEqual(itemCart.includes('Sauce Labs Backpack'), true, "Item does not exist on cart");

    } finally {
        await driver.quit();
    }

}

saucedemologin();
