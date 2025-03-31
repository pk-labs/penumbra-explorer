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
    setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup.ts'],
    testEnvironment: 'jsdom',
    testRegex: '.+\\.test\\.tsx?$',
    transform: {
        '\\.graphql$': '@graphql-tools/jest-transform',
    },
}

export default createJestConfig(config)
