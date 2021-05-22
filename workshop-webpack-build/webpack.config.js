const path = require('path');

module.exports = {
  mode: 'development', // put to 'production' to create less code
  devtool: false, // put true to create index.js in Chrome devtools
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
