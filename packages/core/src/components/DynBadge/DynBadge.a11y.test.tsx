import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'jest-axe';
import { DynBadge } from './DynBadge';

describe('DynBadge Accessibility', () => {
  it('has no accessibility violations in default state', async () => {
    const { container } = render(<DynBadge>Accessible</DynBadge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with different variants', async () => {
    const { container } = render(
      <DynBadge variant="outline" color="primary">Status</DynBadge>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});