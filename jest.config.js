const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, 'env', '.env.staging'),
});

const esModules = ['es-cookie/'].join('|');

module.exports = {
  cacheDirectory: 'jest-cache',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx,jsx}',
    '!src/polyfills.ts',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/bootstrap.tsx',
    'src/bootstrapAppComponent.tsx',
    'src/App.tsx',
    'src/index.ts',
    'src/components/Providers/GraphqlProvider.tsx',
    'src/graphql/queries',
    'src/routes/routesConfig.ts',
    'src/constants',
    'src/testHelpers',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
    '^@src[/](.+)': '<rootDir>/src/$1',
    '^node_modules[/](.+)': '<rootDir>/node_modules/$1',
  },
  preset: 'ts-jest/presets/js-with-ts',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/setupJest.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true, // disable type checking for improved performance
      },
    ],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
