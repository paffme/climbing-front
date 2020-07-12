module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2020',
    ecmaFeatures: {
      ecmaVersion: '2020',
      legacyDecorators: true,
      modules: true
    }
  },
  ignorePatterns: ['cypress/'],
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // préférer utiliser `plugin:vue/strongly-recommended` ou `plugin:vue/recommended` pour des règles stictes.
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-return-await': ['error'],
    'require-await': 'off',
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': ['off'],
    'import/no-mutable-exports': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-indent': 'off',
    'prettier/prettier': [
      'error',
      { semi: false, endOfLine: 'auto', trailingComma: 'none' }
    ]
  }
}
