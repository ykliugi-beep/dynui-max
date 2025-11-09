import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynSpinner } from './DynSpinner';


describe('DynSpinner Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DynSpinner label="Loading data" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
