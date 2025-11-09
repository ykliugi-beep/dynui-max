import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynAvatar.css';

export interface DynAvatarProps {
  size?: ComponentSize | 'xl' | '2xl';
  src?: string;
  alt?: string;
  name?: string;
  fallback?: React.ReactNode;
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  tabIndex?: number;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const DynAvatar = forwardRef<HTMLDivElement, DynAvatarProps>((
  {
    size = 'md',
    src,
    alt = '',
    name,
    fallback,
    shape = 'circle',
    status,
    className,
    onClick,
    tabIndex,
    ...props
  },
  ref
) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const classes = clsx(
    'dyn-avatar',
    `dyn-avatar--size-${size}`,
    `dyn-avatar--shape-${shape}`,
    {
      'dyn-avatar--with-status': status,
      'dyn-avatar--loading': src && !imageLoaded && !imageError
    },
    className
  );

  const showImage = src && !imageError;
  const showInitials = !showImage && name;
  const showFallback = !showImage && !showInitials && fallback;

  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      tabIndex={onClick ? (tabIndex ?? 0) : undefined}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {showImage && (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="dyn-avatar__image"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {showInitials && (
        <span className="dyn-avatar__initials" aria-label={name}>
          {getInitials(name)}
        </span>
      )}
      {showFallback && (
        <span className="dyn-avatar__fallback">{fallback}</span>
      )}
      {status && (
        <span
          className={clsx('dyn-avatar__status', `dyn-avatar__status--${status}`)}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
});

DynAvatar.displayName = 'DynAvatar';
