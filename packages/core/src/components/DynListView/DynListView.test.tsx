import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynListView } from './DynListView';

const ITEMS = [
  { key: '1', title: 'Item 1', description: 'Description 1' },
  { key: '2', title: 'Item 2' }
];

describe('DynListView', () => {
  it('renders items and supports selection changes', async () => {
    const user = userEvent.setup();
    const handleSelection = vi.fn();

    render(
      <DynListView
        items={ITEMS}
        selectionMode="multiple"
        onSelectionChange={handleSelection}
      />
    );

    const firstItem = screen.getByText('Item 1');
    await user.click(firstItem);

    expect(handleSelection).toHaveBeenCalledWith(['1'], [ITEMS[0]]);
  });

  it('shows loading and empty states', () => {
    const { rerender } = render(
      <DynListView items={[]} loading />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    rerender(<DynListView items={[]} loading={false} emptyText="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('prevents interaction when items are disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynListView
        items={[{ key: '1', title: 'Disabled', disabled: true }]}
        onItemClick={handleClick}
        selectionMode="single"
      />
    );

    const item = screen.getByText('Disabled');
    await user.click(item);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
