/**
 * Style Dictionary v4 Configuration for DynUI-Max design tokens
 * Completely rewritten to be 100% compatible with Style Dictionary 4.4.0
 */

import { initializeCustomTransforms } from './transforms.js';

// Ensure our custom transforms are registered before building
initializeCustomTransforms();

// Export a simple, working configuration
export default {
  source: ['src/tokens/**/*.json'],

  platforms: {
    css: {
      transformGroup: 'dyn/css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root'
          }
        },
        {
          destination: 'themes/light.css',
          format: 'css/variables',
          options: {
            selector: '.theme-light'
          }
        },
        {
          destination: 'themes/dark.css',
          format: 'css/variables',
          options: {
            selector: '.theme-dark'
          }
        }
      ]
    },

    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
};