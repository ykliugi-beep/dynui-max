import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynLabel } from './DynLabel';

describe('DynLabel', () => {
  it('renders with size and weight modifiers', () => {
    const { container } = render(
      <DynLabel size="lg" weight="semibold" htmlFor="input-id">
        Name
      </DynLabel>
    );

    const label = screen.getByText('Name');
    expect(label).toHaveAttribute('for', 'input-id');
    expect(container.firstChild).toHaveClass(
      'dyn-label--size-lg',
      'dyn-label--weight-semibold'
    );
  });

  it('displays required indicator when required', () => {
    render(
      <DynLabel required>Name</DynLabel>
    );

    expect(screen.getByLabelText('Required field')).toBeInTheDocument();
  });
});
