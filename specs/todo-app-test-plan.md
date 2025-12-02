# TODO App Test Plan

## Application Overview

Single-page Next.js TODO app that allows users to add plain-text tasks, optionally assign a deadline, mark tasks complete, delete them, and view a remaining-task counter plus empty-state guidance. All data lives in client state only, so every test assumes a fresh browser session with an empty list.

## Test Scenarios

### 1. Todo App Functional Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add Task With Deadline (Happy Path)

**File:** `tests/todo-app/add-with-deadline.spec.ts`

**Steps:**
  1. 1. Launch http://localhost:3000 in a fresh session with the default empty list.
  2. 2. Enter "Pay rent" into the task input field.
  3. 3. Select tomorrow’s date in the Deadline picker.
  4. 4. Click the Add button.

**Expected Results:**
  - A new list item appears showing "Pay rent" plus the formatted deadline label.
  - Input and date fields clear after submission.
  - Remaining task counter renders with value 1 and the empty-state placeholder disappears.

#### 1.2. Add Task Without Deadline Using Enter Key

**File:** `tests/todo-app/add-without-deadline.spec.ts`

**Steps:**
  1. 1. Load the app fresh so no tasks exist.
  2. 2. Type "Call mom" into the task input, leave the deadline blank.
  3. 3. Press the Enter key while focused on the text field.

**Expected Results:**
  - Task is appended to the list without any deadline text.
  - Add button remains idle; addition occurs via keyboard.
  - Remaining counter increments to 1.

#### 1.3. Reject Empty or Whitespace Tasks

**File:** `tests/todo-app/reject-empty.spec.ts`

**Steps:**
  1. 1. Start from an empty list.
  2. 2. Leave the text input blank and click Add.
  3. 3. Enter only spaces (e.g., "   ") and click Add.
  4. 4. Confirm no errors appear in console (if accessible).

**Expected Results:**
  - No task gets added in either attempt and empty-state message stays visible.
  - Input field retains focus for correction.
  - Task counter remains absent and list length stays 0.

#### 1.4. Deadline Optionality and Clearing

**File:** `tests/todo-app/deadline-optional.spec.ts`

**Steps:**
  1. 1. With an empty list, type "Submit report" and set deadline to next Friday, then click Add.
  2. 2. Verify deadline text is shown, then select the same todo’s delete button to remove it.
  3. 3. Add another todo "Plan trip" but clear the date picker before clicking Add.

**Expected Results:**
  - First todo shows a deadline in parentheses using locale formatting.
  - After deletion the list is empty again and footer counter disappears.
  - Second todo adds successfully without any deadline text, confirming clearing works.

#### 1.5. Toggle Completion Updates Styling and Counter

**File:** `tests/todo-app/toggle-complete.spec.ts`

**Steps:**
  1. 1. Add two tasks: "Task A" and "Task B" (no deadlines).
  2. 2. Tick the checkbox for "Task A".
  3. 3. Untick "Task A" and tick "Task B".
  4. 4. Observe the remaining-task counter after each toggle.

**Expected Results:**
  - Checked items gain line-through and muted color while unchecked stay normal.
  - Toggling completed status updates the remaining count accordingly (1 after first toggle, 2 after unchecking, 1 after ticking B).
  - State changes persist until page refresh.

#### 1.6. Delete Task Removes It and Restores Empty State

**File:** `tests/todo-app/delete-task.spec.ts`

**Steps:**
  1. 1. Add three tasks (A, B, C).
  2. 2. Click Delete on task B and confirm A/C remain.
  3. 3. Delete A then C to clear the list.

**Expected Results:**
  - Deleting B removes only that entry and does not reorder others unexpectedly.
  - Remaining counter decrements to 2 then to 0, and footer vanishes once list empty.
  - Empty-state message returns when all tasks are removed.

#### 1.7. Large List Rendering and Scroll Behavior

**File:** `tests/todo-app/large-list.spec.ts`

**Steps:**
  1. 1. Rapidly add 25 distinct tasks (e.g., Task 1..Task 25) using keyboard Enter to mix interaction methods.
  2. 2. Scroll through the list to verify spacing and that earlier entries remain visible.
  3. 3. Toggle a middle item and delete another to ensure performance holds.

**Expected Results:**
  - All tasks render with consistent spacing; list grows vertically with scrollbar as needed.
  - Interactions (toggle/delete) remain responsive with no console errors.
  - Remaining counter reflects total minus completed tasks accurately.

#### 1.8. Deadline Boundary Conditions

**File:** `tests/todo-app/deadline-boundary.spec.ts`

**Steps:**
  1. 1. Add a task with today’s date, another with a past date, and another with a far-future date (manual input if browser allows).
  2. 2. Verify the displayed locale strings for each.
  3. 3. Edit by deleting the past-date task and ensure others remain unaffected.

**Expected Results:**
  - App accepts past, present, and future dates without validation errors and always displays "Deadline: MM/DD/YYYY" formatted via locale.
  - Deleting one task leaves the others intact; no shared state issues occur.
  - Counter and footer stay accurate after deletion.
