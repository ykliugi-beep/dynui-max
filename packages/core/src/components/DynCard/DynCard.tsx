import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import styles from './DynCard.module.css';

type CardVariant = 'elevated' | 'outlined' | 'subtle';
type CornerRadius = ComponentSize | 'none' | 'full' | 'xl' | '2xl';

export interface DynCardProps {
  variant?: CardVariant;
  padding?: ComponentSize;
  radius?: CornerRadius;
  media?: React.ReactNode;
  header?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const radiusToClass: Record<CornerRadius, string> = {
  xs: 'dyn-card--radius-xs',
  none: 'dyn-card--radius-none',
  sm: 'dyn-card--radius-sm',
  md: 'dyn-card--radius-md',
  lg: 'dyn-card--radius-lg',
  xl: 'dyn-card--radius-xl',
  '2xl': 'dyn-card--radius-2xl',
  full: 'dyn-card--radius-full'
};

export const DynCard = forwardRef<HTMLDivElement, DynCardProps>((
  {
    variant = 'elevated',
    padding = 'md',
    radius = 'lg',
    media,
    header,
    title,
    subtitle,
    actions,
    footer,
    interactive = false,
    className,
    children,
    onClick,
    ...props
  },
  ref
) => {
  const classNames = clsx(
    styles['dyn-card'],
    styles[`dyn-card--variant-${variant}`],
    styles[`dyn-card--padding-${padding}`],
    styles[radiusToClass[radius] ?? radiusToClass.lg],
    { [styles['dyn-card--interactive']]: interactive },
    className
  );

  const headerContent = header ?? (title || subtitle || actions ? (
    <div className={styles['dyn-card__header']}>
      <div className={styles['dyn-card__header-text']}>
        {title && <h3 className={styles['dyn-card__title']}>{title}</h3>}
        {subtitle && <p className={styles['dyn-card__subtitle']}>{subtitle}</p>}
      </div>
      {actions && <div className={styles['dyn-card__actions']}>{actions}</div>}
    </div>
  ) : null);

  return (
    <div
      ref={ref}
      className={classNames}
      role={interactive ? 'group' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      {...props}
    >
      {media && <div className={styles['dyn-card__media']}>{media}</div>}
      {headerContent}
      {children && <div className={styles['dyn-card__body']}>{children}</div>}
      {footer && <div className={styles['dyn-card__footer']}>{footer}</div>}
    </div>
  );
});

DynCard.displayName = 'DynCard';