
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
  const shouldMount = false

  Object.keys(placesToMount).map(mountPoint => {
    const { mount, unmount } = SystemActions.localPlace({ mountPoint })

    const {
      user,
      remoteHost,
      remotePath
    } = placesToMount[mountPoint]

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
