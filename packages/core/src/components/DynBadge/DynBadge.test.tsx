import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynBadge } from './DynBadge';

describe('DynBadge', () => {
  it('renders children content', () => {
    render(<DynBadge>New</DynBadge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies size, color, and variant classes', () => {
    const { container } = render(
      <DynBadge size="lg" color="success" variant="outline" className="custom">Label</DynBadge>
    );
    expect(container.firstChild).toHaveClass(
      'dyn-badge',
      'dyn-badge--size-lg',
      'dyn-badge--color-success',
      'dyn-badge--variant-outline',
      'custom'
    );
  });

  it('renders as span element', () => {
    render(<DynBadge>Badge</DynBadge>);
    const badge = screen.getByText('Badge');
    expect(badge.tagName).toBe('SPAN');
  });

  it('applies default size and color', () => {
    const { container } = render(<DynBadge>Default</DynBadge>);
    expect(container.firstChild).toHaveClass(
      'dyn-badge--size-md',
      'dyn-badge--color-neutral'
    );
  });
});