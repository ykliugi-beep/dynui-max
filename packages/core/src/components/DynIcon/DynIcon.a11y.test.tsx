import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynIcon } from './DynIcon';
import { iconRegistry } from './iconRegistry';

expect.extend(toHaveNoViolations);

// Test icon
const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
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