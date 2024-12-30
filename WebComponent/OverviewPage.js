const { By } = require('selenium-webdriver');

class OverviewPage {
    constructor(driver){
        this.driver = driver;
        this.finishButton = By.id('finish');
    }

    async finish_button(){
        await this.driver.findElement(this.finishButton).click();
    }
}

module.exports = OverviewPage;