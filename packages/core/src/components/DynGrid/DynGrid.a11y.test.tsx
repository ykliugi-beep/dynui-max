import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynGrid, DynGridItem } from './DynGrid';

describe('DynGrid Accessibility', () => {
  it('has no violations for basic grid layout', async () => {
    const { container } = render(
      <DynGrid>
        <DynGridItem>Item 1</DynGridItem>
        <DynGridItem>Item 2</DynGridItem>
      </DynGrid>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with responsive configuration', async () => {
    const { container } = render(
      <DynGrid responsive={{ sm: 2 }}>
        <DynGridItem responsive={{ sm: 2 }}>Responsive</DynGridItem>
      </DynGrid>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
