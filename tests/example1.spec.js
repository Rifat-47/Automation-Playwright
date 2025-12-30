import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
        test.beforeEach(async ({ page }) => {
                console.log('before each test')
                // Go to the starting url before each test.
                await page.goto('https://playwright.dev/');
        });

        test.afterEach(async ({ page }) => {
                console.log('after each test')
                // Go to the starting url before each test.
                // await page.goto('https://playwright.dev/');
        });

        test.beforeAll(async () => {
                console.log('before all tests')
        });

        test.afterAll(async () => {
                console.log('after all tests')
        });

        test('main navigation', async ({ page }) => {
                // Assertions use the expect API.
                await expect(page).toHaveURL('https://playwright.dev/');
        });

        test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
        });

        // test('get started link', async ({ page }) => {
        //         // Click the get started link.
        //         await page.getByRole('link', { name: 'Get started' }).click();

        //         // Expects page to have a heading with the name of Installation.
        //         await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
        // });
});


// test('mbc  start', async ({ page }) => {
//         await page.goto('https://mbc.com/');
//         await expect(page).toHaveTitle(/MBC/);
// });