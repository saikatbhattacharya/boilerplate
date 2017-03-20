const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const baseConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8100',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './src/index',
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('app.css'),
  ],
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [path.join(__dirname, '/../src')],
});

module.exports = config;
