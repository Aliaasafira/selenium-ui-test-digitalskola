const { By } = require('selenium-webdriver');

class CompletePage {
    constructor(driver){
        this.driver = driver;
    }

    async isComplete(){
        const header = await this.driver.findElement(By.css('.complete-header'));
        return header.getText();
    }

}

module.exports = CompletePage;