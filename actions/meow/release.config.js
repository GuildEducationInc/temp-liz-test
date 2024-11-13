'use strict';

const baseConfig = require('@utils/release').baseConfig;

var packageName = require('./package.json').name;

// Set the GH_TOKEN for semantic-release
// Normally this is set in CI and in the terminal environment. For the POC,
// this repo was struggling to pick it up from the terminal environment after
// setting a new value from when it had expired. To save time, I just set it here.
process.env.GH_TOKEN = '';


module.exports = baseConfig(packageName);
