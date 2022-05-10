const path = require('path');

module.exports = [
  {
    entry: './client/src/index.ts',
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      port: 80,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
  },
];
