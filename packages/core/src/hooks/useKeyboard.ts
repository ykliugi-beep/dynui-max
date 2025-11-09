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
    
    const handleKeyDown = (event: Event) => {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === key) {
        handler(keyEvent);
      }
    };
    
    const targetElement = target === 'window' ? window : document;
    targetElement.addEventListener('keydown', handleKeyDown as EventListener);
    
    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [key, handler, enabled, target]);
}
