import { expect } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe/matchers';
import '@testing-library/jest-dom';
import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Extend Vitest expect with axe matchers
expect.extend({ toHaveNoViolations });

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
});

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
      addListener: (_: EventListenerOrEventListenerObject) => {},
      removeListener: (_: EventListenerOrEventListenerObject) => {},
      addEventListener: (_: string, __: EventListenerOrEventListenerObject) => {},
      removeEventListener: (_: string, __: EventListenerOrEventListenerObject) => {},
      dispatchEvent: (_: Event) => false
    })
  });

  // Simple localStorage mock
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

  if (typeof HTMLCanvasElement !== 'undefined') {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      writable: true,
      value: vi.fn()
    });
  }

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

  // Mock IntersectionObserver
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

  // Mock scrollTo
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn()
  });
});
