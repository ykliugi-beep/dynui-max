import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynBreadcrumbItem } from './DynBreadcrumbItem';

describe('DynBreadcrumbItem', () => {
  it('renders as link when href is provided', () => {
    render(<DynBreadcrumbItem href="/home">Home</DynBreadcrumbItem>);

    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('dyn-breadcrumb-item--link');
  });

  it('renders as button and handles clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynBreadcrumbItem onClick={handleClick}>Action</DynBreadcrumbItem>
    );

    const button = screen.getByRole('button', { name: 'Action' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('marks current item and respects disabled state', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynBreadcrumbItem onClick={handleClick} current disabled>
        Current
      </DynBreadcrumbItem>
    );

    const button = screen.getByRole('button', { name: 'Current' });
    expect(button).toHaveAttribute('aria-current', 'page');
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
