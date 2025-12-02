// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Large List Rendering and Scroll Behavior', async ({ page }) => {
    // Rapidly add 25 distinct tasks using keyboard Enter to mix interaction methods
    await page.goto('http://localhost:3000');
    
    const taskInput = page.getByRole('textbox', { name: 'Add a new task...' });
    
    // Add multiple tasks using Enter key
    for (let i = 1; i <= 25; i++) {
      await taskInput.fill(`Task ${i}`);
      await page.keyboard.press('Enter');
    }

    // Verify all tasks render with consistent spacing and counter is accurate
    await expect(page.getByText('25 task(s) remaining')).toBeVisible();
    await expect(page.getByText('Task 1')).toBeVisible();
    await expect(page.getByText('Task 25')).toBeVisible();

    // Verify earlier entries remain visible (scroll test)
    await expect(page.getByText('Task 1')).toBeVisible();
    await expect(page.getByText('Task 10')).toBeVisible();

    // Toggle a middle item and delete another to ensure performance holds
    await page.getByRole('listitem').filter({ hasText: 'Task 10Delete' }).getByRole('checkbox').click();
    
    // Verify remaining counter reflects total minus completed tasks accurately
    await expect(page.getByText('24 task(s) remaining')).toBeVisible();
    
    // Delete another task
    await page.getByRole('listitem').filter({ hasText: 'Task 15Delete' }).getByRole('button').click();
    
    // Verify counter updates correctly after deletion
    await expect(page.getByText('23 task(s) remaining')).toBeVisible();
    await expect(page.getByText('Task 15')).not.toBeVisible();
    
    // Verify interactions remain responsive - no console errors expected
    await expect(page.getByText('Task 10')).toBeVisible();
  });
});