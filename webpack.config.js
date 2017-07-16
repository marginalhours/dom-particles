const path = require('path'),
      html = require('html-webpack-plugin'),
      clean = require('clean-webpack-plugin'),
      webpack = require('webpack'),
      commons = 'commons';

module.exports = {
  entry: {
    index: './src/index.js',
    a: './src/a.js'
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { 
          presets: [ 
            // Step 6: http://jakewiesler.com/tree-shaking-es6-modules-in-webpack-2/
            ['es2015', { modules: false }]
          ] 
        }
      }
    ]
  }
};