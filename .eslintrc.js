const OFF = 0;
const WARN = 1;
const ERROR = 2;

/**
 * Default configuration settings and rules can be found in the eslint-config-guild respository:
 * https://github.com/GuildEducationInc/eslint-config-guild-typescript
 */
module.exports = {
  extends: ['@guildeducationinc/guild-typescript'],
  overrides: [
    {
      files: ['./*.js', 'webpack/**/*.js', 'cypress/**/*.js', '**/__mocks__/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    {
      files: ['./cypress/**'],
      rules: {
        'jest/expect-expect': OFF,
        'jest/valid-expect-in-promise': OFF,
        'testing-library/await-async-utils': OFF,
      },
    },
  ],
  rules: {
    // enforce chunk naming for dynamic imports
    'import/dynamic-import-chunkname': WARN,

    // determine 'devDependencies' vs 'dependencies' local to the project
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          './*.js',
          'cypress/**',
          '**/*.d.ts',
          '**/webpack.*.js',
          '**/*.test.*',
          '**/*.spec.*',
        ],
      },
    ],

    // enforce alphabetized imports
    'import/order': [
      ERROR,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@guildeducationinc/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],

    // jsx transform is enabled in this application: no need to enforce 'react-in-jsx-scope'
    'react/react-in-jsx-scope': OFF,
  },
  settings: {
    // resolve absolute import aliases defined in webpack
    'import/resolver': {
      webpack: {
        config: 'webpack/webpack.common.js',
      },
    },
  },
};
