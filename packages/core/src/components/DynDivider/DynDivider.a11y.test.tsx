import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynDivider } from './DynDivider';

describe('DynDivider Accessibility', () => {
  it('has no violations for horizontal divider', async () => {
    const { container } = render(<DynDivider label="Section" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for vertical divider', async () => {
    const { container } = render(
      <DynDivider orientation="vertical" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
