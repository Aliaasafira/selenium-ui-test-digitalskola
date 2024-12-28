const { By } = require('selenium-webdriver');

class CartItemPage {
    constructor(driver){
        this.driver = driver;
        this.cartButton = By.css('.shopping_cart_link');
    }

    async cartIcon(){
        await this.driver.findElement(this.cartButton).click();
    }

    async isOnCart(){
        const title1 = await this.driver.findElement(By.className('inventory_item_name'));
        return title1.getText();
    }

}

module.exports = CartItemPage;