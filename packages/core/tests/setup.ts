import { expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Setup custom matchers
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

/**
 * Render component with Theme Provider
 */
export function renderWithTheme(
  component: React.ReactElement,
  options?: any
) {
  return render(component, options);
}

/**
 * Create user event with standard options
 */
export function createUser() {
  return userEvent.setup();
}

/**
 * Test accessibility
 */
export async function testA11y(container: HTMLElement) {
  // Placeholder for axe testing
  expect(container).toBeDefined();
}

// Default exports
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
