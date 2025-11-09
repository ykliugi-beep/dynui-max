import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useFocusTrap());
    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBeNull();
  });

  it('accepts options parameter', () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        enabled: true,
        initialFocus: true,
        returnFocus: true
      })
    );
    expect(result.current).toHaveProperty('current');
  });

  it('can be disabled via options', () => {
    const { result } = renderHook(() =>
      useFocusTrap({ enabled: false })
    );
    expect(result.current).toHaveProperty('current');
  });
});