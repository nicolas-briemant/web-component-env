const path = require('path');
const webpack = require('webpack');
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
    './try/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
        test: /\.jsx?/,
        loader: 'babel',
        include: path.join(__dirname, 'try'),
        query: { presets: babelPresets }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader" 
      }
    ]
  }
};

if (env === 'production') {
  config.devtool = 'source-map';
  config.entry = ['./try/app'];
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
