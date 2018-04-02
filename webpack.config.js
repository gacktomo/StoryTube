webpack = require('webpack');

module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
        { test: /.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
}