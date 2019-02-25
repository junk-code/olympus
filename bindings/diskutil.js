const { shellCommand } = require('./shellCommand')
const commandExists = require('command-exists').sync

const programName = `diskutil`

const unmount = (mountPoint) => shellCommand(`${programName} unmount "${mountPoint}"`)
const exists = () => commandExists(programName)

module.exports = {
  unmount,
  exists
}
