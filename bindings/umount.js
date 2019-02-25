const { shellCommand } = require('./shellCommand')
const commandExists = require('command-exists').sync

const programName = `umount`

const unmount = (mountPoint) => shellCommand(`${programName} "${mountPoint}"`)
const exists = () => commandExists(programName)

module.exports = {
  unmount,
  exists
}
