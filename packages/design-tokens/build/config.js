import StyleDictionary from 'style-dictionary';

/**
 * Style Dictionary configuration for DynUI-Max design tokens
 * Consolidated registration to avoid import timing issues.
 */

// 1) Register custom transforms
StyleDictionary.registerTransform({
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transformer: (token) => `dyn-${token.path.join('-')}`
});

StyleDictionary.registerTransform({
  name: 'size/px-to-rem',
  type: 'value',
  matcher: (token) => token.attributes?.category === 'size' && typeof token.value === 'string' && token.value.endsWith('px'),
  transformer: (token) => `${parseFloat(token.value) / 16}rem`
});

StyleDictionary.registerTransform({
  name: 'font/family/css',
  type: 'value',
  matcher: (token) => token.attributes?.category === 'font' && token.attributes?.type === 'family',
  transformer: (token) => token.value
});

// 2) Register transform group using only valid names
StyleDictionary.registerTransformGroup({
  name: 'dyn/css',
  transforms: [
    'attribute/cti',      // built-in
    'name/cti/dyn-kebab', // custom
    'time/seconds',       // built-in
    'content/icon',       // built-in
    'size/px-to-rem',     // custom
    'font/family/css',    // custom
    'color/hex'           // built-in
  ]
});

// 3) Themed CSS formatter
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: ({ dictionary, options }) => {
    const { selector = ':root', theme } = options;
    const tokens = theme
      ? dictionary.allTokens.filter(t => !t.attributes?.theme || t.attributes.theme === theme)
      : dictionary.allTokens;
    const cssVars = tokens.map(t => `  --${t.name}: ${t.value};`).join('\n');
    return `/* DynUI-Max Design Tokens - ${theme || 'all'} */\n${selector} {\n${cssVars}\n}`;
  }
});

// 4) Export config with verbose logging for diagnostics
export default {
  log: 'verbose',
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
        { destination: 'tokens.css', format: 'css/variables-themed', options: { selector: ':root' } },
        { destination: 'themes/light.css', format: 'css/variables-themed', options: { selector: '.theme-light, :root', theme: 'light' } },
        { destination: 'themes/dark.css', format: 'css/variables-themed', options: { selector: '.theme-dark', theme: 'dark' } }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [ { destination: 'tokens.js', format: 'javascript/es6' } ]
    }
  }
};