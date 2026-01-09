const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
import { test, expect } from '@playwright/test';

test( 'test  rifat', (async ({ page }) => {
        
        await page.goto('H:/Automation Playwright/rifat/index.html'); // Ensures URL is set for toHaveUrl assertion
        await expect(page).toHaveURL('file:///H:/Automation%20Playwright/rifat/index.html');

        // Actions and Assertions
        await expect(page.locator('#text-input')).toBeDisabled(); // Verify initially disabled
        await page.locator('#enable-btn').click(); // Click a button to enable the input
        await expect(page.locator('#text-input')).toBeEnabled(); // Verify enabled
        
        await page.locator('#text-input').fill('Filled Text'); // fill(): Fill a text input
        await expect(page.locator('#text-input')).toHaveValue('Filled Text'); // Verify filled value

        await page.evaluate(() => document.getElementById('text-input').disabled = true); // For demo, re-disable via JS and assert
        await expect(page.locator('#text-input')).toBeDisabled(); // toBeDisabled(): Check if disabled

        await page.locator('#hover-btn').hover(); // hover(): Hover over a button
        await expect(page.locator('#hover-btn')).toHaveText('Hovered!'); // Verify hover effect

        await page.locator('body').hover(); // Un-hover again to reset
        await expect(page.locator('#hover-btn')).toHaveText('Hover Me'); // Verify un-hover effect

        await page.locator('#checkbox').check(); // check(): Check a checkbox
        await expect(page.locator('#checkbox')).toBeChecked(); // Verify it's checked

        await page.locator('#checkbox').uncheck(); // uncheck(): Uncheck the same checkbox
        await expect(page.locator('#checkbox')).not.toBeChecked(); // Verify it's unchecked

        await page.locator('#focus-div').focus(); // focus(): Focus on an element
        await expect(page.locator('#focus-div')).toBeFocused(); // Verify focus

        await page.locator('#focus-div').press('Enter'); // press(): Press a key (e.g., on focused element)

        // setInputFiles(): Upload a file (create a temp file first)
        const tempFile = 'temp_upload.txt';
        fs.writeFileSync(tempFile, 'Sample content');
        await page.locator('#file-input').setInputFiles(tempFile);
        fs.unlinkSync(tempFile); // Cleanup

        await expect(page.locator('#select-box > option')).toHaveCount(3); // Verify number of options
        await page.locator('#select-box').selectOption('option2'); // selectOption(): Select an option in a dropdown
        await expect(page.locator('#select-box')).toHaveValue('option2'); // Verify selected value

        await page.waitForTimeout(2000); // Brief pause to observe actions

        await expect(page.locator('#header')).toBeVisible(); // verify header is visible
        await expect(page.locator('#header')).toHaveText('Demo Header'); // toHaveText(): Exact text match

        const visible = await page.evaluate(() => {
            return document.getElementById('hidden-div').style.display === 'none' ? false : true;
        });
        if (visible) {
            await page.locator('#click-btn').click(); // Hide it if visible
            await expect(page.locator('#hidden-div')).toBeHidden(); // Inverted for demo; adjust as needed
        };

        await page.locator('#checkbox').check(); // Set state first
        await expect(page.locator('#checkbox')).toBeChecked(); // toBeChecked(): Check checkbox state

        await page.locator('#focus-div').focus(); // Re-focus
        await expect(page.locator('#focus-div')).toBeFocused(); // toBeFocused(): Check focus

        await expect(page.locator('#attr-img')).toHaveAttribute('class', 'custom-class'); // toHaveAttribute(): Check attribute value

        await expect(page.locator('#list li')).toHaveCount(2); // toHaveCount(): Check number of elements

        await expect(page.locator('#partial-text')).toContainText('ABC123'); // toContainText(): Partial text match

        await expect(page).toHaveTitle('Playwright Demo Page'); // toHaveTitle(): Page title

        await page.locator('#click-btn').click(); // Click to hide the div
        await expect(page.locator('#hidden-div')).toBeVisible(); // toBeHidden(): Check visibility

        await expect(page.locator('#select-box')).toHaveValue('option2'); // toHaveValue(): Check input/select value

        await expect(page).toHaveURL('file:///H:/Automation%20Playwright/rifat/index.html'); // toHaveUrl(): Page URL
}));