const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack-config-common');

const buildPath = path.resolve('./dist');
const srcPath = path.resolve('./src');
const umdModule = 'index';
const umdFilename = umdModule + '.js';
const umdPath = path.resolve(srcPath, umdModule); // entry point

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  entry: umdPath,
  output: {
    path: buildPath,
    filename: umdFilename,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
});
