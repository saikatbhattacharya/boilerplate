/* eslint "global-require": 0 */

const webpackCfg = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    files: [
      './node_modules/whatwg-fetch/fetch.js',
      'test/unit/loadtests.js',
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['phantomjs-shim', 'mocha', 'chai'],
    client: {
      mocha: {},
    },
    singleRun: true,
    reporters: ['mocha', 'coverage', 'osx'],
    mochaReporter: {
      showDiff: true,
      divider: '*',
    },
    preprocessors: {
      'test/unit/loadtests.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text' },
        { type: 'text-summary' },
      ],
    },
  });
};
