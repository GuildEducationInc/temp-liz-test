/* eslint-disable import/order */
const { merge } = require('webpack-merge');
const path = require('path');

/**
 * process.env.NODE_ENV should be one of the following
 * 1. development | dev
 * 2. production | prod
 *
 * This variable determines if the webpack build will use production or development mode
 */
const envs = {
  development: 'dev',
  dev: 'dev',
  production: 'prod',
  prod: 'prod',
};

const nodeEnv = envs[process.env.NODE_ENV || 'development'];

/**
 * process.env.ENV_FILE represents the environment variables to be used when building your application
 * The options for this are (production | prod) | staging | local
 *
 * @default 'local'
 */

const envFiles = {
  production: 'prod',
  prod: 'prod',
  staging: 'staging',
  local: 'local',
};
const envFile = envFiles[process.env.ENV_FILE || 'local'];

require('dotenv').config({
  path: path.join(__dirname, 'env', `.env.${envFile}`),
});

const common = require('./webpack/webpack.common');
const envConfig = require(`./webpack/webpack.${nodeEnv}.js`);

module.exports = merge(common, envConfig);
