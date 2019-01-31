#!/usr/bin/env node

const shell = require('shelljs')
const chalk = require('chalk')
const command = process.argv[2]

const log = console.log

switch (command) {
  case 'dev':
    if (shell.exec('npm run dev').code !== 0) {
      shell.echo('启动错误，请检查启动指令是否正确！')
    }
    break
  case 'build':
    if (shell.exec('npm run build').code !== 0) {
      shell.echo('启动错误，请检查启动指令是否正确！')
    }
    break
  default:
    log(chalk.red('未知命令，请重新检查下命令是否正确！'))
}
