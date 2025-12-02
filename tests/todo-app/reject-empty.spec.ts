// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Reject Empty or Whitespace Tasks', async ({ page }) => {
    // Start from an empty list
    await page.goto('http://localhost:3000');

    // Leave the text input blank and click Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify no task gets added and empty-state message stays visible
    await expect(page.getByText('No tasks yet. Add one above!')).toBeVisible();
    await expect(page.getByText(/task\(s\) remaining/)).not.toBeVisible();

    // Enter only spaces and click Add
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('   ');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify no task gets added in either attempt and empty-state message stays visible
    await expect(page.getByText('No tasks yet. Add one above!')).toBeVisible();
    await expect(page.getByText(/task\(s\) remaining/)).not.toBeVisible();
  });
});