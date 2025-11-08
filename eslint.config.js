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
      '**/turbo.json',
      'eslint.config.js'  // Exclude self from linting
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['eslint.config.js'],  // Don't parse config file with TS parser
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
        // Remove project - causes issues with config files
        // project: ['./tsconfig.json', './packages/*/tsconfig.json']
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // ✅ RELAKSIRANO - warnings umesto errors
      'react-refresh/only-export-components': 'off', // Ne blokiraj za ovo
      '@typescript-eslint/no-unused-vars': 'warn', // Warning umesto error
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'no-console': 'warn',
      'no-duplicate-imports': 'warn',
      'no-undef': 'warn' // ✅ Ovo je ključno - warning umesto error
    }
  },
  // ✅ TEST FILES - VITEST GLOBALS
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/*.a11y.test.{js,jsx,ts,tsx}',
      '**/*.enhanced.test.{js,jsx,ts,tsx}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        // ✅ DODAJ SPECIFIČNE TIPOVE
        StepData: 'readonly',
        TabItem: 'readonly',
        DynStepperRef: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // ✅ Potpuno isključi za testove
      'no-console': 'off',
      'no-undef': 'off' // ✅ Isključi za testove
    }
  },
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
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
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off'
    }
  },
  prettier
];
