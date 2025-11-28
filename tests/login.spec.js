import { test, expect } from '@playwright/test';
import { baseUrl, adminUser } from './../config/all.js';
const testData = require('../data/testData.json');

console.log(baseUrl);
console.log(adminUser.email);
console.log(testData.validUser.email);


test('Login with incorrect email: shows error toast', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('#input-7').fill(testData.validUser.email);
    await page.locator('#input-9').fill(adminUser.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for the toast message to appear
    const toast = page.locator('body');

    // Assert that it contains the expected text
    await expect(toast).toHaveText(/The specified temporary token is invalid/i, {
        timeout: 5000,
    });
});


test('Login with incorrect password: shows error toast', async ({ page }) => {
    await page.goto('https://rifat-blubird.mybrokercloud.com/login');
    await page.locator('#input-7').fill('superadminextra@yopmail.com');
    await page.locator('#input-9').fill('R@1234567');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for the toast message to appear
    const toast = page.locator('body');
    // Adjust selector to match your DOM (see notes below)

    // Assert that it contains the expected text
    await expect(toast).toHaveText(/Invalid Password./i, {
        timeout: 2000,
    });
});


test('Login successful > dashboard', async ({ page }) => {
    await page.goto('https://rifat-blubird.mybrokercloud.com/login');
    await page.locator('#input-7').fill('superadminextra@yopmail.com');
    await page.locator('#input-9').fill('R@123456');
    await page.getByRole('button', { name: 'Login' }).click();

    // waiting for dashboard url
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Assert that the URL is correct
    await expect(page).toHaveURL(/dashboard/i);
});


