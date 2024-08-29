class DashboardPage{

    constructor(Page){

        this.products=Page.locator('.card-body');
        this.productstext = Page.locator('.card-body>h5>b');
       this.heading= Page.locator('h3').nth(0);
       this.addtocart = Page.locator('[routerlink*="/dashboard/cart"]');
       this.Page=Page;
    }

    async PageDetails(){
        console.log(await this.Page.title());
        await this.productstext.first().waitFor(); //waiting for fist product helps till the page is stable
        console.log(await this.productstext.allTextContents()); 
        //lists all the items from the product list
        console.log(await this.productstext.count());
        const Heading = await this.Page.locator('h3').nth(0).textContent();
        console.log(Heading);
    }

async SearchProductName(ProdName){
    const noofitems = await this.productstext.count();
//Selection of item and adding to cart - 2 items selected with for loop iteration
    for(let i=0;i<noofitems;++i){
        if(await this.productstext.nth(i).textContent()===ProdName)
        {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    
        }
        
}

async NavigateToCart(){

    await this.addtocart.click();

}


}
module.exports={DashboardPage};