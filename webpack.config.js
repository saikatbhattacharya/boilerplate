const path = require('path');
const env = require('./env');

// List of allowed environments
const allowedEnvs = ['dev', 'test', 'ci', 'qa', 'uat', 'production'];

// Get available configurations
const configs = {
  base: require(path.join(__dirname, 'cfg/base')),
  dev: require(path.join(__dirname, 'cfg/dev')),
  ci: require(path.join(__dirname, 'cfg/ci')),
  qa: require(path.join(__dirname, 'cfg/qa')),
  uat: require(path.join(__dirname, 'cfg/uat')),
  production: require(path.join(__dirname, 'cfg/production')),
  test: require(path.join(__dirname, 'cfg/test')),
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv() {
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig() {
  const usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig();
