// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Delete Task Removes It and Restores Empty State', async ({ page }) => {
    // Add three tasks (A, B, C)
    await page.goto('http://localhost:3000');
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('A');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('B');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('C');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify initial state - 3 tasks
    await expect(page.getByText('3 task(s) remaining')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'A' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'B' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'C' })).toBeVisible();

    // Click Delete on task B and confirm A/C remain
    await page.getByRole('listitem').filter({ hasText: 'B' }).getByRole('button', { name: 'Delete' }).click();

    // Verify deleting B removes only that entry and remaining counter decrements to 2
    await expect(page.getByRole('listitem').filter({ hasText: 'B' })).not.toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'A' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'C' })).toBeVisible();
    await expect(page.getByText('2 task(s) remaining')).toBeVisible();

    // Delete A then C to clear the list
    await page.getByRole('listitem').filter({ hasText: 'A' }).getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
    
    await page.getByRole('listitem').filter({ hasText: 'C' }).getByRole('button', { name: 'Delete' }).click();

    // Verify empty-state message returns when all tasks are removed and footer vanishes
    await expect(page.getByText('No tasks yet. Add one above!')).toBeVisible();
    await expect(page.getByText(/task\(s\) remaining/)).not.toBeVisible();
  });
});