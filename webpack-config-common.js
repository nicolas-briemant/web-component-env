const path = require('path');
const autoprefixer = require('autoprefixer');
const babelConfig = require('./babel-config');

module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // the common usage want to exclude ./node_modules from transpiling process
        // but it useful to have when you have es6 modules.
        // (even if a module should be distributed as es5, let's have a glimpse of the future)
        //exclude: path.resolve('./node_modules'),
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
