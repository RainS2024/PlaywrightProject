const {test, expect} = require('@playwright/test');
class CartPage {

constructor(Page){

    this.itemsno = Page.locator("p.itemNumber");
    this.IphnItemNo = Page.locator('.cartSection .itemNumber').first();
    this.IphnTxt = Page.locator("h3:has-text('IPHONE 13 PRO')");
    this.BuyNow=Page.locator('.removeWrap .btn-primary');
    this.Page=Page;

}

async ProductsInCart(){
    await this.itemsno.first().waitFor();
    console.log(await this.itemsno.allTextContents());//extracting item numbers of item in My Cart
    const Itemcount = await this.itemsno.count();
    console.log(Itemcount); //count of items in MyCart
}

async VerifyProductisDisplayed(productName){
    await this.IphnTxt.waitFor();
   const bool = await this.getProductLocator(productName).isVisible();
    //expect(bool).toBeTruthy();
    console.log(bool);
}

getProductLocator(productName){
    return this.Page.locator("h3:has-text('"+productName+"')");
}

async BuyIphn(){
   //checking for visibiltiy of item to buy in the My Cart page 
   console.log(await this.IphnItemNo.textContent());
   const IphnItemNoTxt =await this.IphnItemNo.textContent();
   const Itemcount = await this.itemsno.count();
   
     //For loop to select one item to buy from the list of item in MyCart by matching Itemno.
   for(let i=0;i<Itemcount;++i){
    if(await this.itemsno.nth(i).textContent()=== IphnItemNoTxt)
    await this.BuyNow.nth(i).click();
    break;
}   
await this.Page.waitForLoadState('networkidle');

}
}
module.exports={CartPage};