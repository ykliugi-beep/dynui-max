import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynGrid, DynGridItem } from './DynGrid';

describe('DynGrid', () => {
  it('renders grid with children', () => {
    render(
      <DynGrid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </DynGrid>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies default 12 columns', () => {
    render(
      <DynGrid data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('dyn-grid--columns-12');
  });

  it('applies custom number of columns', () => {
    render(
      <DynGrid columns={6} data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('dyn-grid--columns-6');
  });

  it('supports responsive columns configuration', () => {
    const responsive = { xs: 1, sm: 2, md: 3, lg: 4 };
    render(
      <DynGrid responsive={responsive} data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('dyn-grid--responsive');
  });

  it('applies gap classes', () => {
    render(
      <DynGrid gap="lg" data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('dyn-grid--gap-lg');
  });

  it('applies separate row and column gaps', () => {
    render(
      <DynGrid rowGap="sm" columnGap="lg" data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('dyn-grid--row-gap-sm');
    expect(grid).toHaveClass('dyn-grid--column-gap-lg');
  });

  it('renders with custom className', () => {
    render(
      <DynGrid className="custom-grid" data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('custom-grid');
  });

  it('renders as different element when as prop is provided', () => {
    render(
      <DynGrid as="section" data-testid="grid">
        <div>Content</div>
      </DynGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid.tagName).toBe('SECTION');
  });
});

describe('DynGridItem', () => {
  it('renders grid item with children', () => {
    render(
      <DynGrid>
        <DynGridItem data-testid="item">Item Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toBeInTheDocument();
    expect(screen.getByText('Item Content')).toBeInTheDocument();
  });

  it('applies default span of 1', () => {
    render(
      <DynGrid>
        <DynGridItem data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toHaveClass('dyn-grid-item--span-1');
  });

  it('applies custom span', () => {
    render(
      <DynGrid>
        <DynGridItem span={6} data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toHaveClass('dyn-grid-item--span-6');
  });

  it('applies offset', () => {
    render(
      <DynGrid>
        <DynGridItem offset={2} data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toHaveClass('dyn-grid-item--offset-2');
  });

  it('supports responsive span configuration', () => {
    const responsive = { sm: 12, md: 6, lg: 4 };
    render(
      <DynGrid>
        <DynGridItem responsive={responsive} data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toHaveClass('dyn-grid-item--responsive');
  });

  it('renders with custom className', () => {
    render(
      <DynGrid>
        <DynGridItem className="custom-item" data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    expect(screen.getByTestId('item')).toHaveClass('custom-item');
  });

  it('renders as different element when as prop is provided', () => {
    render(
      <DynGrid>
        <DynGridItem as="article" data-testid="item">Content</DynGridItem>
      </DynGrid>
    );
    const item = screen.getByTestId('item');
    expect(item.tagName).toBe('ARTICLE');
  });
});