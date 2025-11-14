import { useRef, useEffect, MutableRefObject } from 'react';

interface UseFocusTrapOptions {
  enabled: boolean;
  returnFocus?: boolean;
}

/**
 * Hook for trapping focus within a container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  enabled,
  returnFocus = true
}: UseFocusTrapOptions): MutableRefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const previousActiveElement = useRef<Element | null>(null);
  
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    
    const container = containerRef.current;
    
    // Store the previously focused element
    previousActiveElement.current = document.activeElement;
    
    // Get all focusable elements within the container
    const getFocusableElements = () => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(',');
      
      return Array.from(
        container.querySelectorAll(focusableSelectors)
      ) as HTMLElement[];
    };
    
    // Handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      if (!firstElement) return;

      const lastElement = focusableElements[focusableElements.length - 1];
      if (!lastElement) return;

      if (event.shiftKey) {
        // Shift + Tab: moving backward
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: moving forward
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    if (firstElement) {
      firstElement.focus();
    }
    
    // Add event listener
    const listener = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    container.addEventListener('keydown', listener as EventListener);

    return () => {
      container.removeEventListener('keydown', listener as EventListener);

      // Return focus to the previously active element
      if (returnFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, returnFocus]);
  
  return containerRef;
}