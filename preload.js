
const SystemActions = require('./systemActions')

const placesToMount = {
  '~/mount2': {
    user: 'victor',
    remoteHost: 'regan.law.uga.edu',
    remotePath: '/var/www/html/test/web/modules'
  },
  '~/mount': {
    user: 'victor',
    remoteHost: 'regan.law.uga.edu',
    remotePath: '/var/www/html/test/web/themes'
  }
}

const mountTest = () => {
  const shouldMount = true

  Object.keys(placesToMount).map(mountPoint => {
    const { mount, unmount } = SystemActions.localPlace({ mountPoint })
    const details = placesToMount[mountPoint]
    const {
      user,
      remoteHost,
      remotePath
    } = details
    if (shouldMount) {
      mount({
        user,
        remoteHost,
        remotePath
      })
    } else {
      unmount()
    }
  })
}

process.once('loaded', () => {
  // process is loaded, now we load the webpage
})

window.onload = () => {
  mountTest()
}
