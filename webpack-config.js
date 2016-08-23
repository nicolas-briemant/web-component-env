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
    devtool: 'cheap-module-source-map',
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
