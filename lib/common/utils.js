const semver = require('semver')
const chalk = require('chalk')
const { spawn } = require('child_process');
const logSymbol = require('log-symbols')

/**
 * @description 检测node版本
 * @param {string} 版本范围
 * @param {string} 脚手架名称
 */

const checkNodeVersion = (range, cliName) => {
  if (!semver.satisfies(process.version, range)) {
    console.log(logSymbol.error, chalk.red(
      ` 您的node版本${process.version}过低，${cliName}需运行在${range}上\n请升级您的node版本`
    ))
    process.exit(1)
  }
}


// 执行终端命令
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on("close", () => {
      resolve()
    })
  })
}


module.exports = {
  checkNodeVersion,
  commandSpawn
}