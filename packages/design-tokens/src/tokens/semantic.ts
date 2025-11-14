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
    danger: baseTokens.colors.danger[500],
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
      bg: baseTokens.colors.success[100],
      border: baseTokens.colors.success[500],
      text: baseTokens.colors.success[800],
      icon: baseTokens.colors.success[500]
    },
    warning: {
      bg: baseTokens.colors.warning[100],
      border: baseTokens.colors.warning[500],
      text: baseTokens.colors.warning[800],
      icon: baseTokens.colors.warning[500]
    },
    danger: {
      bg: baseTokens.colors.danger[100],
      border: baseTokens.colors.danger[500],
      text: baseTokens.colors.danger[800],
      icon: baseTokens.colors.danger[500]
    }
  }
};

export default semanticTokens;
