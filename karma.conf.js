const webpackCfg = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    files: [
      './node_modules/whatwg-fetch/fetch.js',
      'test/loadtests.js',
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
      'test/loadtests.js': ['webpack', 'sourcemap'],
      'src/*.js': ['eslint'],
      'api/*.js': ['eslint'],
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'text-summary' },
      ],
    },
  });
};
