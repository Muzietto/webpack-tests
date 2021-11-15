const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;

module.exports = env => {

  const { NPC_ENV } = env;

  return {
    mode: 'development', // put to 'production' to create less code
    devtool: 'inline-source-map', // put false to NOT have sourcemaps
    entry: './src/index.js',
    resolve: {
      extensions: ['.js'],
      alias: {
        '@src': path.resolve(__dirname, './src'),
      },
    },
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
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public', 'index.html'),
        favicon: path.resolve(__dirname, './public/favicon.ico'),
        inject: true, // set to false if <script src='bundle.js'></script> is present in index.html
      }),
      new ModuleFederationPlugin({
  			name: 'shellForWebpackWorkshop',
        remotes: {
          'module-federation-mfe': 'mfeForWebpackWorkshop@http://localhost:3100/remoteEntry.js',
        },
  			shared: {
  				'jquery': {
  					singleton: true,
            eager: true,
  					requiredVersion: deps.jquery,
  				},
  			}
  		}),
    ],
  };
};
