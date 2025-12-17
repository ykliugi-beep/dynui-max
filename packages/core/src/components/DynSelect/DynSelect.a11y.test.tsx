import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynSelect } from './DynSelect';
import userEvent from '@testing-library/user-event';

const OPTIONS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

describe('DynSelect Accessibility', () => {
  it('has no violations when closed', async () => {
    const { container } = render(
      <div aria-label="Select options">
        <DynSelect options={OPTIONS} placeholder="Select" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when open and searchable', async () => {
    const user = userEvent.setup();
    const utils = render(
      <div aria-label="Search options">
        <DynSelect options={OPTIONS} placeholder="Search" searchable />
      </div>
    );

    await user.click(utils.getByRole('button', { name: 'Search' }));

    const results = await axe(utils.container);
    expect(results).toHaveNoViolations();
  });
});
