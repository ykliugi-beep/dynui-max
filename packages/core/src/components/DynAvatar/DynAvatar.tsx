import { forwardRef, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynAvatar.css';

export interface DynAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ComponentSize;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
}

export const DynAvatar = forwardRef<HTMLDivElement, DynAvatarProps>((
  {
    size = 'md',
    src,
    alt = '',
    fallback,
    shape = 'circle',
    status,
    showStatus = false,
    className,
    ...props
  },
  ref
) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setImageLoaded(false);
      setImageError(false);
      return;
    }

    const img = imgRef.current;
    if (img?.complete && img?.naturalWidth) {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [src]);

  const classes = clsx(
    'dyn-avatar',
    `dyn-avatar--size-${size}`,
    `dyn-avatar--shape-${shape}`,
    {
      'dyn-avatar--with-status': showStatus && status,
      [`dyn-avatar--status-${status}`]: showStatus && status
    },
    className
  );

  const showFallback = !src || imageError || !imageLoaded;

  return (
    <div ref={ref} className={classes} {...props}>
      {!showFallback && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="dyn-avatar__image"
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            setImageLoaded(false);
            setImageError(true);
          }}
        />
      )}
      
      {showFallback && (
        <div className="dyn-avatar__fallback">
          {fallback || (
            <span className="dyn-avatar__initials">
              {alt?.charAt(0)?.toUpperCase() || '?'}
            </span>
          )}
        </div>
      )}
      
      {showStatus && status && (
        <span
          className={clsx(
            'dyn-avatar__status',
            `dyn-avatar__status--${status}`
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
});

DynAvatar.displayName = 'DynAvatar';
