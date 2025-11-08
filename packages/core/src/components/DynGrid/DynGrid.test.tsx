import { render, screen } from '@testing-library/react';
import { DynGrid } from './DynGrid';

describe('DynGrid', () => {
  it('renders with children', () => {
    render(
      <DynGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </DynGrid>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies column count', () => {
    render(
      <DynGrid columns={3}>
        <div>Item</div>
      </DynGrid>
    );

    expect(screen.getByText('Item').parentElement).toHaveStyle({
      gridTemplateColumns: 'repeat(3, 1fr)'
    });
  });

  it('applies responsive columns', () => {
    render(
      <DynGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <div>Item</div>
      </DynGrid>
    );

    const grid = screen.getByText('Item').parentElement;
    expect(grid).toHaveClass('dyn-grid--cols-xs-1');
    expect(grid).toHaveClass('dyn-grid--cols-sm-2');
  });

  it('applies gap size', () => {
    render(
      <DynGrid gap="lg">
        <div>Item</div>
      </DynGrid>
    );

    expect(screen.getByText('Item').parentElement).toHaveClass('dyn-grid--gap-lg');
  });
});
