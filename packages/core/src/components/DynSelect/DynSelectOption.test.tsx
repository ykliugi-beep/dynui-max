import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynSelectOption } from './DynSelectOption';

const OPTION = { value: 'value', label: 'Label', description: 'Description' };

describe('DynSelectOption', () => {
  it('renders label and description with selection state', () => {
    const { container } = render(
      <DynSelectOption option={OPTION} selected highlighted />
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('dyn-select-option--selected', 'dyn-select-option--highlighted');
  });

  it('invokes onClick when activated and respects disabled state', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { rerender } = render(
      <DynSelectOption option={OPTION} onClick={handleClick} />
    );

    await user.click(screen.getByRole('option', { name: /Label/ }));
    expect(handleClick).toHaveBeenCalledWith(OPTION);

    rerender(
      <DynSelectOption option={{ ...OPTION, disabled: true }} onClick={handleClick} />
    );

    await user.click(screen.getByRole('option', { name: /Label/ }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
