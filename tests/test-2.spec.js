import { test, expect } from '@playwright/test';

// === Helper: Get label like "Nov-2025" ===
function currentMonthLabel() {
    const d = new Date();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d);
    const year = d.getFullYear();
    return `${month}-${year}`;
}

// === Helper: Get the "Total Users" count for the current month ===
async function getCurrentMonthUserCount(page) {
    const monthKey = currentMonthLabel();
    console.log('Looking for user count for month:', monthKey);

    const widget = page.locator('[tooltipcontent="Total Users"]');
    await expect(widget).toBeVisible({ timeout: 15000 });

    const tbody = widget.locator('table tbody');
    await expect(tbody).toBeVisible({ timeout: 15000 });

    const countCell = widget.locator(
        `xpath=.//table//tbody//tr[td[1]//span[normalize-space(.)="${monthKey}"]]//td[2]//span`
    );

    const matches = await countCell.count();
    if (matches === 0) {
        console.log(`No row for ${monthKey} — returning 0`);
        return 0;
    }

    const txt = (await countCell.first().innerText()).trim();
    const n = Number.parseInt(txt, 10);
    if (Number.isNaN(n)) {
        throw new Error(
            `Found a row for ${monthKey} but the count cell was not a number.\n` +
            `Cell text: "${txt}".\nCheck if the 2nd column contains numeric data.`
        );
    }
    return n;
}

// === MAIN TEST ===
test('login & check user creation from dashboard', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    // ---- Login ----
    await page.goto('https://rifat-blubird.mybrokercloud.com/login');
    await page.locator('#input-7').fill('superadminextra@yopmail.com');
    await page.locator('#input-9').fill('R@123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');

    // ---- Get count before ----
    let beforeCount;
    try {
        beforeCount = await getCurrentMonthUserCount(page);
        console.log("Current no of user before create: ", beforeCount);
    } catch (err) {
        await page.screenshot({ path: '../snapshots/beforeCount_fail.png', fullPage: true });
        console.error('❌ Failed to get beforeCount:', err.message);
        throw err;
    }

    // ---- Create user ----
    await page.getByText(/^People$/).click();
    await page.getByRole('link', { name: 'Users/Agents' }).click();
    await page.getByRole('button', { name: 'Add New' }).click();

    const firstName = `ExtraUser_${Date.now()}`;
    const lastName = `Test_${Math.floor(Math.random() * 1000)}`;

    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page
        .getByPlaceholder('Email')
        .fill(`extrauser_${Date.now()}@yopmail.com`);
    await page.getByRole('combobox', { name: 'Pick a day' }).click();
    await page.getByRole('button', { name: 'Locations' }).click();

    // Pick the last location row
    const locationsTbody = page.locator('xpath=(//tbody)[2]');
    await expect(locationsTbody).toBeVisible();
    const locationCell = locationsTbody.locator(
        'xpath=.//tr[last()]//td[4]//div//div'
    );
    await locationCell.first().click();

    // Submit the user creation form
    await Promise.all([
        page.waitForResponse((r) =>
            r.url().includes('/users') &&
            r.request().method() === 'POST' &&
            r.ok()
        ),
        page.getByRole('button', { name: 'Create' }).click(),
    ]);

    // ---- Return to Dashboard ----
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.waitForURL('**/dashboard');
    await page.waitForLoadState('networkidle');

    // ---- Get count after ----
    let afterCount;
    try {
        afterCount = await getCurrentMonthUserCount(page);
        console.log("Current no of user after create: ", afterCount);
    } catch (err) {
        await page.screenshot({ path: '../snapshots/afterCount_fail.png', fullPage: true });
        console.error('❌ Failed to get afterCount:', err.message);
        throw err;
    }

    // ---- Assert +1 ----
    expect(
        afterCount,
        `Expected Total Users for ${currentMonthLabel()} to increase by +1.\n` +
        `Before: ${beforeCount}, After: ${afterCount}\n` +
        `If this fails, check dashboard refresh timing or month format.`
    ).toBe(beforeCount + 1);
});
