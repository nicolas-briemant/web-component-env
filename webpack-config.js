const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const babelConfig = require('./babel-config');

const env = process.env.NODE_ENV;

const common = {
  entry: {
    app: path.resolve('./src/app')
  },
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('./src'),
        query: babelConfig
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader',
        include: path.resolve('./src'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
        include: path.resolve('./src'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: path.resolve('./src'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        include: path.resolve('./src'),
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        include: path.resolve('./src'),
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader?limit=100000',
        include: path.resolve('./src'),
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};

if(env === 'development' || !env) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    output: {
      path: path.resolve('./build')
    },
    devServer: {
      contentBase: path.resolve('./build'),
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(env === 'production') {
  module.exports = merge(common, {
    devtool: 'source-map',
    output: {
      path: path.resolve('./dist')
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
}
