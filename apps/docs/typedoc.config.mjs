// @ts-check

/**
 * TypeDoc Configuration (ESM)
 * @see https://typedoc.org/options/
 * @see https://typedoc-plugin-markdown.org/docs/options
 */

/** @type {Partial<import('typedoc').TypeDocOptions>} */
export default {
  // Entry points
  entryPoints: ['../../packages/core/src/index.ts'],
  entryPointStrategy: 'expand',
  
  // Output configuration
  out: './dist',
  name: 'DynUI-Max API Documentation',
  includeVersion: true,
  
  // Plugin configuration
  plugin: ['typedoc-plugin-markdown'],
  
  // Markdown plugin options
  outputFileStrategy: 'modules',
  fileExtension: '.md',
  entryFileName: 'index.md',
  modulesFileName: 'modules.md',
  hidePageHeader: false,
  hideBreadcrumbs: false,
  useCodeBlocks: true,
  expandObjects: false,
  expandParameters: false,
  
  // TypeDoc core options
  readme: '../../README.md',
  exclude: [
    '**/node_modules/**',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.stories.tsx'
  ],
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeInternal: true,
  
  // Organization
  cleanOutputDir: true,
  sort: ['source-order'],
  categorizeByGroup: true,
  categoryOrder: [
    'Theme',
    'Form Components',
    'Layout Components',
    'Navigation Components',
    'Data Display Components',
    'Utility Components',
    'Hooks',
    'Types'
  ],
  
  // Navigation
  navigation: {
    includeCategories: true,
    includeGroups: true,
    includeFolders: true
  },
  
  // Git integration
  gitRevision: 'main',
  sourceLinkTemplate: 'https://github.com/ykliugi-beep/dynui-max/blob/main/{path}#L{line}',
  
  // Validation
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: false
  }
};
