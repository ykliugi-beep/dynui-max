import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynAvatar.css';

export interface DynAvatarProps {
  /**
   * Avatar size using design tokens
   * @default 'md'
   */
  size?: ComponentSize | 'xl' | '2xl';
  
  /**
   * Image source URL
   */
  src?: string;
  
  /**
   * Alt text for image
   */
  alt?: string;
  
  /**
   * Name to generate initials from
   */
  name?: string;
  
  /**
   * Custom initials (overrides name-based generation)
   */
  initials?: string;
  
  /**
   * Shape variant
   * @default 'circle'
   */
  shape?: 'circle' | 'square';
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * DynAvatar - User avatar component with image fallbacks
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Image with automatic fallback to initials
 * - Name-based initial generation
 * - Circle and square shapes
 * - Clickable variant
 * - Accessible alt text
 */
export const DynAvatar = forwardRef<HTMLDivElement, DynAvatarProps>((
  {
    size = 'md',
    src,
    alt,
    name,
    initials,
    shape = 'circle',
    className,
    onClick,
    ...props
  },
  ref
) => {
  const [imageError, setImageError] = useState(false);
  
  // Generate initials from name
  const getInitials = () => {
    if (initials) return initials;
    if (!name) return '?';
    
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const showImage = src && !imageError;
  const displayInitials = getInitials();
  
  const classes = clsx(
    'dyn-avatar',
    `dyn-avatar--size-${size}`,
    `dyn-avatar--shape-${shape}`,
    {
      'dyn-avatar--clickable': Boolean(onClick)
    },
    className
  );
  
  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="dyn-avatar__image"
          onError={handleImageError}
        />
      ) : (
        <span className="dyn-avatar__initials" aria-label={alt || name}>
          {displayInitials}
        </span>
      )}
    </div>
  );
});

DynAvatar.displayName = 'DynAvatar';