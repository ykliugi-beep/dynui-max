import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import { useFocusTrap } from './useFocusTrap';
import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

interface ExampleProps {
  initiallyOpen?: boolean;
  returnFocus?: boolean;
}

const FocusTrapExample = ({ initiallyOpen = false, returnFocus = true }: ExampleProps) => {
  const [open, setOpen] = useState(initiallyOpen);
  const trapRef = useFocusTrap({ enabled: open, returnFocus });

  return (
    <div>
      <button type="button" data-testid="trigger" onClick={() => setOpen(true)}>
        Open
      </button>
      <button type="button" data-testid="outside">
        Outside
      </button>
      {open && (
        <div ref={trapRef} data-testid="trap">
          <button type="button">First</button>
          <button type="button">Second</button>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

describe('useFocusTrap', () => {
  it('focuses first element when trap is enabled', () => {
    render(<FocusTrapExample initiallyOpen />);

    expect(screen.getByText('First')).toHaveFocus();
  });

  it('keeps focus within the trap while open', async () => {
    const user = userEvent.setup();
    render(<FocusTrapExample initiallyOpen />);

    await user.tab();
    expect(screen.getByText('Second')).toHaveFocus();

    await user.tab();
    expect(screen.getByText('Close')).toHaveFocus();

    await user.tab();
    expect(screen.getByText('First')).toHaveFocus();
  });

  it('returns focus to trigger element when closed', async () => {
    const user = userEvent.setup();
    render(<FocusTrapExample returnFocus />);

    const trigger = screen.getByTestId('trigger');
    trigger.focus();
    await user.click(trigger);

    expect(screen.getByText('First')).toHaveFocus();

    await user.click(screen.getByText('Close'));
    expect(trigger).toHaveFocus();
  });
});
