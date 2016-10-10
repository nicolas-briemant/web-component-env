const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack-config-common');

module.exports = function(umdModule) {
  const buildPath = path.resolve('./dist');
  const srcPath = path.resolve('./src');
  const umdFilename = umdModule + '.js';
  const umdPath = path.resolve(srcPath, umdModule); // entry point

  return merge(common, {
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
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      }),
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
};
