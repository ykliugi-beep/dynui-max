import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynInput } from './DynInput';

const Icon = () => <span data-testid="icon" />;

describe('DynInput', () => {
  it('renders with variant styling and icons', () => {
    const { container } = render(
      <DynInput
        variant="filled"
        size="lg"
        startIcon={<Icon />}
        endIcon={<Icon />}
        placeholder="Enter text"
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('dyn-input--variant-filled');
    expect(container.firstChild).toHaveClass('dyn-input-container--variant-filled');
    expect(screen.getAllByTestId('icon')).toHaveLength(2);
  });

  it('supports controlled change handling', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynInput value="" onChange={handleChange} placeholder="Controlled" />
    );

    const input = screen.getByPlaceholderText('Controlled');
    await user.type(input, 'abc');

    expect(handleChange).toHaveBeenCalledWith('a');
    expect(handleChange).toHaveBeenLastCalledWith('abc');
  });

  it('shows clear button and triggers onClear', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(
      <DynInput defaultValue="value" clearable onClear={handleClear} />
    );

    const clearButton = screen.getByRole('button', { name: 'Clear input' });
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
