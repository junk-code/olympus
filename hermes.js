// god of communication
const { spawn } = require('child_process')

const mountRemoteDrive = ({
  user,
  host,
  localPath,
  remotePath,
  volumeName
}) => new Promise((resolve, reject) => {
  const connectionSchemeParam = `${user}@${host}:${remotePath}`
  const volumeNameParam = `-ovolname=${volumeName}`
  const params = [
    '-onoappledouble' // having this disables apple's desire to make .DStore files.
  ]

  if (typeof volumeName === 'string' && volumeName.length > 0) {
    params.push(volumeNameParam)
  }

  params.push(connectionSchemeParam)
  params.push(localPath)

  const childProcess = spawn('sshfs', params, {
    detached: true
  })

  const errors = []

  childProcess.on('exit', code => {
    if (code === 0) {
      resolve()
    } else {
      reject(new Error(`ExitCode:${code}\n${errors.join('\n')}`, errors))
    }
  })

  childProcess.stderr.on('data', (data) => {
    errors.push(data.toString('utf8'))
  })
})

module.exports = {
  mountRemoteDrive
}
