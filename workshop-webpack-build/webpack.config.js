const path = require('path');

module.exports = {
  mode: 'development', // put to 'production' to create less code
  devtool: false, // put true to create index.js in Chrome devtools
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // swap previous test object with next one to use file-loader + url-loader
      // {
      //   test: /.*\.(gif|png|jp(e*)g|svg)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 21000,
      //         name: 'images/[name].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
};
