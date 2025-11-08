import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynMenuItem } from './DynMenuItem';
import { DynIcon } from '../DynIcon';

describe('DynMenuItem', () => {
  it('renders menu item with text', () => {
    render(
      <ul role="menu">
        <DynMenuItem>Menu Item</DynMenuItem>
      </ul>
    );
    expect(screen.getByRole('menuitem')).toHaveTextContent('Menu Item');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ul role="menu">
        <DynMenuItem onClick={handleClick} icon={<DynIcon name="settings" />}>
          Settings
        </DynMenuItem>
      </ul>
    );

    await user.click(screen.getByRole('menuitem'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ul role="menu">
        <DynMenuItem disabled onClick={handleClick}>
          Disabled Item
        </DynMenuItem>
      </ul>
    );

    await user.click(screen.getByRole('menuitem'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with icon', () => {
    render(
      <ul role="menu">
        <DynMenuItem icon={<DynIcon name="home" />}>
          Home
        </DynMenuItem>
      </ul>
    );
    expect(screen.getByRole('menuitem')).toBeInTheDocument();
  });

  it('renders with keyboard shortcut', () => {
    render(
      <ul role="menu">
        <DynMenuItem shortcut="Ctrl+S">
          Save
        </DynMenuItem>
      </ul>
    );
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('renders as active', () => {
    render(
      <ul role="menu">
        <DynMenuItem active>
          Active Item
        </DynMenuItem>
      </ul>
    );
    expect(screen.getByRole('menuitem')).toHaveClass('dyn-menu-item--active');
  });

  it('renders as disabled', () => {
    render(
      <ul role="menu">
        <DynMenuItem disabled>
          Disabled Item
        </DynMenuItem>
      </ul>
    );
    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toHaveClass('dyn-menu-item--disabled');
    expect(menuItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders as divider', () => {
    render(
      <ul role="menu">
        <DynMenuItem divider />
      </ul>
    );
    expect(screen.getByRole('separator')).toHaveClass('dyn-menu-item--divider');
  });

  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ul role="menu">
        <DynMenuItem onClick={handleClick}>
          Item
        </DynMenuItem>
      </ul>
    );

    const menuItem = screen.getByRole('menuitem');
    menuItem.focus();
    expect(menuItem).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(
      <ul role="menu">
        <DynMenuItem className="custom-class">
          Item
        </DynMenuItem>
      </ul>
    );
    expect(screen.getByRole('menuitem')).toHaveClass('custom-class');
  });
});