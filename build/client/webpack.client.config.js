const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const portfinder = require('portfinder')
const chalk = require('chalk')

const CommonWebpackConfig = require('../webpack.base.config')
// const BaseDLLManifest = require('../../public/dll/base-manifest.json')
const BaseHtmlConfig = require('../webpack.html.config.js')
const DEV_WEBPACK_CONFIG = require('./webpack.client.dev.config')
const PROD_WEBPACK_CONFIG = require('./webpack.client.prod.config')
const Utils = require('../utils')

// let port = 8000
// const log = console.log
const isProd = process.env.NODE_ENV === 'production'

const entry = Utils.getHtmlEntryFromPublic()

const spaConfig = merge(CommonWebpackConfig, {
  target: 'web',
  entry: entry,
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: BaseDLLManifest
    // }),
    ...BaseHtmlConfig
  ]
}, isProd ? PROD_WEBPACK_CONFIG : DEV_WEBPACK_CONFIG)

module.exports = spaConfig

// function () {
//   return portfinder.getPortPromise()
//     .then(newPort => {
//       // if (port !== newPort) {
//       //   log(chalk.red(`${port}端口被占用，开启新端口${newPort}`))
//       // }
//       // spaConfig.devServer.port = newPort
//     })
//     .then(() => spaConfig)
// }
