import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynMenuItem } from './DynMenuItem';

describe('DynMenuItem Accessibility', () => {
  it('has no violations for standard item', async () => {
    const { container } = render(
      <div role="menu">
        <DynMenuItem>Item</DynMenuItem>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for divider item', async () => {
    const { container } = render(
      <div role="menu">
        <DynMenuItem divider />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
