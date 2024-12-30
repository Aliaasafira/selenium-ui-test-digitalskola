const { By } = require('selenium-webdriver');

class CheckoutInfoPage {
    constructor(driver){
        this.driver = driver;
        this.firstnameInput = By.id('first-name');
        this.lastnameInput = By.id('last-name');
        this.postalcodeInput = By.id('postal-code');
        this.submitButton = By.id('continue');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/");
    }

    async continue(firstname, lastname, postalcode){
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalcodeInput).sendKeys(postalcode);
        await this.driver.findElement(this.submitButton).click();
    }
}

module.exports = CheckoutInfoPage;