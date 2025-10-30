import StyleDictionary from 'style-dictionary';

/**
 * Style Dictionary configuration for generating CSS variables and TypeScript
 * from design tokens
 */

// Register custom transforms
StyleDictionary.registerTransform({
  name: 'size/px-to-rem',
  type: 'value',
  matcher: (token) => {
    return token.attributes?.category === 'size' || token.type === 'dimension';
  },
  transformer: (token) => {
    if (typeof token.value === 'string' && token.value.endsWith('px')) {
      const pxValue = parseFloat(token.value);
      return `${pxValue / 16}rem`;
    }
    return token.value;
  }
});

// CSS variable name transform
StyleDictionary.registerTransform({
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transformer: (token, options) => {
    return `dyn-${token.path.join('-')}`;
  }
});

// Register CSS format for :root and theme classes
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: ({ dictionary, options }) => {
    const { selector = ':root' } = options;
    
    const cssVars = dictionary.allTokens
      .map(token => `  --${token.name}: ${token.value};`)
      .join('\n');
    
    return `${selector} {\n${cssVars}\n}`;
  }
});

export default {
  source: ['src/tokens/**/*.ts'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['name/cti/dyn-kebab', 'size/px-to-rem'],
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
            selector: '.theme-light, :root'
          }
        },
        {
          destination: 'themes/dark.css',
          format: 'css/variables-themed',
          options: {
            selector: '.theme-dark'
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