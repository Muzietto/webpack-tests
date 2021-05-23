const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack'); // uncomment to enable DefinePlugin

module.exports = env => {

  const { NPC_ENV } = env;

  // uncomment next lines to handle pseudo-global variables server-side
  // const NODE_CONSTANTS = require(`./constants/node/${NPC_ENV}.js`);
  // NODE_CONSTANTS.NPC_ENV = NPC_ENV;

  return {
    mode: 'development', // put to 'production' to create less code
    devtool: false, // put 'inline-source-map' to create index.js in Chrome devtools
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
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public', 'index.html'),
        favicon: path.resolve(__dirname, './public/favicon.ico'),
        inject: true, // set to false if <script src="bundle.js"></script>
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, `./constants/runtime/${NPC_ENV}.js`),
        to: path.resolve(__dirname, './dist/configurations.js'),
      }]),
      // uncomment next plugin to see how to NOT pollute the window object
      // new webpack.DefinePlugin({
      //   ENV2: JSON.stringify(NODE_CONSTANTS),
      // }),
    ],
  };
};
