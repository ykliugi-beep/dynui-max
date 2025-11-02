import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';

import { useClickOutside } from './useClickOutside';

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const attachedRef = useRef<HTMLDivElement>(null);
  const unattachedRef = useRef<HTMLDivElement>(null);

  useClickOutside([attachedRef, unattachedRef], onOutsideClick);

  return (
    <div>
      <div data-testid="inside" ref={attachedRef}>
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('triggers the outside click handler even when a ref is null', () => {
    const handleOutsideClick = vi.fn();

    const { getByTestId } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />
    );

    const inside = getByTestId('inside');
    const outside = getByTestId('outside');

    fireEvent.mouseDown(inside);
    expect(handleOutsideClick).not.toHaveBeenCalled();

    fireEvent.mouseDown(outside);
    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });
});
