import StyleDictionary from 'style-dictionary';
import { initializeCustomTransforms } from './transforms.js';

/**
 * Style Dictionary configuration for DynUI-Max design tokens
 * Compatible with Style Dictionary 4.x and the catalog system
 */

// Initialize custom transforms and groups
initializeCustomTransforms();

// Register themed CSS format for light/dark themes
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: ({ dictionary, options }) => {
    const { selector = ':root', theme } = options;
    
    // Filter tokens by theme if specified
    const tokens = theme 
      ? dictionary.allTokens.filter(token => 
          !token.attributes?.theme || token.attributes.theme === theme
        )
      : dictionary.allTokens;
    
    const cssVars = tokens
      .map(token => `  --${token.name}: ${token.value};`)
      .join('\n');
    
    return `/* DynUI-Max Design Tokens - ${theme || 'All themes'} */\n${selector} {\n${cssVars}\n}`;
  }
});

export default {
  source: [
    'src/tokens/**/*.json',
    'src/tokens/**/*.js', 
    'src/tokens/**/*.ts'
  ],
  platforms: {
    css: {
      transformGroup: 'dyn/css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables-themed',
          options: {
            selector: ':root'
          }
        },
        {
          destination: 'themes/light.css', 
          format: 'css/variables-themed',
          options: {
            selector: '.theme-light, :root',
            theme: 'light'
          }
        },
        {
          destination: 'themes/dark.css',
          format: 'css/variables-themed', 
          options: {
            selector: '.theme-dark',
            theme: 'dark'
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    }
  }
};