const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const path = require('path');
const webpackDevServerWaitpage = require('webpack-dev-server-waitpage');

// This is how the host dynamically finds the port for a local remote, don't change this!
process.title = process.env.REACT_APP_REPO_NAME;

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', 'public'),
    chunkFilename: '[name].js',
    publicPath: 'auto',
  },
  devServer: {
    setupMiddlewares: (middlewares, server) => {
      server.app.use(webpackDevServerWaitpage(server, { theme: 'dark' }));
      return middlewares;
    },
    port: process.env.PORT || 'auto',
    static: path.join(__dirname, '..', 'public'),
    hot: true,
    compress: true,
    open: true,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    devMiddleware: {
      writeToDisk: true, // needed for HMR
    },
  },
  stats: 'none',
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: process.env.REACT_APP_UPSTREAM_UPDATES
          ? [
              // /x1b[33m is Unicode yellow or orange and \x1b[7m puts the color back to default.
              '\x1b[33m Warning: This repository is behind the upstream branch. Please pull in changes from upstream/main as soon as possible.\x1b[0m',
            ]
          : undefined,
      },
    }),
  ],
  optimization: {
    emitOnErrors: false,
  },
};
