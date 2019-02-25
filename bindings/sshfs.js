const { shellCommand } = require('./shellCommand')
const commandExists = require('command-exists').sync

const programName = 'sshfs'

const mount = ({ user, mountPoint, remoteHost, remotePath }) =>
  shellCommand(`${programName} ${user}@${remoteHost}:${remotePath} "${mountPoint}"`)

const exists = () => commandExists(programName)

module.exports = { mount, exists }
