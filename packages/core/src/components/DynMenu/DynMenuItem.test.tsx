import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynMenuItem } from './DynMenuItem';

const Icon = () => <span data-testid="icon" />;

describe('DynMenuItem', () => {
  it('calls onClick with value when activated', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynMenuItem value="edit" onClick={handleClick} icon={<Icon />}>
        Edit
      </DynMenuItem>
    );

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(handleClick).toHaveBeenCalledWith('edit');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('acts as divider when specified and ignores clicks when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { rerender } = render(
      <DynMenuItem divider data-testid="divider" />
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();

    rerender(
      <DynMenuItem value="delete" disabled onClick={handleClick}>
        Delete
      </DynMenuItem>
    );

    const button = screen.getByRole('menuitem', { name: 'Delete' });
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
