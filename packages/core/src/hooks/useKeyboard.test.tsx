import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render } from '../test/test-utils';
import { useKeyboard } from './useKeyboard';

const TestComponent = ({
  enabled = true,
  target = 'document' as const,
  keyValue = 'k'
}: {
  enabled?: boolean;
  target?: 'window' | 'document';
  keyValue?: string;
}) => {
  const [count, setCount] = useState(0);
  useKeyboard(
    keyValue,
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

  it('rebinds listeners when the key changes', () => {
    const { rerender } = render(<TestComponent keyValue="a" />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(document.querySelector('[data-count="1"]')).toBeInTheDocument();

    rerender(<TestComponent keyValue="b" />);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(document.querySelector('[data-count="1"]')).toBeInTheDocument();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(document.querySelector('[data-count="2"]')).toBeInTheDocument();
  });

  it('activates listeners when enabled toggles from false to true', () => {
    const { rerender } = render(<TestComponent enabled={false} />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(document.querySelector('[data-count="0"]')).toBeInTheDocument();

    rerender(<TestComponent enabled />);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(document.querySelector('[data-count="1"]')).toBeInTheDocument();
  });

  it('cleans up listeners when component unmounts', () => {
    const handler = vi.fn();

    const CustomComponent = () => {
      useKeyboard('z', handler);
      return null;
    };

    const { unmount } = render(<CustomComponent />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
    expect(handler).toHaveBeenCalledTimes(1);

    unmount();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
