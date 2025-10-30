import React, { forwardRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './DynModal.css';

export interface DynModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Close handler
   */
  onClose: () => void;
  
  /**
   * Modal size
   * @default 'md'
   */
  size?: ComponentSize | 'xl' | '2xl';
  
  /**
   * Modal content
   */
  children: React.ReactNode;
  
  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Custom portal target
   */
  portalTarget?: Element;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * ARIA attributes
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  /**
   * Test identifier
   */
  'data-testid'?: string;
}

/**
 * DynModal - Accessible modal dialog component
 * 
 * Features:
 * - Portal-based rendering
 * - Focus trap and restoration
 * - Keyboard navigation (Escape to close)
 * - Backdrop click to close
 * - Size variants using design tokens
 * - Body scroll lock
 * - ARIA dialog pattern
 */
export const DynModal = forwardRef<HTMLDivElement, DynModalProps>((
  {
    isOpen,
    onClose,
    size = 'md',
    children,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    portalTarget,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const modalRef = useFocusTrap({
    enabled: isOpen,
    returnFocus: true
  });
  
  // Handle escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);
  
  // Prevent content click from bubbling
  const handleContentClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
  
  // Add/remove event listeners
  useEffect(() => {
    if (!isOpen) return;
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
  
  // Combine refs
  const combinedRef = useCallback((node: HTMLDivElement | null) => {
    modalRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [modalRef, ref]);
  
  if (!isOpen) return null;
  
  const backdropClasses = clsx('dyn-modal-backdrop');
  
  const modalClasses = clsx(
    'dyn-modal',
    `dyn-modal--size-${size}`,
    className
  );
  
  const modal = (
    <div 
      className={backdropClasses}
      onClick={handleBackdropClick}
      data-testid={dataTestId}
    >
      <div
        ref={combinedRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onClick={handleContentClick}
        {...props}
      >
        {showCloseButton && (
          <button
            type="button"
            className="dyn-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <DynIcon name="x" size="md" />
          </button>
        )}
        
        <div className="dyn-modal__content">
          {children}
        </div>
      </div>
    </div>
  );
  
  // Render in portal
  const target = portalTarget || document.body;
  return createPortal(modal, target);
});

DynModal.displayName = 'DynModal';