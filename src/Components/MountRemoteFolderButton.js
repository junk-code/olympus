import React from 'react'
import { connect } from 'react-redux'
import { Button } from './index'
import { mountRemoteDrive, unmountRemoteDrive } from '../../hermes'

import { refreshConnectionFilesystem, updateConnection } from '../store/connectionsReducer'

const internalMountRemoteFolderButton = ({
  connectionId,
  isMounted,
  isBusy,
  volumeName,
  user,
  host,
  remotePath,
  localPath,
  refresh,
  update,
  ...props
}) => {
  const reload = () => {
    refresh({
      id: connectionId,
      localDirectory: localPath
    })
  }

  const actionStarted = () => {
    update({
      id: connectionId,
      isMountButtonBusy: true
    })
  }

  const actionEnded = () => {
    update({
      id: connectionId,
      isMountButtonBusy: false
    })
    reload()
  }

  const handleMountButtonClick = () => {
    actionStarted()
    mountRemoteDrive({
      user,
      host,
      localPath,
      remotePath,
      volumeName
    }).then(() => {
      actionEnded()
    }).catch((error) => {
      console.error(error)
      console.log('Could Not Mount')
      actionEnded()
    })
  }

  const handleUnmountButtonClick = () => {
    actionStarted()
    unmountRemoteDrive({ localPath }).then(() => {
      actionEnded()
    }).catch((error) => {
      console.error(error)
      actionEnded()
    })
  }

  const mountButton = <Button {...props} onClick={handleMountButtonClick}>Mount</Button>
  const unmountButton = <Button {...props} onClick={handleUnmountButtonClick}>Unmount</Button>
  const busyButton = <Button {...props} disabled><span className='fas fa-cog fa-spin' /></Button>

  if (isBusy) {
    return busyButton
  } else {
    return isMounted ? unmountButton : mountButton
  }
}

const stateToProps = (state) => ({})
const dispatchToProps = (dispatch) => {
  return ({
    refresh: refreshConnectionFilesystem(dispatch),
    update: updateConnection(dispatch)
  })
}

export const MountRemoteFolderButton = connect(stateToProps, dispatchToProps)(internalMountRemoteFolderButton)
