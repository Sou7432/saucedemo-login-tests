const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo login', () => {
  let login;
  test.beforeEach(async ({ page }) => { login = new LoginPage(page); await login.open(); });

  // TC-01 (automated, positive)
  test('TC-01 valid user logs in and lands on inventory page', async ({ page }) => {
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  // TC-02 (automated, negative)
  test('TC-02 wrong password shows error and stays on login', async ({ page }) => {
    await login.login('standard_user', 'wrong_password');
    await expect(login.error).toContainText('Username and password do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  // TC-03 (automated, validation)
  test('TC-03 empty username shows "Username is required"', async () => {
    await login.login('', 'secret_sauce');
    await expect(login.error).toContainText('Username is required');
  });

  // TC-04 (automated, validation)
  test('TC-04 empty password shows "Password is required"', async () => {
    await login.login('standard_user', '');
    await expect(login.error).toContainText('Password is required');
  });

  // TC-05 (automated, business rule)
  test('TC-05 locked_out_user is blocked', async () => {
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText('locked out');
  });
});
