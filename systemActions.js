const Umount = require('./bindings/umount')
const DiskUtil = require('./bindings/diskutil')
const FUserMount = require('./bindings/fusermount')
const SSHFS = require('./bindings/sshfs')
const untildify = require('untildify')

const getInstallStatus = () => {
  return {
    sshfs: SSHFS.exists(),
    fusermount: FUserMount.exists(),
    umount: Umount.exists(),
    diskutil: DiskUtil.exists()
  }
}

const mount = ({ user, mountPoint, remoteHost, remotePath }) => {
  if (SSHFS.exists) {
    return SSHFS.mount({ user, mountPoint, remoteHost, remotePath })
  } else {
    return Promise.reject(new Error('MOUNT ERROR: sshfs is not installed.'))
  }
}

const unmount = ({ mountPoint }) => {
  const order = [
    DiskUtil,
    Umount,
    FUserMount
  ]

  const chosen = order.find(program => program.exists())

  if (chosen) {
    return chosen.unmount(mountPoint)
  } else {
    return Promise.reject(new Error('UNMOUNT ERROR: unable to unmount using anything expected.'))
  }
}

const localPlace = ({ mountPoint }) => {
  const goodPath = untildify(mountPoint)
  return ({
    mount: ({ user, remoteHost, remotePath }) => mount({ user, remoteHost, remotePath, mountPoint: goodPath }),
    unmount: () => unmount({ mountPoint: goodPath })
  })
}

module.exports = {
  localPlace,
  getInstallStatus
}
