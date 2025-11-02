import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import styles from './DynProgress.module.css';

export interface DynProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value */
  value?: number;
  /** Minimum progress value */
  min?: number;
  /** Maximum progress value */
  max?: number;
  /** Display an indeterminate animation */
  indeterminate?: boolean;
  /** Whether to display textual progress */
  showLabel?: boolean;
  /** Accessible label describing the progress */
  label?: string;
  /** Size variant using spacing tokens */
  size?: ComponentSize;
  /** Color variant mapped to semantic tokens */
  color?: ComponentColor;
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const DynProgress: React.FC<DynProgressProps> = ({
  value = 0,
  min = 0,
  max = 100,
  indeterminate = false,
  showLabel = true,
  label,
  size = 'md',
  color = 'primary',
  className,
  ...props
}) => {
  const { percentage, ariaNow, ariaText } = useMemo(() => {
    if (indeterminate || max <= min) {
      return {
        percentage: 0,
        ariaNow: undefined,
        ariaText: label
      };
    }

    const clamped = clamp(value, min, max);
    const percent = ((clamped - min) / (max - min)) * 100;
    const rounded = Math.round(percent);
    return {
      percentage: percent,
      ariaNow: clamped,
      ariaText: label ?? `${rounded}%`
    };
  }, [indeterminate, max, min, value, label]);

  const containerClassName = clsx(
    styles['dyn-progress'],
    styles[`dyn-progress--size-${size}`],
    styles[`dyn-progress--color-${color}`],
    {
      [styles['dyn-progress--indeterminate']]: indeterminate
    },
    className
  );

  return (
    <div
      className={containerClassName}
      role="progressbar"
      aria-valuemin={indeterminate ? undefined : min}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={ariaNow}
      aria-valuetext={ariaText}
      {...props}
    >
      <div className={styles['dyn-progress__track']}>
        <div
          className={styles['dyn-progress__indicator']}
          style={{ width: indeterminate ? undefined : `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
      {showLabel && (
        <span className={styles['dyn-progress__label']}>
          {ariaText ?? 'Loading'}
        </span>
      )}
    </div>
  );
};

DynProgress.displayName = 'DynProgress';
