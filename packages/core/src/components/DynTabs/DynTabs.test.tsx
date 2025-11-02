import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTabs } from './DynTabs';

const ITEMS = [
  { value: 'overview', label: 'Overview', panel: <div>Overview content</div> },
  { value: 'details', label: 'Details', panel: <div>Details content</div> },
  { value: 'disabled', label: 'Disabled', panel: <div>Disabled content</div>, disabled: true }
];

describe('DynTabs', () => {
  it('renders tabs and switches panels on click', async () => {
    const user = userEvent.setup();

    render(<DynTabs items={ITEMS} defaultValue="overview" />);

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');

    await user.click(screen.getByRole('tab', { name: 'Details' }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Details content');
  });

  it('supports manual activation with keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynTabs items={ITEMS} activation="manual" defaultValue="overview" onChange={handleChange} />
    );

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    overviewTab.focus();
    await user.keyboard('{ArrowRight}{Enter}');

    expect(handleChange).toHaveBeenCalledWith('details');
  });
});
