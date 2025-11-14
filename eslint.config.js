import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'storybook-static/**',
      'coverage/**',
      '**/*.d.ts',
      '**/turbo.json' // Ignoring legacy turbo config during transition
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: ['./tsconfig.json', './packages/*/tsconfig.json']
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint
    },
    rules: {
      // JavaScript/TypeScript base rules
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      
      // React specific rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      
      // TypeScript specific overrides
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // General code quality
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-console': 'warn',
      
      // Import/Export
      'no-duplicate-imports': 'error'
    }
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.stories.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    },
    rules: {
      // Relax rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off'
    }
  },
  {
    files: ['**/*.config.{js,ts}', '**/vite.config.{js,ts}', '**/vitest.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      // Config files can be more flexible
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off'
    }
  },
  // Apply prettier config to disable conflicting rules
  prettier
];