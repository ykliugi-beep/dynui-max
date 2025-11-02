import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynSpinner } from './DynSpinner';

expect.extend(toHaveNoViolations);

describe('DynSpinner Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DynSpinner label="Loading data" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
