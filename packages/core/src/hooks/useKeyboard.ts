import { useEffect } from 'react';

/**
 * Hook for handling keyboard events
 */
export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: {
    enabled?: boolean;
    target?: 'window' | 'document';
  } = {}
) {
  const { enabled = true, target = 'document' } = options;
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    const eventListener: EventListener = (event) => {
      if (event instanceof KeyboardEvent) {
        handleKeyDown(event);
      }
    };

    const targetElement = target === 'window' ? window : document;
    targetElement.addEventListener('keydown', eventListener);

    return () => {
      targetElement.removeEventListener('keydown', eventListener);
    };
  }, [key, handler, enabled, target]);
}