import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynLabel } from './DynLabel';

describe('DynLabel Accessibility', () => {
  it('has no violations in basic usage', async () => {
    const { container } = render(
      <DynLabel htmlFor="field">Label</DynLabel>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when required and disabled', async () => {
    const { container } = render(
      <DynLabel required disabled>
        Disabled label
      </DynLabel>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
