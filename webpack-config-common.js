const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const babelConfig = require('./babel-config');

module.exports = function(icss) {
  const css = icss
    ? 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
    : 'css';

  return {
    resolve: {
      extensions: ['', '.jsx', '.js']
    },
    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      })
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: path.resolve('./node_modules'),
          query: babelConfig
        },
        {
          test: /\.less$/,
          include: path.resolve('./src'),
          loader: ['style', css, 'postcss', 'less'].join('!')
        },
        {
          test: /\.css$/,
          include: path.resolve('./src'),
          loader: ['style', css, 'postcss'].join('!')
        },
        { // vendors as global
          test: /\.css$/,
          exclude: path.resolve('./src'),
          loader: ['style', 'css', 'postcss'].join('!')
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
          test: /\.(gif|png|jpe?g)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    postcss: [
      autoprefixer({ browsers: ['last 2 versions'] })
    ]
  };
};
