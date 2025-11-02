import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynCheckbox } from './DynCheckbox';

describe('DynCheckbox', () => {
  it('renders label and description with size modifiers', () => {
    render(
      <DynCheckbox
        label="Accept terms"
        description="Please read the agreement"
        size="lg"
        defaultChecked
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveClass('dyn-checkbox__input--size-lg');
    expect(screen.getByText('Please read the agreement')).toBeInTheDocument();
  });

  it('fires onChange for controlled usage', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<DynCheckbox checked={false} onChange={handleChange} label="Opt in" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Opt in' });
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('displays indeterminate state visually', () => {
    const { container } = render(
      <DynCheckbox indeterminate label="Mixed" />
    );

    expect(container.querySelector('.dyn-checkbox__indeterminate')).toBeInTheDocument();
  });
});
