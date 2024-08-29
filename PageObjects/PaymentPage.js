const {test, expect} = require('@playwright/test');
class PaymentPage{

    constructor(Page){
        this.emailDisplayed= Page.locator("label[type='text']");
        this.emailField= Page.locator('.ng-touched');
        this.CountryField=Page.locator('[placeholder*="Select Country"]');
        this.CountryOptions=Page.locator('button.ta-item');
        this.PlcOrdrBtn = Page.locator('.action__submit');


    }

    async VerifyEmailid(Username){
        await expect (this.emailDisplayed).toHaveText(Username);// Assertion to confirm Emailid displayed is correct

    }

    async SelectCountry(Cnt,Country){
        
        // await emailField.fill(email);
        // await CountryField.clear();
         await this.CountryField.pressSequentially(Cnt);//Selecting Country
         await this.CountryOptions.first().waitFor();//Waiting for all the options of Country to be rendered on the page
         const CountriesCount=await this.CountryOptions.count();//Taking count of no. of countries in the option for For loop
         
         //For loop to select the country name from Options
         for(let i=0;i<CountriesCount;++i){
             if(await this.CountryOptions.nth(i).textContent()===Country){
                 await this.CountryOptions.nth(i).click();
                 break;
     
             }
         }
         
    }

    async PlaceOrder(){
        await this.PlcOrdrBtn.click();//Order Placed on click.
    }

}
module.exports={PaymentPage};