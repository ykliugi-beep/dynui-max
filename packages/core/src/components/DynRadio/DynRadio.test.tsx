import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynRadio, DynRadioGroup } from './DynRadio';

describe('DynRadio', () => {
  it('renders label and description with size modifiers', () => {
    const { container } = render(
      <DynRadio value="a" label="Option A" description="Description" size="lg" />
    );

    const radio = screen.getByRole('radio', { name: 'Option A' });
    expect(radio).toHaveAttribute('value', 'a');
    expect(container.firstChild).toHaveClass('dyn-radio--size-lg');
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('invokes onChange when selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynRadioGroup onChange={handleChange}>
        <DynRadio value="a" label="Option A" />
        <DynRadio value="b" label="Option B" />
      </DynRadioGroup>
    );

    const optionB = screen.getByRole('radio', { name: 'Option B' });
    await user.click(optionB);

    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('supports keyboard navigation within the group', async () => {
    const user = userEvent.setup();
    render(
      <DynRadioGroup defaultValue="a" orientation="horizontal">
        <DynRadio value="a" label="Option A" />
        <DynRadio value="b" label="Option B" />
        <DynRadio value="c" label="Option C" />
      </DynRadioGroup>
    );

    const optionA = screen.getByRole('radio', { name: 'Option A' });
    optionA.focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(screen.getByRole('radio', { name: 'Option C' })).toBeChecked();
  });
});
