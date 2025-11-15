import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynCheckbox } from './DynCheckbox';

describe('DynCheckbox Accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = render(
      <DynCheckbox label="Accessible checkbox" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with description and error state', async () => {
    const { container } = render(
      <DynCheckbox
        label="Email opt-in"
        description="Get updates via email"
        error
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
