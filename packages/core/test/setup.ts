import '@testing-library/jest-dom';
import { expect } from 'vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import type { AxeMatchers } from 'jest-axe';

// Import jest-axe properly
import * as jestAxe from 'jest-axe';

// Extend expect with jest-axe matchers
expect.extend(jestAxe);

// Type declarations
declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}