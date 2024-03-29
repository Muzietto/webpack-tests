var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
  mode: "development",
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  }
};
