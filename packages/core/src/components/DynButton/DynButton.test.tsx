import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynButton } from './DynButton';

const Icon = () => <span data-testid="icon" />;

describe('DynButton', () => {
  it('renders content with variant styling', () => {
    const { container } = render(
      <DynButton variant="outline" size="lg" color="secondary">
        Click me
      </DynButton>
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'dyn-button--variant-outline',
      'dyn-button--size-lg',
      'dyn-button--color-secondary'
    );
  });

  it('shows loading state and disables interactions', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynButton loading onClick={handleClick}>
        Loading
      </DynButton>
    );

    const button = screen.getByRole('button', { name: 'Loading' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icons when provided and supports polymorphic usage', () => {
    render(
      <DynButton as="a" href="#link" startIcon={<Icon />} endIcon={<Icon />}>
        Link button
      </DynButton>
    );

    const link = screen.getByRole('link', { name: 'Link button' });
    expect(link.tagName).toBe('A');
    expect(screen.getAllByTestId('icon')).toHaveLength(2);
  });
});
