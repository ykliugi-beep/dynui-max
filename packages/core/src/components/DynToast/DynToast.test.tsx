import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynToast } from './DynToast';

describe('DynToast', () => {
  it('renders toast with title and message', () => {
    render(
      <DynToast title="Success" message="Operation completed successfully" />
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <DynToast variant="success" title="Success" message="Done!" />
    );
    expect(container.firstChild).toHaveClass('dyn-toast--variant-success');
  });

  it('renders without actions when not provided', () => {
    render(
      <DynToast title="Info" message="Information message" />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});