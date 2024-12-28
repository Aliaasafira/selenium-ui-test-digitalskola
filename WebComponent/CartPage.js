const { By } = require('selenium-webdriver');

class CartPage{
    constructor(driver){
        this.driver = driver;
        this.addItemButton = By.id('add-to-cart-sauce-labs-backpack');
    }

    async cart(){
        await this.driver.findElement(this.addItemButton).click();
    }
    
}
module.exports = CartPage;