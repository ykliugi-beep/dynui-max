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

  it('supports rendering as a different element', () => {
    render(<DynBadge as="a" href="#link">Link</DynBadge>);

    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#link');
  });
});
