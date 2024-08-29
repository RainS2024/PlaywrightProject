const{LoginPage}= require ('./LoginPage');
const{DashboardPage}=require('./DashboardPage');
const{CartPage}=require('./CartPage');
const{PaymentPage}=require('./PaymentPage');
const{OrderRvwPage}=require('./OrderRvwPage');
class POManager{

constructor(Page){
    this.Page=Page;
    this. loginpage= new LoginPage(this.Page);
    this. dashboardpage = new DashboardPage(this.Page);
    this. cartpage=new CartPage(this.Page);
    this. paymentpage=new PaymentPage(this.Page);
    this. orderreviw=new OrderRvwPage(this.Page); 
}

getLoginPage(){
    return this.loginpage;
}

getdashpoardPage(){
    return this.dashboardpage;
}

getCartPage(){
    return this.cartpage;
}

getPaymentPage(){
    return this.paymentpage;
}

getOrderRvwPage(){
    return this.orderreviw;
}
}
module.exports={POManager};