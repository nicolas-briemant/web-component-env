const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const babelConfig = require('./babel-config');

const env = process.env.NODE_ENV;

const babelPresets = babelConfig.presets.join(',');
const defaultPlugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) })
];

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(defaultPlugins),
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('./src'),
        query: { presets: babelPresets }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};

if (env === 'production') {
  config.devtool = 'source-map';
  config.entry = ['./src/app'];
  config.output.publicPath = 'dist/';
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ].concat(defaultPlugins);
}

module.exports = config;
