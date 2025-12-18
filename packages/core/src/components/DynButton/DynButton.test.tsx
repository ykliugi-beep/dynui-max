import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { KeyboardEvent } from 'react';
import { axe } from 'vitest-axe';
import { DynButton } from './DynButton';

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
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<DynButton onClick={handleClick}>Keyboard</DynButton>);

    const button = screen.getByRole('button');
    button.focus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('activates on keyboard interaction when rendered as non-button element', async () => {
    const handleClick = vi.fn();
    render(
      <DynButton as="div" role="button" tabIndex={0} onClick={handleClick}>
        Div Button
      </DynButton>
    );

    const button = screen.getByRole('button', { name: 'Div Button' });

    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    await fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('allows custom keydown handlers to prevent manual activation', async () => {
    const handleClick = vi.fn();
    const handleKeyDown = vi.fn((event: KeyboardEvent) => {
      event.preventDefault();
    });

    render(
      <DynButton
        as="div"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        Prevented Button
      </DynButton>
    );

    const button = screen.getByRole('button', { name: 'Prevented Button' });

    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
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
