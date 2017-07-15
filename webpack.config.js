const path = require('path'),
      html = require('html-webpack-plugin'),
      clean = require('clean-webpack-plugin'),
      webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    new clean(['dist']),
    new html({
      title: 'Output Mgmt',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    // https://webpack.js.org/guides/code-splitting/#prevent-duplication
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};