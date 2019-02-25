const { shellCommand } = require('./shellCommand')
const commandExists = require('command-exists').sync

const programName = `fusermount`

const unmount = (mountPoint) => shellCommand(`${programName} -u "${mountPoint}"`)
const exists = () => commandExists(programName)

module.exports = {
  unmount,
  exists
}
