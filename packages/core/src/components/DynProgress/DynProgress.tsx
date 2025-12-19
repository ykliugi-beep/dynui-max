import { useMemo, type FC, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import styles from './DynProgress.module.css';

export interface DynProgressProps extends HTMLAttributes<HTMLDivElement> {
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

export const DynProgress: FC<DynProgressProps> = ({
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
  const isInvalidRange = max <= min;
  const isIndeterminate = indeterminate || isInvalidRange;

  const { percentage, ariaNow, ariaText } = useMemo(() => {
    if (isIndeterminate) {
      return {
        percentage: 0,
        ariaNow: undefined,
        ariaText: label ?? 'Loading'
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
  }, [isIndeterminate, max, min, value, label]);

  const baseClass = styles['dyn-progress'];
  const sizeClass = styles[`dyn-progress--size-${size}`];
  const colorClass = styles[`dyn-progress--color-${color}`];
  const indeterminateClass = styles['dyn-progress--indeterminate'];

  const containerClassName = clsx(
    baseClass,
    sizeClass,
    colorClass,
    isIndeterminate && indeterminateClass,
    className
  );

  return (
    <div
      className={containerClassName}
      role="progressbar"
      aria-label={label ?? 'Progress'}
      aria-valuemin={isIndeterminate ? undefined : min}
      aria-valuemax={isIndeterminate ? undefined : max}
      aria-valuenow={ariaNow}
      aria-valuetext={ariaText}
      {...props}
    >
      <div className={styles['dyn-progress__track']}>
        <div
          className={styles['dyn-progress__indicator']}
          style={{ width: isIndeterminate ? undefined : `${percentage}%` }}
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
