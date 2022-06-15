const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
webpack;

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SOCKET_URL': JSON.stringify(
        'https://young-crag-60228.herokuapp.com'
      ),
    }),
  ],
});
