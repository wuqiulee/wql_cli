const ActionMap = {
  create: {
    alias: 'c',
    command: 'create <project> [others...]',
    description: 'create a new project',
    examples: ['wql_cli create <projectName>']
  }
}

const ReactRope = 'direct:https://github.com/coderwql/wql_cli.git#react'

module.exports = {
  ActionMap,
  ReactRope
}