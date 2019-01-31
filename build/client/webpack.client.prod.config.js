const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')

const prodConfig = {
  mode: 'production',
  plugins: [
    // TODO 现在插件第二版本不兼容webpack4 待处理
    // new PreloadWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../public/dll/'),
        to: path.resolve(__dirname, '../../dist/dll/'),
        ignore: ['*.json']
      }
    ])
  ]
}

module.exports = prodConfig
