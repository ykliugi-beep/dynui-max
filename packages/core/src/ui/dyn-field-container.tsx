import React from 'react';

/**
 * Field container component for wrapping form fields
 * @component
 * @example
 * ```tsx
 * <DynFieldContainer label="Email" required>
 *   <input type="email" placeholder="your@email.com" />
 * </DynFieldContainer>
 * ```
 */

export interface DynFieldContainerProps {
  /** Field label text */
  label?: string;
  /** Additional description text */
  description?: string;
  /** Error message (when field has validation error) */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Hint text shown below field */
  hint?: string;
  /** Form field children (input, textarea, select, etc.) */
  children: React.ReactNode;
  /** Unique label ID for accessibility */
  labelId?: string;
  /** Field ID for input/select associations */
  fieldId?: string;
  /** CSS class */
  className?: string;
  /** Field size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
}

const styles = `
  .dyn-field-container {
    display: flex;
    flex-direction: column;
    gap: var(--dyn-spacing-sm);
  }
  
  .dyn-field-container--sm {
    gap: var(--dyn-spacing-xs);
  }
  
  .dyn-field-container--lg {
    gap: var(--dyn-spacing-md);
  }
  
  .dyn-field-container--error {
    /* Error state styling */
  }
  
  .dyn-field-container--disabled {
    opacity: var(--dyn-opacity-disabled);
    cursor: not-allowed;
  }
  
  .dyn-field-container__label {
    display: flex;
    align-items: center;
    gap: var(--dyn-spacing-xs);
    font-weight: var(--dyn-font-weight-medium);
    font-size: var(--dyn-font-size-md);
    color: var(--dyn-color-text);
    margin: 0;
  }
  
  .dyn-field-container__label-text {
    /* Text label styling */
  }
  
  .dyn-field-container__required {
    color: var(--dyn-color-error);
    font-weight: var(--dyn-font-weight-bold);
    aria-label: 'required';
  }
  
  .dyn-field-container__description {
    font-size: var(--dyn-font-size-sm);
    color: var(--dyn-color-text-secondary);
    margin: 0;
    line-height: var(--dyn-line-height-normal);
  }
  
  .dyn-field-container__control {
    display: flex;
    flex-direction: column;
    gap: var(--dyn-spacing-xs);
  }
  
  .dyn-field-container__control input,
  .dyn-field-container__control textarea,
  .dyn-field-container__control select {
    padding: var(--dyn-spacing-md);
    border: 1px solid var(--dyn-color-border);
    border-radius: var(--dyn-size-radius-md);
    font-family: var(--dyn-font-family-sans);
    font-size: var(--dyn-font-size-md);
    color: var(--dyn-color-text);
    background-color: var(--dyn-color-surface);
    transition: border-color var(--dyn-duration-normal) ease,
                box-shadow var(--dyn-duration-normal) ease;
  }
  
  .dyn-field-container__control input:focus,
  .dyn-field-container__control textarea:focus,
  .dyn-field-container__control select:focus {
    outline: none;
    border-color: var(--dyn-color-primary-500);
    box-shadow: 0 0 0 3px var(--dyn-color-primary-100);
  }
  
  .dyn-field-container__control input:disabled,
  .dyn-field-container__control textarea:disabled,
  .dyn-field-container__control select:disabled {
    opacity: var(--dyn-opacity-disabled);
    cursor: not-allowed;
    background-color: var(--dyn-color-secondary);
  }
  
  .dyn-field-container--error .dyn-field-container__control input,
  .dyn-field-container--error .dyn-field-container__control textarea,
  .dyn-field-container--error .dyn-field-container__control select {
    border-color: var(--dyn-color-error);
  }
  
  .dyn-field-container--error .dyn-field-container__control input:focus,
  .dyn-field-container--error .dyn-field-container__control textarea:focus,
  .dyn-field-container--error .dyn-field-container__control select:focus {
    border-color: var(--dyn-color-error);
    box-shadow: 0 0 0 3px rgba(var(--dyn-color-error), 0.1);
  }
  
  .dyn-field-container__error {
    display: flex;
    align-items: center;
    gap: var(--dyn-spacing-xs);
    padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
    margin: 0;
    background-color: rgba(var(--dyn-color-error), 0.08);
    border-left: 3px solid var(--dyn-color-error);
    border-radius: var(--dyn-size-radius-sm);
    color: var(--dyn-color-error);
    font-size: var(--dyn-font-size-sm);
    line-height: var(--dyn-line-height-normal);
  }
  
  .dyn-field-container__hint {
    display: flex;
    align-items: center;
    gap: var(--dyn-spacing-xs);
    margin: 0;
    font-size: var(--dyn-font-size-xs);
    color: var(--dyn-color-text-secondary);
    line-height: var(--dyn-line-height-normal);
  }
`;

/**
 * DynFieldContainer Component
 * 
 * Wrapper component for form fields providing labels, errors, and hints.
 * Used to standardize form field presentation across the component library.
 */
export const DynFieldContainer = React.forwardRef<
  HTMLDivElement,
  DynFieldContainerProps
>(
  (
    {
      label,
      description,
      error,
      required = false,
      hint,
      children,
      labelId,
      fieldId,
      className = '',
      size = 'md',
      disabled = false,
    },
    ref
  ) => {
    const uniqueId = React.useMemo(() => fieldId || `field-${Math.random().toString(36).substr(2, 9)}`, [fieldId]);
    const errorId = error ? `${uniqueId}-error` : undefined;
    const descriptionId = description ? `${uniqueId}-description` : undefined;
    const hintId = hint ? `${uniqueId}-hint` : undefined;

    const ariaDescribedBy = [
      descriptionId,
      errorId,
      hintId,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={`dyn-field-container dyn-field-container--${size} ${
          error ? 'dyn-field-container--error' : ''
        } ${disabled ? 'dyn-field-container--disabled' : ''} ${className}`}
      >
        <style>{styles}</style>
        
        {label && (
          <label className="dyn-field-container__label" id={labelId}>
            <span className="dyn-field-container__label-text">{label}</span>
            {required && (
              <span
                className="dyn-field-container__required"
                aria-label="required"
                title="This field is required"
              >
                *
              </span>
            )}
          </label>
        )}
        
        {description && (
          <p
            className="dyn-field-container__description"
            id={descriptionId}
          >
            {description}
          </p>
        )}
        
        <div
          className="dyn-field-container__control"
          aria-describedby={ariaDescribedBy || undefined}
        >
          {/* Inject aria-describedby into child if it's an input-like element */}
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                id: fieldId,
                disabled: disabled || children.props.disabled,
              })
            : children}
        </div>
        
        {error && (
          <p
            className="dyn-field-container__error"
            id={errorId}
            role="alert"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
        
        {hint && !error && (
          <p className="dyn-field-container__hint" id={hintId}>
            <span>ℹ️</span>
            <span>{hint}</span>
          </p>
        )}
      </div>
    );
  }
);

DynFieldContainer.displayName = 'DynFieldContainer';
