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

export { DynFieldContainer } from './components/DynFieldContainer';
export type { DynFieldContainerProps } from './components/DynFieldContainer';

export { DynStepper, DynStep } from './components/DynStepper';
export type { DynStepperProps, DynStepProps } from './components/DynStepper';

// Types and utilities
export type { Theme, ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';

// Version
export const VERSION = '0.1.0';