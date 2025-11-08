import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Extend Vitest's expect with jest-axe matcher
expect.extend({ toHaveNoViolations });

// Type declarations
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
}