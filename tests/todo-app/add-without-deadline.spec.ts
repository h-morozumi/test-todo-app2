// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Add Task Without Deadline Using Enter Key', async ({ page }) => {
    // Load the app fresh so no tasks exist
    await page.goto('http://localhost:3000');

    // Type "Call mom" into the task input, leave the deadline blank
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Call mom');

    // Press the Enter key while focused on the text field
    await page.keyboard.press('Enter');

    // Verify task is appended to the list without any deadline text
    await expect(page.getByText('Call mom')).toBeVisible();
    await expect(page.getByText('Call mom').locator('..').getByText(/Deadline:/)).not.toBeVisible();
    
    // Verify remaining counter increments to 1
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
    await expect(page.getByText('No tasks yet. Add one above!')).not.toBeVisible();
  });
});