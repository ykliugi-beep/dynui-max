import { type FC, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import styles from './DynSpinner.module.css';

export interface DynSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner based on component size tokens */
  size?: ComponentSize;
  /** Color variant from semantic tokens */
  color?: ComponentColor;
  /** Accessible label displayed alongside the spinner */
  label?: string;
  /** Render spinner inline with text */
  inline?: boolean;
}

export const DynSpinner: FC<DynSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label,
  inline = false,
  className,
  role = 'status',
  'aria-live': ariaLive = 'polite',
  ...props
}) => {
  const hasLabel = typeof label === 'string' && label.trim().length > 0;
  const mergedLabel = hasLabel ? label : 'Loading';
  const inlineClass = styles['dyn-spinner--inline'];

  return (
    <div
      className={clsx(
        styles['dyn-spinner'],
        styles[`dyn-spinner--size-${size}`],
        styles[`dyn-spinner--color-${color}`],
        inline && inlineClass,
        className
      )}
      role={role}
      aria-live={ariaLive}
      aria-label={!hasLabel ? mergedLabel : undefined}
      {...props}
    >
      <span className={styles['dyn-spinner__visual']} aria-hidden="true" />
      <span
        className={clsx(
          styles['dyn-spinner__label'],
          !hasLabel && styles['dyn-spinner__label--visually-hidden']
        )}
      >
        {mergedLabel}
      </span>
    </div>
  );
};

DynSpinner.displayName = 'DynSpinner';
