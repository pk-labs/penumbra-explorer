export default {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-idiomatic-order',
        'stylelint-config-tailwindcss',
    ],
    ignoreFiles: ['**/*.{mjs,ts,tsx}'],
    plugins: ['stylelint-prettier'],
    rules: {
        'at-rule-no-deprecated': null,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'apply',
                    'config',
                    'layer',
                    'reference',
                    'screen',
                    'source',
                    'tailwind',
                    'theme',
                ],
            },
        ],
        'no-descending-specificity': null,
        'prettier/prettier': [true, { singleQuote: false }],
    },
}
