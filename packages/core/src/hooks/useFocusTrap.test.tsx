import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusTrap } from './useFocusTrap';

const TestComponent = ({ enabled = true }: { enabled?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, { enabled });

  return (
    <div ref={containerRef} data-testid="container">
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  );
};

describe('useFocusTrap', () => {
  it('traps focus within container', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const container = screen.getByTestId('container');
    const buttons = screen.getAllByRole('button');

    buttons[2].focus();
    await user.keyboard('{Tab}');

    expect(document.activeElement).toBe(buttons[0]);
  });

  it('can be disabled', async () => {
    const user = userEvent.setup();
    render(<TestComponent enabled={false} />);

    const container = screen.getByTestId('container');
    const buttons = screen.getAllByRole('button');

    buttons[2].focus();
    await user.keyboard('{Tab}');

    expect(document.activeElement).not.toBe(buttons[0]);
  });
});
