import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/lib/graphql/generated/**'],
    coverageReporters: ['text', 'text-summary', 'lcov'],
    roots: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup.ts'],
    testEnvironment: 'jsdom',
    testRegex: '.+\\.test\\.tsx?$',
    transform: {
        '^.+\\.graphql$': '@graphql-tools/jest-transform',
    },
}

export default createJestConfig(config)
