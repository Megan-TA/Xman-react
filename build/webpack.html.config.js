const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const Config = require('../src/config')
const defaultHtmlConfig = {
  title: 'WebApp',
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html'
}

let { pages } = Config

let htmlResult = null

if (!pages) {
  htmlResult = [
    new HtmlWebpackPlugin({ ...defaultHtmlConfig })
  ]
} else {
  htmlResult = pages.map(item => {
    return new HtmlWebpackPlugin({ ...item, template: path.resolve(__dirname, `../public/${item.template}`) })
  })
}

module.exports = htmlResult
