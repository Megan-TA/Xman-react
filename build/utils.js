const path = require('path')

const Config = require('../src/config')

exports.assetsPath = function (_path) {
  // const assetsSubDirectory = process.env.NODE_ENV === 'production'
  //   ? config.build.assetsSubDirectory
  //   : config.dev.assetsSubDirectory
  const assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
}

exports.resolve = (...pathName) => path.resolve(__dirname, pathName)

exports.getHtmlEntryFromPublic = (pathName = '../src/') => {
  let { pages } = Config
  let filterHtmlFiles = {}
  if (!pages) {
    filterHtmlFiles = {
      app: path.resolve(__dirname, pathName + './entry-client.js')
    }
  } else {
    pages.forEach(item => {
      let { filename, entry } = item
      let [ pageName ] = filename.split('.')
      filterHtmlFiles[pageName] = path.resolve(__dirname, pathName + entry)
    })
  }
  return filterHtmlFiles
}
