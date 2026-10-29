import { test, expect } from '@playwright/test';

const url: string = 'https://automate-test.stpb-digital.com/login/';
let locator_email: string = '#email';
let locator_password: string =
  '//*[@id="__next"]/div[1]/div/div/div/div/div/form/div[2]/div/input';
let locator_btnLogin: string = '#btn-login';
let locator_msgEmail: string = 'email is a required field';
let locator_msgPassword: string = 'password must be at least 5 characters';
let locator_btnHide: string =
  '//*[@id="__next"]/div[1]/div/div/div/div/div/form/div[2]/div/div/button';
let hyperLinkURL: string = 'https://automate-test.stpb-digital.com/register/';

let searchFilterURL: string =
  'https://automate-test.stpb-digital.com/user/list/';

test.beforeEach('Open Url', async ({ page }) => {
  await page.goto(url);
});

test('validate to default page', async ({ page }) => {
  // await page.goto(url);
  await expect(page).toHaveTitle("Kru P' Beam - STPB");
  await expect(page.getByText("Welcome to Kru P' Beam! ")).toBeVisible;
  await expect(page.locator('locator_email')).toBeVisible;
  await expect(page.locator(locator_password)).toBeVisible;
  await expect(page.locator(locator_btnLogin)).toBeVisible;
  await expect(page.getByRole('link', { name: 'Create an account' }));
});

test('Validate show page name', async ({ page }) => {
  // await page.goto(url);
  await expect(page).toHaveTitle("Kru P' Beam - STPB");
});

test('Validate the email format is valid', async ({ page }) => {
  // await page.goto(url);
  await page.locator(locator_email).fill('user.test@krupbeam.com');
  await expect(page.locator(locator_email)).toHaveValue(
    'user.test@krupbeam.com',
  );
  await expect(page.getByText(locator_msgEmail)).not.toBeVisible;
});

test('Validate the email format is invalid', async ({ page }) => {
  // await page.goto(url);

  let data: string[] = ['user.krupbeam.com', 'ไทย', '09912345678'];

  for (let x of data) {
    await page.locator(locator_email).fill(x);
    await expect(page.locator(locator_email)).toHaveValue(x);
    await page.locator(locator_btnLogin).click();
    await expect(page.getByText('email must be a valid email')).toBeVisible();
  }
});

test('Validate the password format is valid', async ({ page }) => {
  // await page.goto(url);
  await page.locator(locator_password).fill('1234567890');
  await expect(page.locator(locator_password)).toHaveValue('1234567890');
  await expect(page.getByText(locator_msgPassword)).not.toBeVisible();
});

test('Validate the password format is invalid', async ({ page }) => {
  // await page.goto(url);

  let password: string[] = ['123', 'test'];

  for (let x of password) {
    await page.locator(locator_password).fill(x);
    await expect(page.locator(locator_password)).toHaveValue(x);
    await page.locator(locator_btnLogin).click();
    await expect(page.getByText(locator_msgPassword)).toBeVisible();
  }
});

test('Validate button hide password is clicked', async ({ page }) => {
  // await page.goto(url);

  await page.locator(locator_password).fill('1234567890');
  await expect(page.locator(locator_password)).toHaveValue('1234567890');
  await page.locator(locator_btnHide).click();
  await expect(page.locator(locator_btnHide)).toBeEnabled();
});

test('Validate the email and password are valid', async ({ page }) => {
  // await page.goto(url);
  await page.locator(locator_email).fill('user.test@krupbeam.com');
  await page.locator(locator_password).fill('jKNsrapwLNV7eBN');
  await expect(page.locator(locator_email)).toHaveValue(
    'user.test@krupbeam.com',
  );
  await expect(page.locator(locator_password)).toHaveValue('jKNsrapwLNV7eBN');

  await page.locator(locator_btnLogin).click();

  await expect(page.getByText('Search Filters')).toBeVisible();
  await expect(page).toHaveURL(searchFilterURL);
});

test('Validate the email and password are invalid', async ({ page }) => {
  // await page.goto(url);
  await page.locator(locator_email).fill('test12345678@gmail.com');
  await page.locator(locator_password).fill('12345678900');
  await expect(page.locator(locator_email)).toHaveValue(
    'test12345678@gmail.com',
  );
  await expect(page.locator(locator_password)).toHaveValue('12345678900');

  await page.locator(locator_btnLogin).click();

  await expect(page.getByText('Email or Password is invalid')).toBeVisible();
});

test('validate required field for input text', async ({ page }) => {
  // await page.goto(url);
  await page.locator(locator_email).fill('');
  await page.locator(locator_password).fill('');
  await page.locator(locator_btnLogin).click();
  await expect(page.getByText(locator_msgEmail)).toBeVisible();
  await expect(page.getByText(locator_msgPassword)).toBeVisible();
});

test('Validate Hyperlink Create an account is clicked ', async ({ page }) => {
  // await page.goto(url);
  await page.getByRole('link', { name: 'Create an account' }).click();
  await expect(page).toHaveURL(hyperLinkURL);

  await expect(page).toHaveTitle("Kru P' Beam - STPB");
});

test.afterEach('capture', async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/${testInfo.title}.png`,
      fullPage: true,
    });
  }
});
