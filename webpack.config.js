const path = require('path'),
      html = require('html-webpack-plugin'),
      clean = require('clean-webpack-plugin'),
      webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  plugins: [
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    new clean(['dist']),
    /*new html({
      title: 'Output Mgmt',
      filename: 'index.html',
      template: './src/template.html',
      inject: true
    }),*/
    new html(),
    // https://webpack.js.org/guides/code-splitting/#prevent-duplication
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
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