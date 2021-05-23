const path = require('path');

module.exports = {
  mode: 'development', // put to 'production' to create less code
  devtool: true, // put 'inline-source-map' to create sourcemaps
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
