/**
 * DynUI-Max Core Components
 * 
 * Production-ready React + TypeScript component library
 * with design tokens integration and comprehensive a11y support.
 */

// Theme Provider and Context
export { ThemeProvider, useTheme } from './theme';

// Core Components (P0 Prerequisites)
export { DynIcon } from './components/DynIcon';
export type { DynIconProps } from './components/DynIcon';
export { iconRegistry } from './components/DynIcon/iconRegistry';

export { DynFieldContainer } from './components/DynFieldContainer';
export type { DynFieldContainerProps } from './components/DynFieldContainer';

export { DynStepper, DynStep } from './components/DynStepper';
export type { DynStepperProps, DynStepProps, StepData, StepStatus } from './components/DynStepper';

// Form Components
export { DynButton } from './components/DynButton';
export type { DynButtonProps } from './components/DynButton';

export { DynInput } from './components/DynInput';
export type { DynInputProps, InputVariant } from './components/DynInput';

export { DynTextArea } from './components/DynTextArea';
export type { DynTextAreaProps } from './components/DynTextArea';

export { DynSelect } from './components/DynSelect';
export type { DynSelectProps, DynSelectRef, SelectOption } from './components/DynSelect';

export { DynCheckbox } from './components/DynCheckbox';
export type { DynCheckboxProps } from './components/DynCheckbox';

export { DynRadio, DynRadioGroup } from './components/DynRadio';
export type { DynRadioProps, DynRadioGroupProps } from './components/DynRadio';

// Layout & Display Components
export { DynModal } from './components/DynModal';
export type { DynModalProps } from './components/DynModal';

export { DynBadge } from './components/DynBadge';
export type { DynBadgeProps } from './components/DynBadge';

export { DynAvatar } from './components/DynAvatar';
export type { DynAvatarProps } from './components/DynAvatar';

export { DynDivider } from './components/DynDivider';
export type { DynDividerProps } from './components/DynDivider';

// Hooks
export { useClickOutside } from './hooks/useClickOutside';
export { useKeyboard } from './hooks/useKeyboard';
export { useFocusTrap } from './hooks/useFocusTrap';

// Types and utilities from design tokens
export type { 
  Theme, 
  ComponentVariant, 
  ComponentSize, 
  ComponentColor,
  BaseTokens,
  SemanticTokens
} from '@dynui-max/design-tokens';

// Version
export const VERSION = '0.1.0';