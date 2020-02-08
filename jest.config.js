// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
/* eslint-disable */
module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1'
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*spec.ts']
}
