module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:node/recommended'],
  plugins: ['prettier', 'babel'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
  env: {
    jest: true,
  },
}
