import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynMenu } from './DynMenu';
import { DynIcon } from '../DynIcon';

const ITEMS = [
  { value: 'edit', label: 'Edit', icon: <DynIcon name="edit" /> },
  { value: 'duplicate', label: 'Duplicate', description: 'Create a copy' },
  { value: 'delete', label: 'Delete', disabled: true }
];

describe('DynMenu', () => {
  it('renders trigger and selects items', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DynMenu items={ITEMS} trigger="Open menu" onSelect={handleSelect} />
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(handleSelect).toHaveBeenCalledWith('edit');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation and closes on escape', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DynMenu items={ITEMS} trigger="Keyboard" onSelect={handleSelect} />
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard' });
    await user.click(trigger);
    await user.keyboard('{ArrowDown}{Enter}');

    expect(handleSelect).toHaveBeenCalledWith('edit');

    await user.click(trigger);
    await user.keyboard('{ArrowDown}{ArrowDown}{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
