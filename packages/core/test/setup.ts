import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from 'jest-axe';

// Extend Vitest's expect with jest-axe matchers
expect.extend(matchers);

// Add type declarations for jest-axe matchers
declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}