/**
 * Style Dictionary v4 Configuration for DynUI-Max design tokens
 * Fixed to work with Style Dictionary 4.4.0
 */
import StyleDictionary from 'style-dictionary';

/**
 * Custom transform for kebab-case naming with dyn prefix
 */
const dynKebabTransform = {
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transform: (token) => `dyn-${token.path.join('-')}`
};

/**
 * Custom transform for px to rem conversion
 */
const pxToRemTransform = {
  name: 'size/px-to-rem',
  type: 'value',
  filter: (token) => {
    return token.type === 'dimension' && 
           typeof token.value === 'string' && 
           token.value.endsWith('px');
  },
  transform: (token) => `${parseFloat(token.value) / 16}rem`
};

/**
 * Custom transform for font family CSS formatting
 */
const fontFamilyTransform = {
  name: 'font/family/css',
  type: 'value',
  filter: (token) => {
    return token.type === 'fontFamily';
  },
  transform: (token) => token.value
};

/**
 * Custom transform group for DynUI tokens
 */
const dynCssTransformGroup = {
  name: 'dyn/css',
  transforms: [
    'attribute/cti',
    'name/cti/dyn-kebab',
    'time/seconds',
    'html/icon',  // renamed from content/icon in v4
    'size/px-to-rem',
    'font/family/css',
    'color/hex'
  ]
};

/**
 * Custom format for themed CSS variables
 */
const themedCssFormat = {
  name: 'css/variables-themed',
  format: ({ dictionary, options = {} }) => {
    const { selector = ':root', theme } = options;
    
    let tokens = dictionary.allTokens;
    if (theme) {
      tokens = tokens.filter(token => {
        return !token.attributes?.theme || token.attributes.theme === theme;
      });
    }
    
    const cssVars = tokens
      .map(token => `  --${token.name}: ${token.value};`)
      .join('\n');
    
    return `/* DynUI-Max Design Tokens - ${theme || 'all'} */\n${selector} {\n${cssVars}\n}`;
  }
};

/**
 * Create and configure StyleDictionary instance
 */
const sd = new StyleDictionary({
  // Enable verbose logging for debugging
  log: {
    verbosity: 'verbose'
  },
  
  // Source files
  source: [
    'src/tokens/**/*.json',
    'src/tokens/**/*.js',
    'src/tokens/**/*.ts'
  ],
  
  // Platform configurations
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
  },
  
  // Register custom hooks
  hooks: {
    transforms: {
      [dynKebabTransform.name]: dynKebabTransform,
      [pxToRemTransform.name]: pxToRemTransform,
      [fontFamilyTransform.name]: fontFamilyTransform
    },
    transformGroups: {
      [dynCssTransformGroup.name]: dynCssTransformGroup
    },
    formats: {
      [themedCssFormat.name]: themedCssFormat
    }
  }
});

// Build the tokens
sd.buildAllPlatforms();

export default sd;