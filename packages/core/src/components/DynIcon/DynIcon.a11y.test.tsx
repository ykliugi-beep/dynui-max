import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynIcon } from './DynIcon';
import { iconRegistry } from './iconRegistry';
import type { SVGProps } from 'react';

// Test icon
const TestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props}>
    <circle cx="10" cy="10" r="5" />
  </svg>
);

describe('DynIcon Accessibility', () => {
  beforeEach(() => {
    iconRegistry.register('test', TestIcon);
  });

  it('has no accessibility violations with title', async () => {
    const { container } = render(
      <DynIcon name="test" title="Test icon" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations as decorative', async () => {
    const { container } = render(
      <DynIcon name="test" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides proper role when title is present', async () => {
    const { container } = render(
      <div>
        <DynIcon name="test" title="Accessible icon" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});