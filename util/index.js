const os = require('os')
const netWorkInfos = os.networkInterfaces()
const log = console.log

const localIp = () => {
  let result
  for (let key in netWorkInfos) {
    let netWorkInfo = netWorkInfos[key]
    let filterResult
    filterResult = netWorkInfo.filter(item =>
      item.family === 'IPv4' &&
      item.internal === false &&
      item.mac !== '00:00:00:00:00:00'
    )
    if (filterResult.length) {
      result = filterResult[0]
      break
    }
  }
  if (!result) return log('未查找到本机IP！')
  return result.address
}

module.exports = {
  localIp
}
