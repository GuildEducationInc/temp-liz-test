const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { version: recessVersion } = require('@guildeducationinc/recess/package.json');

const reactEnvVars = require('./envLoader').loadReactVars(process.env); // automatically load anything with REACT_APP_xxxx
const segmentScript = require('./segmentScript');
const packageJson = require('../package.json');

const isDevelopment = process.env.NODE_ENV === 'development';
const styleLoader = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader;

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [path.join(__dirname, '..', 'node_modules')],
    },
  },
};

module.exports = {
  entry: {
    app: [
      path.join(__dirname, '..', 'src', 'polyfills.ts'),
      path.join(__dirname, '..', 'src', 'index.ts'),
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@src': path.resolve(__dirname, '..', 'src'),
    },
    /**
     * node polyfills are no longer included by default in Webpack 5+
     * these fallbacks are installed as required by 'jsonwebtoken' (guild auth)
     */
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [styleLoader, 'css-loader', 'postcss-loader', sassLoader],
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          styleLoader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          sassLoader,
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    /**
     * Fix 'process is not defined' error emanating from 'jsonwebtoken'.
     * (install 'process' before running the build)
     */
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.EnvironmentPlugin({
      ...reactEnvVars,
      BUILD_ENVIRONMENT: process.env.NODE_ENV || undefined,
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_PATH: `${process.env.PUBLIC_PATH || ''}/`,
    }),
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: isDevelopment,
      typescript: {
        configFile: path.join(__dirname, '..', 'tsconfig.json'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'assets', 'index.html'),
      templateParameters: {
        guildBaseUrl: process.env.REACT_APP_GUILD_BASE_URL,
        recessVersion,
        /**
         * Enable Segment analytics tracking if the Segment key is found.
         */
        segment: process.env.REACT_APP_SEGMENT_KEY
          ? segmentScript(
              process.env.REACT_APP_SEGMENT_KEY,
              process.env.REACT_APP_SEGMENT_PROXY_URL
            )
          : '',
        /**
         * Set the HTML root container + ID for remote local dev in isolation.
         */
        root: `<div id="${process.env.REACT_APP_REPO_NAME}-root"></div>`,
      },
      minify: !isDevelopment && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    /**
     * Define your MFE remote entry point: the corresponding
     * remote entry in the host must match the name below.
     */
    new ModuleFederationPlugin({
      name: 'remoteTemplate',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteTemplate': './src/bootstrap',
        './RemoteTemplateAppComponent': './src/bootstrapAppComponent',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
      },
    }),
  ],
};
