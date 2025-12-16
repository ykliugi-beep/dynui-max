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

    const listener = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    const targetElement = target === 'window' ? window : document;
    targetElement.addEventListener('keydown', listener as EventListener);

    return () => {
      targetElement.removeEventListener('keydown', listener as EventListener);
    };
  }, [key, handler, enabled, target]);
}
