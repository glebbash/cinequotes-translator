/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsConfig)

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper,
}
