const path = require('path')
let Config = require('../../src/config')
let port = 8000

let devConfig = {
  mode: 'development',
  devtool: Config.devtool || 'cheap-module-source-map',
  devServer: Object.assign({
    // 在路由history模式下，请求页面地址没有的话默认返回index.html
    // 这样达到支持history模式
    historyApiFallback: true,
    inline: true,
    // 启动和保存只有错误和警告会显示
    noInfo: true,
    contentBase: path.resolve(__dirname, '../../public/'),
    host: 'localhost',
    port: port,
    https: false,
    compress: false,
    openPage: '',
    open: true,
    hot: true,
    clientLogLevel: 'none',
    // 指定可以通过url+publicPath方式访问静态资源
    publicPath: '/',
    headers: {
    },
    proxy: {
      // '/api': {
      //   target: 'https://other-server.example.com',
      //   // 跳过https证书不安全提示
    }
  }, Config.devServer || {}),
  plugins: Config.plugins || []
}

module.exports = devConfig
