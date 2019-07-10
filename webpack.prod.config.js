const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CreateFileWebpack = require('create-file-webpack')

module.exports = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve('./public'),
    publicPath: 'https://shout.netlify.com/'
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            return `vendor.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[name].[contenthash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contentHash].css' }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html'
    }),
    new CreateFileWebpack({
      path: './public',
      fileName: '_redirects',
      content: '/*    /index.html   200'
    })
  ]
}
