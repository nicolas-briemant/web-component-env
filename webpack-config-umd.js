const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack-config-common');

module.exports = function(umdModule, relative) {
  const rootPath = path.dirname(__dirname); // context !
  const templatePath = path.resolve(rootPath, 'web-component-env' , 'index.html');
  const buildPath = path.resolve('./dist');
  const srcPath = path.resolve('./src');
  const umdPath = path.resolve(srcPath, umdModule); // entry point

  return merge(common, {
    devtool: 'cheap-module-source-map',
    entry: ['babel-polyfill', umdPath],
    output: {
      path: buildPath,
      filename: (relative ? '' : '/') + '[name].[chunkhash].js',
      chunkFilename: (relative ? '' : '/') + '[name].[chunkhash].chunk.js',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: umdModule,
        template: templatePath,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"production"',
          'APP_ENV': JSON.stringify(process.env.APP_ENV)
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
