const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isLocal = slsw.lib.webpack.isLocal
const outputDir = path.join(__dirname, '.build')

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: outputDir,
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache')
            }
          },
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}
