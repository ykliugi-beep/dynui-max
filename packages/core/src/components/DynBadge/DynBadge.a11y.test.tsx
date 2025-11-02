import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynBadge } from './DynBadge';

expect.extend(toHaveNoViolations);

describe('DynBadge Accessibility', () => {
  it('has no accessibility violations in default state', async () => {
    const { container } = render(<DynBadge>Accessible</DynBadge>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when rendered as link', async () => {
    const { container } = render(
      <DynBadge as="a" href="#status">Status</DynBadge>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
