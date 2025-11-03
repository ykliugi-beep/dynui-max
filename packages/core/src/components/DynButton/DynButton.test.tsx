import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynButton } from './DynButton';

expect.extend(toHaveNoViolations);

describe('DynButton', () => {
  it('renders correctly with default props', () => {
    render(<DynButton>Test Button</DynButton>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<DynButton onClick={handleClick}>Clickable</DynButton>);
    
    await fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports different variants', () => {
    const { container } = render(<DynButton variant="outline">Outline</DynButton>);
    const button = container.querySelector('.dyn-button');
    expect(button).toHaveClass('dyn-button--outline');
  });

  it('supports different sizes', () => {
    const { container } = render(<DynButton size="lg">Large</DynButton>);
    const button = container.querySelector('.dyn-button');
    expect(button).toHaveClass('dyn-button--lg');
  });

  it('handles disabled state', () => {
    render(<DynButton disabled>Disabled</DynButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<DynButton loading>Loading</DynButton>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    // Button should be disabled when loading
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn();
    render(<DynButton onClick={handleClick}>Keyboard</DynButton>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DynButton>Accessible Button</DynButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('maintains focus outline on keyboard navigation', () => {
    render(<DynButton>Focus Test</DynButton>);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
  });

  it('supports polymorphic rendering with as prop', () => {
    render(<DynButton as="a" href="/test">Link Button</DynButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies correct CSS classes for variants and sizes', () => {
    const { container } = render(
      <DynButton variant="ghost" size="sm" disabled>
        Complex Button
      </DynButton>
    );
    
    const button = container.querySelector('.dyn-button');
    expect(button).toHaveClass('dyn-button');
    expect(button).toHaveClass('dyn-button--ghost');
    expect(button).toHaveClass('dyn-button--sm');
    expect(button).toHaveClass('dyn-button--disabled');
  });
});