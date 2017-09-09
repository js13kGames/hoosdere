const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'g.js',
    sourceMapFilename: 'g.js.map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src/css'),
        ],
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      warnings: false,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'hoosdere',
      template: 'src/template.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}

module.exports = config
