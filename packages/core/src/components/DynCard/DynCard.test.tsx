import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynCard } from './DynCard';
import styles from './DynCard.module.css';

describe('DynCard', () => {
  it('renders title, subtitle, body and footer content', () => {
    render(
      <DynCard title="Card Title" subtitle="Card subtitle" footer={<div>Footer</div>}>
        <p>Card body</p>
      </DynCard>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card subtitle')).toBeInTheDocument();
    expect(screen.getByText('Card body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies variant and padding classes', () => {
    const { container } = render(
      <DynCard variant="outlined" padding="lg">
        Content
      </DynCard>
    );

    const card = container.firstElementChild as HTMLElement;
    const outlinedVariantClass = styles['dyn-card--variant-outlined'];
    expect(outlinedVariantClass).toBeDefined();
    if (!outlinedVariantClass) {
      throw new Error('Outlined variant class should be defined');
    }

    const largePaddingClass = styles['dyn-card--padding-lg'];
    expect(largePaddingClass).toBeDefined();
    if (!largePaddingClass) {
      throw new Error('Large padding class should be defined');
    }

    expect(card).toHaveClass(outlinedVariantClass);
    expect(card).toHaveClass(largePaddingClass);
  });

  it('supports interactive mode with keyboard focus', () => {
    const { container } = render(
      <DynCard interactive title="Interactive card">
        Content
      </DynCard>
    );

    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute('tabindex', '0');
    expect(card.dataset['interactive']).toBe('true');
  });
});
