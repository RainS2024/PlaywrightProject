const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test ('Product Shopping Test', async ({browser})=>
{
const context= await browser.newContext();
const Page = await context.newPage();
const prod = Page.locator('.card-body>h5>b');
const prodcat=Page.locator('.card-body');
const ProdName1= "IPHONE 13 PRO";
const ProdName2= "ZARA COAT 3";
await Page.goto("https://rahulshettyacademy.com/client/");
    await Page.locator('#userEmail').fill("garima.symbiosis@gmail.com");
    await Page.locator('#userPassword').fill("PracticeJS@2024");
    await Page.locator('#login').click();
    console.log(await Page.title());
    const heading = await Page.locator('h3').nth(0).textContent();
    console.log(heading);
    //await expect(Page).toHaveTitle('GreenKart - veg and fruits karts');
    //Page.pause();
    await prod.first().waitFor(); //waiting for fist product helps till the page is stable
    console.log(await prod.allTextContents());//lists all the items from the product list
    const noofitems = await prod.count();
    console.log(noofitems);

//Selection of item and adding to cart - 2 items selected with for loop iteration
    for(let i=0;i<noofitems;++i){
        if(await prod.nth(i).textContent()===ProdName1)
        {
            await prodcat.nth(i).locator("text= Add To Cart").click();
            break;
        }
        }
        for(let i=0;i<noofitems;++i){
            if(await prod.nth(i).textContent()===ProdName2)
            {
                await prodcat.nth(i).locator("text= Add To Cart").click();
                break;
            }
            }
   
    const addtocart=Page.locator('[routerlink*="/dashboard/cart"]');
    await addtocart.click();
 
    // My Cart Page
    const itemsno = Page.locator("p.itemNumber");
    const IphnItemNo = await Page.locator('.cartSection .itemNumber').first().textContent();
   await itemsno.first().waitFor();
   console.log(await itemsno.allTextContents());//extracting item numbers of item in My Cart
   const Itemcount = await itemsno.count();
   console.log(Itemcount); //count of items in MyCart
   
  
   //checking for visibiltiy of item to buy in the My Cart page

   const bool = await Page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
   expect(bool).toBeTruthy();
   const BuyNow=Page.locator('.removeWrap .btn-primary');

    //For loop to select one item to buy from the list of item in MyCart by matching Itemno.

   for(let i=0;i<Itemcount;++i){
        if(await itemsno.nth(i).textContent()===IphnItemNo)
        await BuyNow.nth(i).click();
        break;

    }

    //Payment Page

    const emailDisplayed= Page.locator("label[type='text']");
    const email="garima.symbiosis@gmail.com";
    const emailField= Page.locator('.ng-touched');
    const CountryField=Page.locator('[placeholder*="Select Country"]');
    const CountryOptions=Page.locator('button.ta-item');
    const PlcOrdrBtn = Page.locator('.action__submit');

    await expect (emailDisplayed).toHaveText(email);// Assertion to confirm Emailid displayed is correct
   // await emailField.fill(email);
   // await CountryField.clear();
    await CountryField.pressSequentially("Ind");//Selecting Country
    await CountryOptions.first().waitFor();//Waiting for all the options of Country to be rendered on the page
    const CountriesCount=await CountryOptions.count();//Taking count of no. of countries in the option for For loop
    
    //For loop to select the country name from Options
    for(let i=0;i<CountriesCount;++i){
        if(await CountryOptions.nth(i).textContent()===" India"){
            await CountryOptions.nth(i).click();
            break;

        }
    }

    await PlcOrdrBtn.click();//Order Placed on click.

    //OrderConfirmation and OrderID Generation Page
    const confirmTxt= await Page.locator('.hero-primary').textContent();//Order Confirmation Text
    console.log(confirmTxt);
    const OrderID = await Page.locator('label.ng-star-inserted').textContent();//Extracted OrderId No.
    console.log(OrderID);

    //Moving to Orders Page
    const Orders = Page.locator('button[routerlink*="/dashboard/myorders"]');
    await Orders.click();
    await Page.locator("tbody").waitFor();
    const Tablerow= Page.locator("tbody tr");
    const RowCount = await Tablerow.count();
    console.log(RowCount);
    //const ViewBtn= Page.locator('table.ng-star-inserted tbody tr td .btn-primary');
    //await Tablerow.first().waitFor();
    //await ViewBtn.first().waitFor();
   // const ViewbtnCount= await ViewBtn.count();
    for(let i=0;i<RowCount;++i){
        const OrderidCart = await Tablerow.nth(i).locator('th').textContent();
        if (OrderID.includes(OrderidCart)){
            await Tablerow.nth(i).locator('td .btn-primary').click();
            break;
        }       
                  
    }
    
    const OrderSummary =Page.locator('div.email-title');
    console.log(await OrderSummary.textContent()); 
    const SummaryID=await Page.locator('div.col-text').textContent() ;
    expect(OrderID.includes(SummaryID)).toBeTruthy();

 
});
