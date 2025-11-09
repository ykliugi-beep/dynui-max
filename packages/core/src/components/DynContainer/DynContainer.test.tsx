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
      'dyn-container--size-lg',
      'dyn-container--centered'
    );
  });

  it('supports size and centering props', () => {
    const { container } = render(
      <DynContainer size="xl" centered={false}>
        Section
      </DynContainer>
    );
    expect(container.firstChild).toHaveClass(
      'dyn-container--size-xl'
    );
    expect(container.firstChild).not.toHaveClass(
      'dyn-container--centered'
    );
  });
});
