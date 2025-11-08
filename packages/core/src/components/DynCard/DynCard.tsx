import React from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import styles from './DynCard.module.css';

type CardVariant = 'elevated' | 'outlined' | 'subtle';
type CornerRadius = ComponentSize | 'none' | 'full' | 'xl' | '2xl';

export interface DynCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
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
  as?: React.ElementType;
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

export const DynCard = React.forwardRef<HTMLElement, DynCardProps>((
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
    as: Component = 'article',
    className,
    children,
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

  const dataProps = {
    ...(interactive ? { 'data-interactive': 'true' } : {})
  };

  return (
    <Component
      ref={ref}
      className={classNames}
      role={interactive ? 'group' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...dataProps}
      {...props}
    >
      {media && <div className={styles['dyn-card__media']}>{media}</div>}
      {headerContent}
      {children && <div className={styles['dyn-card__body']}>{children}</div>}
      {footer && <div className={styles['dyn-card__footer']}>{footer}</div>}
    </Component>
  );
});

DynCard.displayName = 'DynCard';
