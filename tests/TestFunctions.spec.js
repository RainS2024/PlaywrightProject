const { test, expect } = require('@playwright/test');
test('Greenkart ListItemsTest', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    const Menu = page.locator('.product-name');
    console.log(await page.title());
    await expect(page).toHaveTitle('GreenKart - veg and fruits karts');
    //wait for ntwork to get idle and then extract the list of items on display
    //await page.waitForLoadState('networkidle');
    //incase networkidle is flaky we wait for the either the first or last element in the list to render 
    await Menu.first().waitFor();

    //console.log( await Menu.nth(0).textContent());
    console.log(await Menu.allTextContents());


})
test('RadioButton Select BlinkTest', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const Radio1 = page.locator('[value="radio1"]');
    const Radio2 = page.locator('[value="radio2"]');
    const Radio3 = page.locator('[value="radio3"]');
    const select = page.locator('#dropdown-class-example');
    const LinkText = page.locator('[href*="documents-request"]');
    //Radio Button Test
    await Radio1.click();
    expect(await Radio1.isChecked());
    //Select Option Test and assertion
    await select.selectOption('option1');
    await expect(select).toHaveValue('option1');
    //BlinkingText Test
    await expect(LinkText).toHaveAttribute("class", "blinkingText");
    page.close();

})


test('NewWindowPlaywright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const Page = await context.newPage();
    await Page.goto("https://www.selenium.dev/");
    const Link = Page.locator("[href*='selenium.dev&']");
    console.log(await Page.title());
    await expect(Page).toHaveTitle('Selenium');
    /*1st method
    //wait for the page to open
    const pagePromise = context.waitForEvent('page');//listening for new page
    await Link.click();//new page opens
    const newPage = await pagePromise;
    // Interact with the new page normally.
    const Text= await newPage.locator('.page-title-wrapper').textContent();
    console.log(await newPage.title());
    console.log(Text);*/

    //2nd Method
    //Promise method of asynchronous execution od steps as array   
    const [Page2] = await Promise.all([
        context.waitForEvent('page'),
        Link.click(),
    ])
    console.log(await Page2.locator('.page-title-wrapper').textContent());
    Page2.close();
    Page.close();
})

test('Split and Extract Test', async ({ browser }) => {
    const context = await browser.newContext();
    const Page = await context.newPage();
    const LinkText = Page.locator('[href*="documents-request"]');
    const text = Page.locator('.red').last();
    await Page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await LinkText.click();
    const msg = await text.textContent();
    const arraytext = msg.split('@');
    const rightside = arraytext[1].split(" ")[0];
    console.log(rightside);
    Page.close();



})

test('Playwright special locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByText("Employed").check();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.locator('[name="email"]').fill("abc@gmail.com");
    await page.getByPlaceholder("Password").fill("abc");//Placeholder attribute should be available
    await page.getByRole("button", { name: "Submit" }).click();//make sure the button is unique
    const Success = await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    expect(page.getByText("Success! The Form has been submitted successfully!.")).toHaveText(Success);
    await page.getByRole("link", { name:"Shop"}).click();
    //await page.locator('card h-100').filter({hasText:'Samsung Note 8'}).getByRole("button").click();
}); 

test.only ('Date Picking Calender', async ({ page }) => {
    const selectYear= "2025"
    const selectMonth = "November"
    const selectDate = "24"
    const expectedDate = [selectMonth,selectDate,selectYear] // array of [mm,dd,yy] to validate
    const Year = page.getByText(selectYear);
    const Month = page.getByText(selectMonth);
    const Date=page.locator("//abbr[text()='"+selectDate+"']")//XPATH AS LOCATOR STATEGY HERE TO GET THE UNIQUE ELEMENT
    const DatePicked=page.locator('input.react-date-picker__inputGroup__input');
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers"); 
    await page.locator("div .react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText ").click();
    await page.locator(".react-calendar__navigation__label__labelText ").click();
    await Year.click();
    await Month.click();
    await Date.click();
    //for loop to iterate through the date picked and validate with the values in te array of expected date.
    // 3 different elemenst in the date which we are iterating toygh for loop. 
    //picks up month first and validates with the value in the array.
    //picks up date nest and validates with the value in the array.
    //pick up year last and validate with the value in the array.
    for(let i=0;i<DatePicked.length;i++){
        const value= await DatePicked.getAttribute('Value');
        expect (value).toEqual(expectedDate[i]);
    }
    
});