import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynContainer } from './DynContainer';

describe('DynContainer', () => {
  it('renders children with default centering', () => {
    const { container } = render(
      <DynContainer>
        <span>Content</span>
      </DynContainer>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'dyn-container',
      'dyn-container--size-md',
      'dyn-container--centered'
    );
  });

  it('supports fluid layout and polymorphic rendering', () => {
    const { container } = render(
      <DynContainer as="section" size="xl" centered={false} fluid>
        Section
      </DynContainer>
    );

    expect(container.firstChild).toHaveClass(
      'dyn-container--size-xl',
      'dyn-container--fluid'
    );
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
