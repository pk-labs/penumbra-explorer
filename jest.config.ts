import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    clearMocks: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/lib/graphql/generated/**',
        '!src/**/index.ts',
    ],
    coverageReporters: ['text', 'text-summary', 'lcov'],
    roots: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup.tsx'],
    testEnvironment: 'jsdom',
    testRegex: '.+\\.test\\.tsx?$',
    transform: {
        '\\.graphql$': '@graphql-tools/jest-transform',
    },
}

// @ts-expect-error Jest v30 config type not yet supported by Next.js
export default createJestConfig(config)
