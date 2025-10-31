/**
 * Style Dictionary v4 Configuration for DynUI-Max design tokens
 * Completely rewritten to be 100% compatible with Style Dictionary 4.4.0
 */

// Export a simple, working configuration
export default {
  source: ['src/tokens/**/*.json'],
  
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
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