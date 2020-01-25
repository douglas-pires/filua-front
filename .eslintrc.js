module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'off'
  }
}
