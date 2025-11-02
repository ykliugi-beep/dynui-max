import { useEffect, RefObject } from 'react';

/**
 * Hook that handles clicks outside of the specified elements
 */
export function useClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside all refs
      const isOutside = refs.every(ref =>
        !ref.current || !ref.current.contains(target)
      );
      
      if (isOutside) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [refs, handler]);
}