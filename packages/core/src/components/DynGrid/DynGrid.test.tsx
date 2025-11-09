import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynGrid, DynGridItem } from './DynGrid';

describe('DynGrid', () => {
  it('renders children and columns', () => {
    const { container } = render(
      <DynGrid columns={3}>
        <DynGridItem><span>One</span></DynGridItem>
        <DynGridItem><span>Two</span></DynGridItem>
      </DynGrid>
    );

    expect(container.firstChild).toHaveClass('dyn-grid--columns-3');
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('renders grid item spans and offsets', () => {
    const { container } = render(
      <DynGrid>
        <DynGridItem span={2}><span>Double</span></DynGridItem>
        <DynGridItem offset={2}><span>Offset</span></DynGridItem>
      </DynGrid>
    );
    expect(container.querySelector('.dyn-grid-item--span-2')).toBeInTheDocument();
    expect(container.querySelector('.dyn-grid-item--offset-2')).toBeInTheDocument();
  });
});
