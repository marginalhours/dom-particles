const path = require('path'),
      html = require('html-webpack-plugin'),
      webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  plugins: [
    // new clean(['dist']),
    new html({
      filename: 'index.html',
      template: './src/template.html',
      inject: true,
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};