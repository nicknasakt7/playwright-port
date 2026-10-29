import { test, expect } from 'playwright/test';

test.only('Test Locator', async ({ page }) => {
  await page.goto('https://automate-test.stpb-digital.com/login/');
  await page.locator('#email').fill('admin'); //ID
  //   await page.locator('email').fill('admin'); //NAME
  await page.getByPlaceholder('admin@krupbeam.com').fill('admin');
  //   await page
  //     .locator('.MuiOutlinedInput-notchedOutline.css-igs3ac')
  //     .fill('admin'); //CLASS
  await page.getByLabel('Email').fill('admin');
  await page.getByRole('button', { name: 'LOGIN' });
  await page.pause();
  await page.getByText('LOGIN');
  await page.getByTestId('login-button'); // Devต้องเขียนมาให้
});

test('Test Assertion', async ({ page }) => {
  await page.goto('https://automate-test.stpb-digital.com/login/');
  await page.locator('#email').fill('admin'); //ID
  await page.locator('#btn-login').click();
  await expect(
    page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/form/div[1]/p'),
  ).toHaveText('email is a required field');
  await expect(page.locator('#btn-login')).toBeDisabled();
  await expect(page.locator('#btn-login')).toBeVisible();
  await expect(page).toHaveURL('https://automate-test.stpb-digital.com/login/');
});
