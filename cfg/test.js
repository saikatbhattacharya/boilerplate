const path = require('path');

const srcPath = path.join(__dirname, '/../src');

const webpack = require('webpack');
const baseConfig = require('./base');

module.exports = {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'istanbul-instrumenter-loader',
        include: [
          path.join(__dirname, '/../src'),
        ],
        query: {
          esModules: true,
        },
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|sass|scss|less|styl)$/,
        loader: 'null-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test/unit'),
        ],
      },
    ],
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.(png|jpg|gif|woff|woff2|sass|scss|less|styl)$/,
        loader: 'null-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test/karma'),
        ],
      },
    ]),
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      actions: `${srcPath}/actions/`,
      helpers: path.join(__dirname, '/../test/helpers'),
      components: `${srcPath}/components/`,
      containers: `${srcPath}/containers/`,
      selectors: `${srcPath}/selectors/`,
      sources: `${srcPath}/sources/`,
      stores: path.join(__dirname, '/../test/stores'),
      styles: `${srcPath}/styles/`,
      config: `${srcPath}/config/${process.env.REACT_WEBPACK_ENV}`,
      utils: `${srcPath}/utils/`,
      reducers: `${srcPath}/reducers/`,
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/ReactContext/),
  ],
};
