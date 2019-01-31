const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const { assetsPath } = require('./utils')

const pathResolve = (pathName) => path.resolve(__dirname, pathName)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:6].bundle.js',
    chunkFilename: 'js/[name].[chunkhash:6].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.png', '.gif', '.svg'],
    alias: {
      'public': pathResolve('../public'),
      '@': pathResolve('../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(postc|c)ss$/,
        use: [
          isProd
            ? {
              loader: MiniCssExtractPlugin.loader
            }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 1,
              name: assetsPath('images/[name].[ext]?[hash:8]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env || '')
    }),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css'
    }),
    // TODO 现在插件第二版本不兼容webpack4 待处理
    // new PreloadWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../public/dll/'),
    //     to: path.resolve(__dirname, '../dist/dll'),
    //     ignore: ['.json']
    //   }
    // ]),
    new OptimizeCSSAssetsPlugin()
  ],
  optimization: {
    // chunkName 来替换 chunkId 实现缓存更长久优化
    namedChunks: true,
    // 将模块的路径映射成 hash 值
    moduleIds: 'hashed',
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      maxInitialRequests: 5,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          //  (chunk) => {
          //   return chunk.name !== 'vue'
          //   // return /^(vue|vue-router|vuex)$/g.test(chunk.name)
          // },
          // priority: 2,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /\.(postc|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
