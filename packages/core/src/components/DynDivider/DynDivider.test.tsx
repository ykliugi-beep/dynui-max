import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynDivider } from './DynDivider';

describe('DynDivider', () => {
  it('renders horizontal divider with label', () => {
    const { container } = render(
      <DynDivider label="Section" labelPosition="left" variant="dashed" spacing="lg" />
    );

    expect(screen.getByText('Section')).toHaveClass('dyn-divider__label--left');
    expect(container.firstChild).toHaveClass(
      'dyn-divider--horizontal',
      'dyn-divider--dashed',
      'dyn-divider--with-label',
      'dyn-divider--spacing-lg'
    );
  });

  it('renders vertical divider without label', () => {
    render(<DynDivider orientation="vertical" />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });
});
