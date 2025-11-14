import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import styles from './DynCard.module.css';

type CardVariant = 'elevated' | 'outlined' | 'subtle';

type CornerRadius = ComponentSize | 'none' | 'full' | 'xl' | '2xl';

export interface DynCardProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Visual treatment of the card surface */
  variant?: CardVariant;
  /** Padding scale that maps to spacing tokens */
  padding?: ComponentSize;
  /** Corner radius scale */
  radius?: CornerRadius;
  /** Optional media section rendered above the header */
  media?: ReactNode;
  /** Optional header area, rendered above the content */
  header?: ReactNode;
  /** Primary title text. Rendered inside the header when provided */
  title?: ReactNode;
  /** Subtitle text rendered below the title */
  subtitle?: ReactNode;
  /** Action area placed on the right side of the header */
  actions?: ReactNode;
  /** Footer content rendered below the main body */
  footer?: ReactNode;
  /** Allow keyboard interactivity when rendered as a non-interactive element */
  interactive?: boolean;
  /** Change the underlying element type */
  as?: ElementType;
}

const radiusToClass: Record<CornerRadius, string> = {
  none: 'dyn-card--radius-none',
  sm: 'dyn-card--radius-sm',
  md: 'dyn-card--radius-md',
  lg: 'dyn-card--radius-lg',
  xl: 'dyn-card--radius-xl',
  '2xl': 'dyn-card--radius-2xl',
  full: 'dyn-card--radius-full'
};

export const DynCard = forwardRef<HTMLElement, DynCardProps>(
  (
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
    const radiusClass = radiusToClass[radius] ?? radiusToClass.lg;

    const classNames = clsx(
      styles['dyn-card'],
      styles[`dyn-card--variant-${variant}`],
      styles[`dyn-card--padding-${padding}`],
      styles[radiusClass],
      {
        [styles['dyn-card--interactive']]: interactive
      },
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

    const baseProps: HTMLAttributes<HTMLElement> = {
      role: interactive ? 'group' : undefined,
      tabIndex: interactive ? 0 : undefined,
    };

    return (
      <Component
        ref={ref}
        className={classNames}
        {...baseProps}
        {...(interactive ? { 'data-interactive': 'true' } : {})}
        {...props}
      >
        {media && <div className={styles['dyn-card__media']}>{media}</div>}
        {headerContent}
        {children && <div className={styles['dyn-card__body']}>{children}</div>}
        {footer && <div className={styles['dyn-card__footer']}>{footer}</div>}
      </Component>
    );
  }
);

DynCard.displayName = 'DynCard';
