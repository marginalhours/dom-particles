var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/index.js',
    path: path.resolve(__dirname, 'dist')
  }
};