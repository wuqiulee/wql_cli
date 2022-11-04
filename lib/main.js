const program = require('commander');
const { checkNodeVersion } = require('./common/utils')

const package = require('../package.json')
const { ActionMap } = require('./common/constants')

// 检测node版本
checkNodeVersion(package.engines.node, package.name)

// 查看版本号
program.version(package.version);

Reflect.ownKeys(ActionMap).forEach(action => {
  program.command(ActionMap[action].command)
    .alias(ActionMap[action].alias)
    .description(ActionMap[action].description)
    .action((name, args) => {
      require(`./core/${action}`)(name, args)
    })
})

program.parse(process.argv);