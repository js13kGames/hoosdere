const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'g.js',
    sourceMapFilename: 'g.js.map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: !!process.env.APP_ENV,
      compress: !!process.env.APP_ENV,
      warnings: false,
      sourceMap: true
    })
  ]
}

module.exports = config
