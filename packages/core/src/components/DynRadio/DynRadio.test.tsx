import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynRadio, DynRadioGroup, useRadioGroupContext } from './DynRadio';

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

  it('omits undefined optional properties from the context value', () => {
    let capturedContext: ReturnType<typeof useRadioGroupContext> | undefined;

    const ContextProbe = () => {
      capturedContext = useRadioGroupContext();
      return null;
    };

    render(
      <DynRadioGroup defaultValue="a">
        <ContextProbe />
        <DynRadio value="a" label="Option A" />
      </DynRadioGroup>
    );

    expect(capturedContext).toBeDefined();
    expect(capturedContext).not.toHaveProperty('name');
    expect(capturedContext).not.toHaveProperty('size');
    expect(capturedContext).not.toHaveProperty('disabled');
    expect(capturedContext).not.toHaveProperty('error');
    expect(capturedContext).toMatchObject({
      value: 'a',
      onChange: expect.any(Function)
    });
  });

  it('includes optional properties in the context when provided', () => {
    let capturedContext: ReturnType<typeof useRadioGroupContext> | undefined;

    const ContextProbe = () => {
      capturedContext = useRadioGroupContext();
      return null;
    };

    render(
      <DynRadioGroup
        defaultValue="b"
        name="preferences"
        size="lg"
        disabled
        error
      >
        <ContextProbe />
        <DynRadio value="a" label="Option A" />
        <DynRadio value="b" label="Option B" />
      </DynRadioGroup>
    );

    expect(capturedContext).toMatchObject({
      name: 'preferences',
      size: 'lg',
      disabled: true,
      error: true
    });
  });
});
