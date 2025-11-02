import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynSelect } from './DynSelect';

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', description: 'Citrus fruit' }
];

describe('DynSelect', () => {
  it('opens dropdown and selects option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynSelect options={OPTIONS} onChange={handleChange} placeholder="Choose" />
    );

    const trigger = screen.getByRole('button', { name: 'Choose' });
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Apple' }));

    expect(handleChange).toHaveBeenCalledWith('apple');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports multiple selection with search filtering', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynSelect
        options={OPTIONS}
        multiple
        searchable
        onChange={handleChange}
        placeholder="Select fruits"
      />
    );

    const trigger = screen.getByRole('button', { name: 'Select fruits' });
    await user.click(trigger);

    const search = screen.getByPlaceholderText('Search...');
    await user.type(search, 'ban');

    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Banana' }));

    expect(handleChange).toHaveBeenLastCalledWith(['banana']);
  });

  it('navigates options with keyboard', async () => {
    const user = userEvent.setup();

    render(
      <DynSelect options={OPTIONS} placeholder="Keyboard select" />
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard select' });
    await user.click(trigger);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(trigger).toHaveTextContent('Banana');
  });
});
