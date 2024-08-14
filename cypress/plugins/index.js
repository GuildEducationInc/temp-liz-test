const path = require('path');

const envFile = process.env.ENV_FILE || 'local';
require('dotenv').config({
  path: path.join(__dirname, '..', '..', 'env', `.env.${envFile}`),
});
const { plugin: axePlugin } = require('@guildeducationinc/guild-cypress-axe');

module.exports = (on, config) => {
  // pull cypress configs from .env file that start with CYPRESS_
  Object.keys(process.env).forEach(key => {
    if (key !== 'CYPRESS_ENV' && key.includes('CYPRESS_') && process.env[key]) {
      config.env[key.replace('CYPRESS_', '')] = process.env[key];
    }
  });

  // pull app variables from .env file that start with REACT_APP_
  Object.keys(process.env).forEach(key => {
    if (key.includes('REACT_APP_') && process.env[key]) {
      config.env[key] = process.env[key];
    }
  });

  // allow us to change the number of retires using an ENV var
  if (process.env.CYPRESS_RETRIES) {
    config.retries = parseInt(process.env.CYPRESS_RETRIES);
  }

  axePlugin(on);
  return config;
};
