const path = require('path'),
      html = require('html-webpack-plugin'),
      webpack = require('webpack');

const libraryName = 'library';
const filename = `${libraryName}.js`;

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
    publicPath: '',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
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