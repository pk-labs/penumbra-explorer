export default {
  extends: ['stylelint-config-recommended', 'stylelint-config-idiomatic-order'],
  plugins: ['stylelint-prettier'],
  rules: {
    'no-descending-specificity': null,
    'prettier/prettier': [true, { singleQuote: false }],
  },
  ignoreFiles: ['**/*.{mjs,ts,tsx}'],
};
