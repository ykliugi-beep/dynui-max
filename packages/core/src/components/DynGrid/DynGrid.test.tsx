import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynGrid, DynGridItem } from './DynGrid';

describe('DynGrid', () => {
  it('renders grid with columns and gap classes', () => {
    const { container } = render(
      <DynGrid columns={6} gap="lg" data-testid="grid">
        <span>Item</span>
      </DynGrid>
    );

    expect(container.firstChild).toHaveClass('dyn-grid--columns-6', 'dyn-grid--gap-lg');
  });

  it('applies responsive styles when provided', () => {
    const { container } = render(
      <DynGrid responsive={{ sm: 2, md: 4 }}>
        Content
      </DynGrid>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.getPropertyValue('--grid-columns-sm')).toBe('2');
    expect(element.style.getPropertyValue('--grid-columns-md')).toBe('4');
  });
});

describe('DynGridItem', () => {
  it('renders with span and offset classes', () => {
    render(
      <DynGrid>
        <DynGridItem span={3} offset={1}>
          Grid item
        </DynGridItem>
      </DynGrid>
    );

    const item = screen.getByText('Grid item').parentElement;
    expect(item).toHaveClass('dyn-grid-item--span-3', 'dyn-grid-item--offset-1');
  });

  it('applies responsive style variables', () => {
    render(
      <DynGrid>
        <DynGridItem responsive={{ sm: 2, lg: 6 }}>
          Responsive item
        </DynGridItem>
      </DynGrid>
    );

    const item = screen.getByText('Responsive item').parentElement as HTMLElement;
    expect(item.style.getPropertyValue('--grid-span-sm')).toBe('2');
    expect(item.style.getPropertyValue('--grid-span-lg')).toBe('6');
  });
});
