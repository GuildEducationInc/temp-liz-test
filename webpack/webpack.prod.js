const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [
  new CssMinimizerPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].min.css',
  }),
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
];

if (process.env.WEBPACK_REPORT) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    publicPath: `${process.env.PUBLIC_PATH || ''}/`,
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    /**
     * Note: The 'runtimeChunk' optimization is excluded here as it
     * will break the host's connection to remote entries.
     */
  },
  plugins,
};
