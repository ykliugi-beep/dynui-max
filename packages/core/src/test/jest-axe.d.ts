import type { AxeResults } from 'axe-core';

declare global {
  namespace Vi {
    interface Assertion {
      toHaveNoViolations(): void;
    }
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): any;
    }
  }
}
