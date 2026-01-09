const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
import { test, expect } from '@playwright/test';

test( 'test  rifat', (async ({ page }) => {
        
        await page.goto('H:/Automation Playwright/rifat/index.html'); // Ensures URL is set for toHaveUrl assertion

        // Actions
        await expect(page.locator('#text-input')).toBeDisabled();
        
        await page.locator('#enable-btn').click(); // Click a button to enable the input
        
        // fill(): Fill a text input
        await page.locator('#text-input').fill('Filled Text');

        // hover(): Hover over a button
        await page.locator('#hover-btn').hover();
        await expect(page.locator('#hover-btn')).toHaveText('Hovered!'); // Verify hover effect

        await page.locator('body').hover(); // Unhover again to reset
        await expect(page.locator('#hover-btn')).toHaveText('Hover Me');

        // click(): Click a button (this will enable the input for later assertions)
        // await page.locator('#enable-btn').click(); // Assume this simulates enabling, but in real: use JS if needed

        // check(): Check a checkbox
        await page.locator('#checkbox').check();
        await expect(page.locator('#checkbox')).toBeChecked(); // Verify it's checked

        // uncheck(): Uncheck the same checkbox
        await page.locator('#checkbox').uncheck();

        // focus(): Focus on an element
        await page.locator('#focus-div').focus();
        await expect(page.locator('#focus-div')).toBeFocused(); // Verify focus

        // press(): Press a key (e.g., on focused element)
        await page.locator('#focus-div').press('Enter');

        // setInputFiles(): Upload a file (create a temp file first)
        const tempFile = 'temp_upload.txt';
        fs.writeFileSync(tempFile, 'Sample content');
        await page.locator('#file-input').setInputFiles(tempFile);
        fs.unlinkSync(tempFile); // Cleanup

        // selectOption(): Select an option in a dropdown
        await page.locator('#select-box').selectOption('option2');

        // Brief pause to observe actions
        await page.waitForTimeout(2000);

        // Assertions (using expect)
        // const { expect } = require('@playwright/test');

        // toBeVisible(): Check if an element is visible
        await expect(page.locator('#header')).toBeVisible();

        // toBeHidden(): Check if an element is hidden (click to show it first for demo)
        await page.locator('#click-btn').click(); // Action to make it visible, then assert opposite on another
        await expect(page.locator('#hidden-div')).not.toBeHidden(); // Inverted for demo; adjust as needed

        // toHaveText(): Exact text match
        await expect(page.locator('#header')).toHaveText('Demo Header');

        // toHaveValue(): Check input value
        await expect(page.locator('#text-input')).toHaveValue('Filled Text');

        // toBeEnabled(): Check if enabled (after simulated enable)
        await expect(page.locator('#text-input')).toBeEnabled();

        // toBeDisabled(): Check if disabled (on another element if needed; here, assume prior state)
        // For demo, re-disable via JS and assert
        await page.evaluate(() => document.getElementById('text-input').disabled = true);
        await expect(page.locator('#text-input')).toBeDisabled();

        // toBeChecked(): Check checkbox state
        await page.locator('#checkbox').check(); // Set state first
        await expect(page.locator('#checkbox')).toBeChecked();

        // toBeFocused(): Check focus
        await page.locator('#focus-div').focus(); // Re-focus
        await expect(page.locator('#focus-div')).toBeFocused();

        // toHaveAttribute(): Check attribute value
        await expect(page.locator('#attr-img')).toHaveAttribute('class', 'custom-class');

        // toHaveCount(): Check number of elements
        await expect(page.locator('#list li')).toHaveCount(2);

        // toContainText(): Partial text match
        await expect(page.locator('#partial-text')).toContainText('ABC123');

        // toHaveTitle(): Page title
        await expect(page).toHaveTitle('Playwright Demo Page');

        await page.locator('#click-btn').click();
        await expect(page.locator('#hidden-div')).toBeHidden();

        await expect(page.locator('#select-box > option')).toHaveCount(3)
        await expect(page.locator('#select-box')).toHaveValue('option2');
        // await expect(page.locator('#select-box')).toHaveValue('option2');

        // toHaveUrl(): Page URL (about:blank for this in-memory page)
        await expect(page).toHaveURL('file:///H:/Automation%20Playwright/rifat/index.html');
}));