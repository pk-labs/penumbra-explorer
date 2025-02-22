import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.config({
        extends: [
            'next/core-web-vitals',
            'next/typescript',
            'plugin:prettier/recommended',
        ],
        plugins: ['simple-import-sort', 'perfectionist'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    varsIgnorePattern: '^_',
                },
            ],
            'import/no-anonymous-default-export': 'off',
            'perfectionist/sort-enums': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-heritage-clauses': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-interfaces': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-intersection-types': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-object-types': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-objects': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-union-types': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'perfectionist/sort-variable-declarations': [
                'error',
                {
                    type: 'natural',
                },
            ],
            'react/display-name': 'off',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-no-bind': 'warn',
            'react/jsx-no-target-blank': 'off',
            'react/jsx-sort-props': [
                'warn',
                {
                    reservedFirst: true,
                    shorthandLast: true,
                },
            ],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
                },
            ],
        },
    }),
    { ignores: ['src/lib/graphql/generated/'] },
]

export default eslintConfig
