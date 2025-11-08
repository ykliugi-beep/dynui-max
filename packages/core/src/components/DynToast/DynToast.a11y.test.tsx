import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DynToast } from './DynToast';

describe('DynToast Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <DynToast
        variant="success"
        title="Success"
        message="Operation completed"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});