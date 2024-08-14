module.exports = {
  customSyntax: 'postcss-scss',
  extends: '@guildeducationinc/stylelint-config-guild',
  ignoreFiles: ['src/**/*.{snap,ts,tsx,js,jsx}'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'], // this is a valid pseudo class via 'css modules'
      },
    ],
  },
};
