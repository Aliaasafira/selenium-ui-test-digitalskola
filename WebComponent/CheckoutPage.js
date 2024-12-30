const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver){
        this.driver = driver;
        this.checkoutButton = By.id('checkout');
    }

    async checkout_button(){
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CheckoutPage;