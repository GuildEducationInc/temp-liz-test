'use strict';

const baseConfig = require('@utils/release').baseConfig;

var packageName = require('./package.json').name;

console.log(process.env);


console.log('packageName:', packageName);
console.log('baseConfig:', baseConfig(packageName));

module.exports = baseConfig(packageName);
