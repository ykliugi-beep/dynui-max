import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynButton } from './DynButton';

describe('DynButton', () => {
  it('renders button with text', () => {
    render(<DynButton>Click me</DynButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<DynButton onClick={handleClick}>Click me</DynButton>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<DynButton size="sm">Small</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--size-sm');
    
    rerender(<DynButton size="lg">Large</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--size-lg');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<DynButton variant="solid">Solid</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--variant-solid');
    
    rerender(<DynButton variant="outline">Outline</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--variant-outline');
  });

  it('applies color classes correctly', () => {
    render(<DynButton color="primary">Primary</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--color-primary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<DynButton disabled>Disabled</DynButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<DynButton loading>Loading</DynButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with custom className', () => {
    render(<DynButton className="custom-class">Custom</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with fullWidth', () => {
    render(<DynButton fullWidth>Full Width</DynButton>);
    expect(screen.getByRole('button')).toHaveClass('dyn-button--full-width');
  });

  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<DynButton onClick={handleClick}>Keyboard</DynButton>);
    
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
