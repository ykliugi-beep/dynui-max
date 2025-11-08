import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynMenuItem } from './DynMenuItem';


describe('DynMenuItem Accessibility', () => {
  it('has no violations for standard item', async () => {
    const { container } = render(
      <DynMenuItem>Item</DynMenuItem>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for divider item', async () => {
    const { container } = render(
      <DynMenuItem divider />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
