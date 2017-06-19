const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack-config-common');

const buildPath = path.resolve('./build');
const srcPath = path.resolve('./src');
const appModule = 'app';
const appFilename = appModule + '.js';
const appPath = path.resolve(srcPath, appModule); // entry point
const rootPath = path.dirname(__dirname); // context !
const templatePath = path.resolve(rootPath, 'web-component-env' , 'index.html');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', appPath],
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
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
        'APP_ENV': JSON.stringify(process.env.APP_ENV),
        'TARGET_ENV': JSON.stringify(process.env.TARGET_ENV),
      }
    }),
  ]
});