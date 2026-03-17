import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['lib/**/*', 'esm/**/*', 'node_modules/**/*'],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'class-methods-use-this': 'off',
      'no-console': 'off',
      'max-len': ['error', { code: 100, ignoreStrings: true }],
      'implicit-arrow-linebreak': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      indent: ['error', 2, { flatTernaryExpressions: true }],
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-tabs': 'error',
      'no-param-reassign': 'off',
      'no-nested-ternary': 'off',
      'import/extensions': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'operator-linebreak': 'off',
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.*'] }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['src/**/*.test.ts'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
);
