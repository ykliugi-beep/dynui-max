import '@testing-library/jest-dom';
import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// vitest-axe automatski doda matchere (toHaveNoViolations) na expect
import 'vitest-axe/extend-expect';

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// -------------------- TypeScript augmentation --------------------
// Make TypeScript aware of vitest-axe matchers (toHaveNoViolations)
import 'vitest';
import type { AxeMatchers } from 'vitest-axe/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// All environment mocks (registered once before tests run)
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated API (kept for some libs)
      removeListener: () => {}, // deprecated API
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {}
    })
  });

  // Simple localStorage mock
  const localStorageMock = {
    getItem: (key: string) => null,
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
    clear: () => {}
  };
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    writable: true,
    value: localStorageMock
  });

  // Mock ResizeObserver
  class ResizeObserverMock {
    observe() {
      /* no-op */
    }
    unobserve() {
      /* no-op */
    }
    disconnect() {
      /* no-op */
    }
  }
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value: ResizeObserverMock
  });

  // Mock IntersectionObserver
  class IntersectionObserverMock {
    constructor(callback?: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      // no-op
    }
    observe() {
      /* no-op */
    }
    unobserve() {
      /* no-op */
    }
    disconnect() {
      /* no-op */
    }
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: IntersectionObserverMock
  });
});

// Mock scrollTo for components that use scrolling (use vi.fn to inspect calls)
Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn()
});
