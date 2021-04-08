module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': 'warn',
    'no-cond-assign': ['error', 'except-parens'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'warn',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'warn',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all'
      }
    ],
    'spaced-comment': 'warn'
  }
}
