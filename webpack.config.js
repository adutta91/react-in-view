const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path : path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules : [
      {
        test : /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        exclude : /(node_modules|bower_components|dist)/,
        use : {
          loader : 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use : [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  externals: {
    'react': 'commonjs react'
  }
}