export default {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-idiomatic-order',
    ],
    ignoreFiles: ['**/*.{mjs,ts,tsx}'],
    plugins: ['stylelint-prettier'],
    rules: {
        'no-descending-specificity': null,
        'prettier/prettier': [true, { singleQuote: false }],
    },
}
