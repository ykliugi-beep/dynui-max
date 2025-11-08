import '@testing-library/jest-dom';
import { beforeAll, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations, axe } from 'jest-axe';

// ===================================================
// CRITICAL: Register jest-axe matchers globally
// This fixes "toHaveNoViolations" TypeScript errors
// ===================================================
expect.extend(toHaveNoViolations);

// Export axe for use in test files
export { axe };

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
      dispatchEvent: () => false,
    }),
  });

  // Mock localStorage
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
