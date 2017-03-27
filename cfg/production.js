const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const baseConfig = require('./base');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = _.merge({
  entry: [
    'bootstrap-loader',
    path.join(__dirname, '../src/index'),
  ],
  cache: false,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('app.css'),
  ],
}, baseConfig);

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [path.join(__dirname, '/../src')],
});

module.exports = config;
