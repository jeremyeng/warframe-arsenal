/* eslint-env node */

'use strict';

module.exports = {
  extends: ['eslint:recommended', 'prettier', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module', // es6 import/export
  },
  parser: 'babel-eslint', // class properties
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
  },
  env: {
    jest: true,
  },
};
