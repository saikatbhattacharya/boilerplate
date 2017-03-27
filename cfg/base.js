const path = require('path');
const sass = require('./sass.js');

const port = 8100;
const srcPath = path.join(__dirname, '/../src');
const publicPath = '/assets/';
const sassMixins = [
  'vendor-prefixes',
  'forms',
  'buttons',
  'clearfix',
  'grid',
];

module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath,
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port,
    publicPath,
    proxy: {
      '*': {
        target: 'http://localhost:3100',
      },
    },
    noInfo: false,
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
    ],
    alias: {
      actions: `${srcPath}/actions/`,
      components: `${srcPath}/components/`,
      containers: `${srcPath}/containers/`,
      selectors: `${srcPath}/selectors/`,
      sources: `${srcPath}/sources/`,
      stores: `${srcPath}/stores/`,
      styles: `${srcPath}/styles/`,
      config: `${srcPath}/config/${process.env.NODE_ENV}`,
      helpers: `${srcPath}/helpers/`,
      utils: `${srcPath}/utils/`,
      reducers: `${srcPath}/reducers/`,
    },
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.sass/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [sass.loadVariables(), ...sass.loadMixins(sassMixins)],
            },
          },
        ],
      },
      {
        test: /\.scss/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=expanded',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [sass.loadVariables(), ...sass.loadMixins(sassMixins)],
            },
          },
        ],
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader',
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        query: {
          outputPath: 'fonts/',
          publicPath: '../fonts', // That's the important part
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
