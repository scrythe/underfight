const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 80,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SOCKET_URL': JSON.stringify('http://localhost:3000'),
      'process.env.PHP_URL': JSON.stringify('http://localhost:593'),
    }),
  ],
});
