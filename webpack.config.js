const path = require('path'),
      webpack = require('webpack');

const libraryName = 'letterbomb';
const mode = process.env.mode;

let outputFile = `${libraryName}.js`;

if (mode === 'production') {
  outputFile = `${libraryName}.min.js`;  
}

module.exports = {  
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'lib'),
    publicPath: '',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};