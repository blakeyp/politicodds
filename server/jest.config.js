module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/index.ts', // Ignore export barrel files
    '!src/server.ts', // Ignore Express server/config files
    '!src/app.ts',
    '!src/router.ts',
    '!src/config.ts'
  ]
}
