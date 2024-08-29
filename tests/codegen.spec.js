import { test, expect } from '@playwright/test';

test('SFtest', async ({ page }) => {
  await page.goto('https://rainbowltd-dev-ed.develop.my.salesforce.com/');
  await page.getByLabel('Username').click({
    button: 'right'
  });
  await page.getByLabel('Username').fill('spirit42@rainbow.com');
  await page.getByLabel('Password').click({
    button: 'right'
  });
  await page.getByLabel('Password').fill('pink424@');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page.goto('https://rainbowltd-dev-ed.develop.my.salesforce.com/secur/logout.jsp');
  await page.goto('https://rainbowltd-dev-ed.develop.my.salesforce.com/');
});

// await page1.locator('#dismiss_all').click();