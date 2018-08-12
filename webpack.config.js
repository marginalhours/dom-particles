const path = require('path'),
      html = require('html-webpack-plugin'),
      clean = require('clean-webpack-plugin'),
      webpack = require('webpack'),
      commons = 'commons';

module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  plugins: [
    new clean(['dist']),
    new html({
      filename: 'index.html',
      template: './src/template.html',
      inject: true,
      chunks: [commons, 'index']
    }),
    // https://webpack.js.org/guides/code-splitting/#prevent-duplication
    new webpack.optimize.CommonsChunkPlugin({
      name: commons
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};