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
    link: baseTokens.colors.primary[500],
    linkHover: baseTokens.colors.primary[600]
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
    error: '#ef4444',    // Direct value instead of baseTokens.colors.error[500]
    success: '#10b981',  // Direct value instead of baseTokens.colors.success[500]
    warning: '#f59e0b'   // Direct value instead of baseTokens.colors.warning[500]
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
      disabled: baseTokens.colors.gray[100]
    }
  },
  feedback: {
    success: {
      bg: '#dcfce7',
      border: '#10b981',  // Direct value
      text: '#166534',
      icon: '#10b981'     // Direct value
    },
    warning: {
      bg: '#fef3c7',
      border: '#f59e0b',  // Direct value
      text: '#92400e',
      icon: '#f59e0b'     // Direct value
    },
    error: {
      bg: '#fee2e2',
      border: '#ef4444',  // Direct value
      text: '#991b1b',
      icon: '#ef4444'     // Direct value
    },
    info: {
      bg: '#dbeafe',
      border: '#3b82f6',  // Direct value
      text: '#1e40af',
      icon: '#3b82f6'     // Direct value
    }
  }
};

export default semanticTokens;
