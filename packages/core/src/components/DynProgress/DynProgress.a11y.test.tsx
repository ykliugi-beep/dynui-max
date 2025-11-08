import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynProgress } from './DynProgress';


describe('DynProgress Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynProgress value={30} max={60} label="Loading" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
