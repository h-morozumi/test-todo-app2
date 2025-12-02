// spec: specs/todo-app-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Suite', () => {
  test('Deadline Boundary Conditions', async ({ page }) => {
    // Add a task with today's date, another with a past date, and another with a far-future date
    await page.goto('http://localhost:3000');
    
    // Add task with today's date
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Today task');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2025-12-02');
    await page.getByRole('button', { name: 'Add' }).click();

    // Add task with past date
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Past task');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2025-11-01');
    await page.getByRole('button', { name: 'Add' }).click();

    // Add task with far-future date
    await page.getByRole('textbox', { name: 'Add a new task...' }).fill('Future task');
    await page.getByRole('textbox', { name: 'Deadline:' }).fill('2030-01-01');
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify the displayed locale strings for each - app accepts past, present, and future dates
    await expect(page.getByText('Today task')).toBeVisible();
    await expect(page.getByText('(Deadline: 12/2/2025)')).toBeVisible();
    
    await expect(page.getByText('Past task')).toBeVisible();
    await expect(page.getByText('(Deadline: 11/1/2025)')).toBeVisible();
    
    await expect(page.getByText('Future task')).toBeVisible();
    await expect(page.getByText('(Deadline: 1/1/2030)')).toBeVisible();

    // Verify counter shows 3 tasks
    await expect(page.getByText('3 task(s) remaining')).toBeVisible();

    // Delete the past-date task and ensure others remain unaffected
    await page.getByRole('listitem').filter({ hasText: 'Past task(Deadline: 11/1/2025' }).getByRole('button').click();

    // Verify deleting one task leaves the others intact and counter stays accurate
    await expect(page.getByText('Past task')).not.toBeVisible();
    await expect(page.getByText('Today task')).toBeVisible();
    await expect(page.getByText('Future task')).toBeVisible();
    await expect(page.getByText('2 task(s) remaining')).toBeVisible();
  });
});