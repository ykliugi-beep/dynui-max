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
    error: baseTokens.colors.error[500],
    success: baseTokens.colors.success[500],
    warning: baseTokens.colors.warning[500]
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
      border: baseTokens.colors.success[500],
      text: '#166534',
      icon: baseTokens.colors.success[500]
    },
    warning: {
      bg: '#fef3c7',
      border: baseTokens.colors.warning[500],
      text: '#92400e',
      icon: baseTokens.colors.warning[500]
    },
    error: {
      bg: '#fee2e2',
      border: baseTokens.colors.error[500],
      text: '#991b1b',
      icon: baseTokens.colors.error[500]
    },
    info: {
      bg: '#dbeafe',
      border: baseTokens.colors.info[500],
      text: '#1e40af',
      icon: baseTokens.colors.info[500]
    }
  }
};

export default semanticTokens;
