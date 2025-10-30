import type { SemanticTokens } from '../types';
import baseTokens from './base';

/**
 * Semantic tokens - contextual meanings derived from base tokens
 * These reference base tokens and provide component-friendly aliases
 */
const semanticTokens: SemanticTokens = {
  color: {
    text: {
      primary: baseTokens.color.gray[900],
      secondary: baseTokens.color.gray[600], 
      muted: baseTokens.color.gray[500],
      inverse: baseTokens.color.white
    },
    background: {
      primary: baseTokens.color.white,
      secondary: baseTokens.color.gray[50],
      muted: baseTokens.color.gray[100],
      inverse: baseTokens.color.gray[900]
    },
    border: {
      primary: baseTokens.color.gray[200],
      secondary: baseTokens.color.gray[300],
      muted: baseTokens.color.gray[100]
    },
    feedback: {
      success: '#10b981', // green-500
      warning: '#f59e0b', // amber-500
      danger: '#ef4444',  // red-500
      info: baseTokens.color.primary[500]
    },
    interactive: {
      primary: baseTokens.color.primary[500],
      secondary: baseTokens.color.gray[100],
      hover: baseTokens.color.primary[600],
      active: baseTokens.color.primary[700],
      disabled: baseTokens.color.gray[300]
    }
  }
};

export default semanticTokens;