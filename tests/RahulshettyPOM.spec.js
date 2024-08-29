const {test, expect} = require('@playwright/test');
const{POManager}=require('../PageObjects/POManager');
const { text } = require('stream/consumers');

test ('Product Shopping Test', async ({browser})=>
{
const context= await browser.newContext();
const Page = await context.newPage();
const Username = process.env.Usrnm;
const password= process.env.passwrd;
const ProdName1=process.env.Prod1;
const ProdName2=process.env.Prod2;


const pomanager= new POManager(Page);
const loginpage=pomanager.getLoginPage();
await loginpage.GoTo();
await loginpage.ValidLogin(Username,password);

const dashboardpage = pomanager.getdashpoardPage();
await dashboardpage.PageDetails();
await dashboardpage.SearchProductName(ProdName1);
await dashboardpage.SearchProductName(ProdName2);
await dashboardpage.NavigateToCart();

const cartpage=pomanager.getCartPage();
await cartpage.ProductsInCart();
await cartpage.VerifyProductisDisplayed(ProdName1);
await cartpage.BuyIphn();

const paymentpage=pomanager.getPaymentPage();
   await paymentpage.VerifyEmailid(Username);
   await paymentpage.SelectCountry("Ind"," India");
   await paymentpage.PlaceOrder();

 
const orderreviw=pomanager.getOrderRvwPage();  
   await orderreviw.OrderConfirmation();
   await Page.close();
 
 
});
