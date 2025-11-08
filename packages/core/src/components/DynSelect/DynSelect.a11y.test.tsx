import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynSelect } from './DynSelect';
import userEvent from '@testing-library/user-event';


const OPTIONS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

describe('DynSelect Accessibility', () => {
  it('has no violations when closed', async () => {
    const { container } = render(
      <DynSelect options={OPTIONS} placeholder="Select" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when open and searchable', async () => {
    const user = userEvent.setup();
    const utils = render(
      <DynSelect options={OPTIONS} placeholder="Search" searchable />
    );

    await user.click(utils.getByRole('button', { name: 'Search' }));

    const results = await axe(utils.container);
    expect(results).toHaveNoViolations();
  });
});
