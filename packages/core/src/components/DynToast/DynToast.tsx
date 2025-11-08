import React, { forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import styles from './DynToast.module.css';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface DynToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  title?: React.ReactNode;
  message?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

const variantIcons: Record<ToastVariant, string> = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-triangle',
  error: 'times-circle'
};

export const DynToast = forwardRef<HTMLDivElement, DynToastProps>((
  {
    variant = 'info',
    title,
    message,
    duration = 5000,
    onClose,
    closable = true,
    className,
    children,
    ...props
  },
  ref
) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const classes = clsx(
    styles['dyn-toast'],
    styles[`dyn-toast--${variant}`],
    className
  );

  return (
    <div ref={ref} className={classes} role="alert" {...props}>
      <div className={styles['dyn-toast__icon']} aria-hidden="true">
        <DynIcon name={variantIcons[variant]} />
      </div>
      <div className={styles['dyn-toast__content']}>
        {title && <div className={styles['dyn-toast__title']}>{title}</div>}
        {message && <div className={styles['dyn-toast__message']}>{message}</div>}
        {children}
      </div>
      {closable && onClose && (
        <button
          className={styles['dyn-toast__close']}
          onClick={onClose}
          aria-label="Close notification"
          type="button"
        >
          <DynIcon name="times" />
        </button>
      )}
    </div>
  );
});

DynToast.displayName = 'DynToast';
