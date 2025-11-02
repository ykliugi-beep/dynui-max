import { describe, it, expect } from 'vitest';
import { render } from '../test/test-utils';
import { useKeyboard } from './useKeyboard';
import React, { useState } from 'react';

const TestComponent = ({ enabled = true, target = 'document' as const }) => {
  const [count, setCount] = useState(0);
  useKeyboard(
    'k',
    () => {
      setCount((prev) => prev + 1);
    },
    { enabled, target }
  );

  return <div data-count={count}>Press</div>;
};

describe('useKeyboard', () => {
  it('invokes handler when key is pressed', async () => {
    render(<TestComponent />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));

    expect(document.querySelector('[data-count="1"]')).toBeInTheDocument();
  });

  it('does not trigger when disabled', async () => {
    render(<TestComponent enabled={false} />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));

    expect(document.querySelector('[data-count="0"]')).toBeInTheDocument();
  });

  it('supports window target', async () => {
    render(<TestComponent target="window" />);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));

    expect(document.querySelector('[data-count="1"]')).toBeInTheDocument();
  });
});
