// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Toggle Completion Updates Styling and Counter', async ({ page }) => {
    // Add two tasks: "Task A" and "Task B" (no deadlines)
    await page.goto('http://localhost:3000');
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Task A');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Task B');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify initial state - 2 tasks remaining
    await expect(page.getByText('2 task(s) remaining')).toBeVisible();

    // Tick the checkbox for "Task A"
    const taskACheckbox = page.getByRole('listitem').filter({ hasText: 'Task ADelete' }).getByRole('checkbox');
    await taskACheckbox.click();

    // Verify toggling completed status updates the remaining count to 1
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
    
    // Verify Task A is checked
    await expect(taskACheckbox).toBeChecked();

    // Untick "Task A" and tick "Task B"
    await taskACheckbox.click();
    await expect(page.getByText('2 task(s) remaining')).toBeVisible();

    const taskBCheckbox = page.getByRole('listitem').filter({ hasText: 'Task BDelete' }).getByRole('checkbox');
    await taskBCheckbox.click();

    // Verify final state - 1 task remaining after ticking B
    await expect(page.getByText('1 task(s) remaining')).toBeVisible();
    await expect(taskBCheckbox).toBeChecked();
    await expect(taskACheckbox).not.toBeChecked();
  });
});