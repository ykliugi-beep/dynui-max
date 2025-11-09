import type { SemanticTokens } from '../types';
import baseTokens from './base';

/**
 * Semantic tokens - contextual meanings derived from base tokens
 * These reference base tokens and provide component-friendly aliases
 */
const semanticTokens: SemanticTokens = {
  text: {
    primary: baseTokens.colors.gray[900],
    secondary: baseTokens.colors.gray[600],
    tertiary: baseTokens.colors.gray[500],
    disabled: baseTokens.colors.gray[400],
    inverse: baseTokens.colors.white,
    link: baseTokens.colors.primary[600],
    linkHover: baseTokens.colors.primary[700]
  },
  background: {
    primary: baseTokens.colors.white,
    secondary: baseTokens.colors.gray[50],
    tertiary: baseTokens.colors.gray[100],
    inverse: baseTokens.colors.gray[900],
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  border: {
    primary: baseTokens.colors.gray[200],
    secondary: baseTokens.colors.gray[300],
    focus: baseTokens.colors.primary[500],
    error: baseTokens.colors.error[500] || '#ef4444',
    success: baseTokens.colors.success[500] || '#22c55e',
    warning: baseTokens.colors.warning[500] || '#f59e0b'
  },
  interactive: {
    primary: {
      default: baseTokens.colors.primary[500],
      hover: baseTokens.colors.primary[600],
      active: baseTokens.colors.primary[700],
      disabled: baseTokens.colors.gray[300]
    },
    secondary: {
      default: baseTokens.colors.gray[100],
      hover: baseTokens.colors.gray[200],
      active: baseTokens.colors.gray[300],
      disabled: baseTokens.colors.gray[50]
    }
  },
  feedback: {
    success: {
      bg: baseTokens.colors.success[50] || '#f0fdf4',
      border: baseTokens.colors.success[200] || '#bbf7d0',
      text: baseTokens.colors.success[700] || '#15803d',
      icon: baseTokens.colors.success[500] || '#22c55e'
    },
    warning: {
      bg: baseTokens.colors.warning[50] || '#fffbeb',
      border: baseTokens.colors.warning[200] || '#fde68a',
      text: baseTokens.colors.warning[800] || '#92400e',
      icon: baseTokens.colors.warning[500] || '#f59e0b'
    },
    error: {
      bg: baseTokens.colors.error[50] || '#fef2f2',
      border: baseTokens.colors.error[200] || '#fecaca',
      text: baseTokens.colors.error[700] || '#b91c1c',
      icon: baseTokens.colors.error[500] || '#ef4444'
    },
    info: {
      bg: baseTokens.colors.info[50] || '#eff6ff',
      border: baseTokens.colors.info[200] || '#bfdbfe',
      text: baseTokens.colors.info[700] || '#1d4ed8',
      icon: baseTokens.colors.info[500] || '#3b82f6'
    }
  }
};

export default semanticTokens;
