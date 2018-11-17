const path = require('path'),
      webpack = require('webpack');

const libraryName = 'letterbomb';

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = process.env.WEBPACK_ENV;

let plugins = [];
let outputFile = `${libraryName}.js`;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

module.exports = {  
  entry: {
    index: './src/js/text_particle_manager.js'
  },
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'lib'),
    publicPath: '',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins,
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