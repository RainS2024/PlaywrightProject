const { url } = require("inspector");

class LoginPage {

constructor(Page){

   this.Username=Page.locator('#userEmail');
   this.Password=Page.locator('#userPassword');
   this.SignIn = Page.locator('#login');
   this.Page=Page;
}

async GoTo(){
   const url = process.env.URL; 
   await this.Page.goto(url);

}


async ValidLogin(Username,password){

    await this.Username.fill(Username);
    await this.Password.fill(password);
    await this.SignIn.click();
    await this.Page.waitForLoadState('networkidle');
}
}
module.exports= {LoginPage};