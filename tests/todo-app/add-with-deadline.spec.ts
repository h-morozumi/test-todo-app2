// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Add Task With Deadline (Happy Path)', async ({ page }) => {
    // Launch http://localhost:3000 in a fresh session with the default empty list
    await page.goto('http://localhost:3000');

    // Enter "Pay rent" into the task input field
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Pay rent');

    // Select tomorrow's date in the Deadline picker
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2025-12-03');

    // Click the Add button
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify a new list item appears showing "Pay rent" plus the formatted deadline label
    await expect(page.getByText('Pay rent')).toBeVisible();
    await expect(page.getByText(/Deadline:/)).toBeVisible();
    
    // Verify input and date fields clear after submission
    await expect(page.getByRole('textbox', { name: 'Add a new task...' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Deadline:' })).toHaveValue('');
    
    // Verify remaining task counter renders with value 1 and the empty-state placeholder disappears
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
    await expect(page.getByText('No tasks yet. Add one above!')).not.toBeVisible();
  });
});