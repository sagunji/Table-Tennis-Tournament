const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port: 3001,
    inline: true,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'public')
  }
};
