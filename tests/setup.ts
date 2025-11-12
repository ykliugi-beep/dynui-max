import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import 'vitest-axe/extend-expect';

// Register cleanup to reset the DOM after each test
afterEach(() => {
  cleanup();
});

// Mock matchMedia for components that use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback, options) {
    // Mock implementation
  }
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock
});

// Mock scrollTo for components that use scrolling
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn()
});

// ---------------------------------------------------------------------------------------------
// Vitest Axe type augmentation
//
// Vitest's assertion interface doesn't know about the custom matchers provided by
// vitest-axe. Without this module augmentation TypeScript will report that
// `toHaveNoViolations` does not exist on `Assertion<AxeResults>`, even though
// the matcher is available at runtime via extend-expect. This declaration
// merges the Axe matchers into Vitest's Assertion types, ensuring type safety
// for `.toHaveNoViolations()` calls in your tests.

import 'vitest';
import type { AxeMatchers } from 'vitest-axe/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
