const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack-config-common');

const buildPath = path.resolve('./build');
const srcPath = path.resolve('./src');
const appModule = 'app';
const appFilename = appModule + '.js';
const appPath = path.resolve(srcPath, appModule); // entry point

module.exports = merge(common, {
  devtool: 'eval-source-map',
  entry: appPath,
  output: {
    path: buildPath,
    filename: appFilename
  },
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
  ]
});