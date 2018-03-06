const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const babelConfig = require('./babel-config');

module.exports = {
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
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        loader: 'url-loader?limit=100000?fallback=file-loader'
      },
      {
        test: /\.inline\.svg$/,
        loader: 'url-loader?limit=1000000?fallback=file-loader'
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};
