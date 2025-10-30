import StyleDictionary from 'style-dictionary';

/**
 * Style Dictionary configuration for DynUI-Max design tokens
 * Compatible with Style Dictionary 4.x and TypeScript token sources
 */

// Register custom name transform for DynUI prefix
StyleDictionary.registerTransform({
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transformer: (token) => {
    return `dyn-${token.path.join('-')}`;
  }
});

// Register custom transform group with DynUI naming
StyleDictionary.registerTransformGroup({
  name: 'dyn/css',
  transforms: [
    'attribute/cti',        // Built-in: adds category/type/item attributes
    'name/cti/dyn-kebab',   // Custom: dyn- prefixed kebab-case names
    'time/seconds',         // Built-in: converts time values to seconds
    'content/icon',         // Built-in: wraps icon values in quotes
    'size/rem',            // Built-in: converts px to rem
    'color/hex'            // Built-in: ensures color values are hex
  ]
});

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
    
    return `${selector} {\n${cssVars}\n}`;
  }
});

export default {
  source: [
    'src/tokens/**/*.ts',
    'src/tokens/**/*.js',
    'src/tokens/**/*.json'
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
    },
    typescript: {
      transformGroup: 'js', 
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
};