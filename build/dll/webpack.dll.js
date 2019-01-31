const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    base: [
      'react',
      'react-dom',
      'axios'
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../public/dll'),
    filename: '[name]_dll.js',
    library: '_dll_[name]_[hash:6]' // 挂在window属性上
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../../public/dll', '[name]-manifest.json'),
      name: '_dll_[name]_[hash:6]'
    })
  ]
}
