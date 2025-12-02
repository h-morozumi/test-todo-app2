// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Deadline Optionality and Clearing', async ({ page }) => {
    // With an empty list, type "Submit report" and set deadline to next Friday, then click Add
    await page.goto('http://localhost:3000');
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Submit report');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2025-12-06');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify deadline text is shown, then select the same todo's delete button to remove it
    await expect(page.getByText('Submit report')).toBeVisible();
    await expect(page.getByText(/Deadline:/)).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();

    // Verify after deletion the list is empty again and footer counter disappears
    await expect(page.getByText('Submit report')).not.toBeVisible();
    await expect(page.getByText('No tasks yet. Add one above!')).toBeVisible();
    await expect(page.getByText(/task\(s\) remaining/)).not.toBeVisible();

    // Add another todo "Plan trip" but clear the date picker before clicking Add
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Plan trip');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2025-12-10');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify second todo adds successfully without any deadline text
    await expect(page.getByText('Plan trip')).toBeVisible();
    await expect(page.getByText('Plan trip').locator('..').getByText(/Deadline:/)).not.toBeVisible();
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
  });
});