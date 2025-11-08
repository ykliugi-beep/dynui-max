import '@testing-library/jest-dom';
import { beforeAll, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// ===================================================
// CRITICAL FIX: Register jest-axe matchers globally
// This fixes 70+ "toHaveNoViolations" TypeScript errors
// ===================================================
expect.extend(toHaveNoViolations);

// Export axe for use in test files
export { axe } from 'jest-axe';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock localStorage with unused parameter prefix
  const localStorageMock = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    clear: () => {}
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
});