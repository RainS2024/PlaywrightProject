const {test, expect} = require('@playwright/test');
class OrderRvwPage{

    constructor(Page){
        this.confirmTxt= Page.locator('.hero-primary');
        this.OrderID = Page.locator('label.ng-star-inserted');
        this.OrdersBtn = Page.locator('button[routerlink*="/dashboard/myorders"]');
        this.Tablebody= Page.locator("tbody");
        this.Tablerow= Page.locator("tbody tr");
        this.OrderSummary =Page.locator('div.email-title');
        this.SummaryID=Page.locator('div.col-text');
        this.Page=Page;
        
    }

async OrderConfirmation(){
console.log(await this.confirmTxt.textContent()); //Order Confirmation Text
const OrderidGenerated = await this.OrderID.textContent();
console.log(OrderidGenerated);//Extracted OrderId No.
await this.OrdersBtn.click();
await this.Tablebody.waitFor();
const RowCount = await this.Tablerow.count();
console.log(RowCount);
for(let i=0;i<RowCount;++i){
    const OrderidCart = await this.Tablerow.nth(i).locator('th').textContent();
    if (await OrderidGenerated.includes(OrderidCart)){
        await this.Tablerow.nth(i).locator('td .btn-primary').click();
        break;
    }       
 
    console.log(await this.OrderSummary.textContent());
    const FinalID= await this.SummaryID.textContent();
    console.log (FinalID);
    expect(OrderidGenerated.includes(FinalID)).toBeTruthy();


}
}}

module.exports={OrderRvwPage};