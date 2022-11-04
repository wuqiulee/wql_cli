const fs = require('fs')
const logSymbol = require('log-symbols')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

const { ReactRope } = require('../common/constants')
const { commandSpawn } = require('../common/utils')

module.exports = async (projectName, args) => {
  // 若项目已存在命令行提示报错
  if (fs.existsSync(projectName)) {
    console.log(logSymbol.error, chalk.red(' project already exists'))
  } else {
    const answer = await inquirer.prompt([
      {
        name: 'description',
        message: 'Please enter the project description: '
      },
      {
        name: 'author',
        message: 'Please enter the author: '
      }
    ])
    const loading = ora('downloading template ...');
    loading.start()

    // clone项目
    try {
      await download(ReactRope, projectName, { clone: true })
    } catch (err) {
      console.log(err)
      loading.fail()
    }

    //修改项目文件夹中package.json文件
    const package = `${projectName}/package.json`
    if (fs.existsSync(package)) {
      try {
        const data = fs.readFileSync(package).toString()
        const json = JSON.parse(data)
        json.name = projectName
        json.description = answer.description
        json.author = answer.author
        fs.writeFileSync(package, JSON.stringify(json, null, '\t'), 'utf-8');
        console.log(logSymbol.success, chalk.green('Project initialization finished!'));
      } catch (err) {
        console.log(err)
        loading.fail()
      }
    }

    // 执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], { cwd: `./${projectName}` })
    loading.succeed()

    // 启动项目
    commandSpawn(command, ['run', 'start'], { cwd: `./${projectName}` });
  }
}