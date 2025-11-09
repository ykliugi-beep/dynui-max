import '@testing-library/jest-dom';
import { beforeAll, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// CRITICAL: Extend ONLY the matcher
// @ts-expect-error - jest-axe types don't perfectly match Vitest matcher signature
expect.extend({ toHaveNoViolations });

// Export axe separately
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
      dispatchEvent: () => false,
    }),
  });

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
