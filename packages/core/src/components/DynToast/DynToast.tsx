import { type FC, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import styles from './DynToast.module.css';

type ToastStatus = 'info' | 'success' | 'warning' | 'danger';

export interface DynToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual status that maps to semantic tokens */
  status?: ToastStatus;
  /** Heading text displayed at the top of the toast */
  title?: ReactNode;
  /** Additional descriptive text */
  description?: ReactNode;
  /** Optional action buttons or links */
  actions?: ReactNode;
  /** Callback invoked when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
  /** Whether the toast should be announced assertively */
  urgent?: boolean;
}

const statusToRole: Record<ToastStatus, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert'
};

export const DynToast: FC<DynToastProps> = ({
  status = 'info',
  title,
  description,
  actions,
  onDismiss,
  dismissLabel = 'Dismiss notification',
  urgent = false,
  className,
  role,
  'aria-live': ariaLive,
  ...props
}) => {
  const computedRole = role ?? statusToRole[status];
  const liveRegion = ariaLive ?? (computedRole === 'alert' ? 'assertive' : urgent ? 'assertive' : 'polite');

  return (
    <div
      className={clsx(
        styles['dyn-toast'],
        styles[`dyn-toast--${status}`],
        className
      )}
      role={computedRole}
      aria-live={liveRegion}
      {...props}
    >
      <span className={styles['dyn-toast__indicator']} aria-hidden="true" />
      <div className={styles['dyn-toast__content']}>
        {title && <div className={styles['dyn-toast__title']}>{title}</div>}
        {description && <div className={styles['dyn-toast__description']}>{description}</div>}
        {actions && <div className={styles['dyn-toast__actions']}>{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className={styles['dyn-toast__dismiss']}
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <DynIcon name="x" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

DynToast.displayName = 'DynToast';
