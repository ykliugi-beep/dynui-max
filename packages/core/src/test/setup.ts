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
// Make TypeScript aware of vitest-axe matcher (toHaveNoViolations)
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): Promise<T>;
  }

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

// Register environment mocks once before tests run
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      // prefix unused params with _ to silence TS "unused" warnings
      addListener: (_: EventListenerOrEventListenerObject) => {},
      removeListener: (_: EventListenerOrEventListenerObject) => {},
      addEventListener: (_: string, __: EventListenerOrEventListenerObject) => {},
      removeEventListener: (_: string, __: EventListenerOrEventListenerObject) => {},
      dispatchEvent: (_: Event) => false
    })
  });

  // Simple localStorage mock (use _key/_value to avoid unused warnings)
  const localStorageMock = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    clear: () => {}
  };
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    writable: true,
    value: localStorageMock
  });

  // Mock ResizeObserver
  class ResizeObserverMock {
    observe() { /* no-op */ }
    unobserve() { /* no-op */ }
    disconnect() { /* no-op */ }
  }
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value: ResizeObserverMock
  });

  // Mock IntersectionObserver with typed constructor
  class IntersectionObserverMock {
    constructor(_callback?: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
      /* no-op */
    }
    observe() { /* no-op */ }
    unobserve() { /* no-op */ }
    disconnect() { /* no-op */ }
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: IntersectionObserverMock
  });

  // Mock scrollTo for components that use scrolling (vi.fn for spy)
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn()
  });
});
