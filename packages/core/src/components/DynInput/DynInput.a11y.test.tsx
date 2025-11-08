import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynInput } from './DynInput';
import { DynIcon } from '../DynIcon';


describe('DynInput Accessibility', () => {
  it('has no violations with icons and placeholder', async () => {
    const { container } = render(
      <DynInput
        placeholder="Search"
        startIcon={<DynIcon name="search" />}
        endIcon={<DynIcon name="x" />}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when clearable and loading', async () => {
    const { container } = render(
      <DynInput defaultValue="value" clearable loading aria-label="Loading input" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
