const {test, expect} = require('@playwright/test');

test ('Browser Playwright Test', async ({browser})=>
{
const context= await browser.newContext();
const Page = await context.newPage();
await Page.goto("https://www.google.com/");
console.log( await Page.title());
    await expect(Page).toHaveTitle('Google');
});

test ('Page Playwright Test', async ({page})=>
    {
    await page.goto("https://www.selenium.dev/");
    console.log( await page.title());
    await expect(page).toHaveTitle('Selenium');
    
    });

    