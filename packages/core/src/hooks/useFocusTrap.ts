import { useEffect, RefObject } from 'react';

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

export interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocus?: boolean;
  returnFocus?: boolean;
}

export function useFocusTrap(
  elementRef: RefObject<HTMLElement>,
  options: UseFocusTrapOptions = {}
) {
  const {
    enabled = true,
    initialFocus = true,
    returnFocus = true
  } = options;

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const element = elementRef.current;
    const previousActiveElement = document.activeElement as HTMLElement;

    // Get focusable elements
    const getFocusableElements = () => {
      return Array.from(
        element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
      ).filter(el => !el.hasAttribute('disabled'));
    };

    // Set initial focus
    if (initialFocus) {
      const focusableElements = getFocusableElements();
      focusableElements[0]?.focus();
    }

    // Trap focus
    const handleKeyDown = (event: Event) => {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (keyEvent.shiftKey) {
        if (document.activeElement === firstElement) {
          keyEvent.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          keyEvent.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown as EventListener);

    // Return focus on unmount
    return () => {
      element.removeEventListener('keydown', handleKeyDown as EventListener);
      if (returnFocus && previousActiveElement) {
        previousActiveElement?.focus();
      }
    };
  }, [elementRef, enabled, initialFocus, returnFocus]);
}
