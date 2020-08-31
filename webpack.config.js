const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
  },
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'ts-loader' },
        exclude: /node_modules/,
      },

      // addition - add source-map support
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
