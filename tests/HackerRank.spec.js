const {test, expect} = require('@playwright/test');

//test.describe.configure({mode:'parallel'});//if tests in the file has to run in parallel mode
//test.describe.configure({mode:'serial'}); // if tests are dependent on each other running in serial mode skips the next tests in line if the first fails.
test ('HackerRank Login Test', async ({page})=>
    {
    await page.goto("https://www.hackerrank.com/auth/login");
    const UserName=page.locator('[aria-label="Your username or email"]');
    const Password = page.locator('[aria-label="Your password"]');
    const Login=page.locator('#content > div > div > div > div > div.community-content > div > div > div > div > div.auth-form-wrapper > div > form > div:nth-child(3) > button');
    const Certify= (page.locator('.nav-link  span').nth(1));
    console.log( await page.title());
    await expect(page).toHaveTitle('HackerRank');
    await UserName.fill("garima.symbiosis@gmail.com");
    await Password.fill("Javapractice@2024");
    await Login.click();
    console.log (await Certify.textContent());
    await expect(Certify).toContainText('Certify');
    await Certify.click();
    console.log (await page.locator('.page-label').textContent());
    await expect(page.locator('.page-label')).toContainText('Get Certified');

    
    
    
    });     

    
    test ('HackerRank neg Login Test', async ({page})=>
        {
        await page.goto("https://www.hackerrank.com/auth/login");
        console.log( await page.title());
        await expect(page).toHaveTitle('HackerRank');
        await page.locator('[aria-label="Your username or email"]').fill("garima.symbiosis@gmail.com");
        await page.locator('[aria-label="Your password"]').fill("xyz");
        await page.locator('#content > div > div > div > div > div.community-content > div > div > div > div > div.auth-form-wrapper > div > form > div:nth-child(3) > button').click();
       console.log (await page.locator('[class="c-jiIMLs hr-m-0"]').textContent());

        
        });     