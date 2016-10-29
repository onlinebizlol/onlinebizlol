var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  watch: true,
  entry: {
    main: [
      path.join(__dirname, 'scripts/js/main.js')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'assets')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/assets/, /node_modules/], loader: 'babel' },
      { test: /\.css$/, exclude: [/assets/], loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // move all css out into separate file
    new ExtractTextPlugin('[name].bundle.css', {
      allChunks: true
    }),

    // Reduces bundles total size
    new webpack.optimize.UglifyJsPlugin({
      mangle: {

        // You can specify all variables that should not be mangled.
        // For example if your vendor dependency doesn't use modules
        // and relies on global variables. Most of angular modules relies on
        // angular global variable, so we should keep it unchanged
        except: ['$super', '$', 'exports', 'require']
      }
    })
    ]
  };
