import React from 'react'
import { connect } from 'react-redux'
import './Connection.scss'

import {
  Button,
  TextInput,
  FolderSelectButton,
  FolderExploreButton,
  SpawnTerminalButton,
  UserHostPathInput,
  SSHFSButton
} from './index'

import { removeConnection, updateConnection } from '../store/connectionsReducer'

const internalConnection = ({ connectionId, remove, update, ...connectionProps }) => {
  const handleRemoveClick = () => {
    remove(connectionId)
  }

  const handleUpdate = ({ ...changes }) => {
    update({
      ...changes,
      id: connectionId
    })
  }

  const handleFolderSelected = (localDirectory) => {
    // console.log('folder:', localDirectory)
    handleUpdate({ localDirectory })
  }

  const termAtFolderCommand = `
  unset PREFIX;
  clear;
  cd ${connectionProps.localDirectory};
  exec $SHELL -l;`

  const termSSHCommand = `
  clear;
  echo "Connecting to ${connectionProps.user}@${connectionProps.host}:${connectionProps.remoteDirectory} via SSH using your key."
  ssh -t ${connectionProps.user}@${connectionProps.host} "cd ${connectionProps.remoteDirectory} && exec \$SHELL -l;"
  `

  const handleLabelChange = ({ target }) => handleUpdate({ label: target.value })
  const handleUserChange = ({ target }) => handleUpdate({ user: target.value })
  const handleHostChange = ({ target }) => handleUpdate({ host: target.value })
  const handleRemotePathChange = ({ target }) => handleUpdate({ remoteDirectory: target.value })

  const canSSH = () => {
    if (connectionProps.user && connectionProps.host && connectionProps.remoteDirectory) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='connection'>
      <Button onClick={handleRemoveClick} size='small' kind='danger'><span className='fas fa-folder-times' /></Button>
      <FolderSelectButton size='small' kind='success' onFolderSelected={handleFolderSelected} />
      <TextInput defaultValue={connectionProps.label} onChange={handleLabelChange} placeholder='Label' />
      <div>{ connectionProps.localDirectory } <span className='fas fa-code-commit' /> { connectionProps.remoteDirectory }</div>
      <UserHostPathInput
        user={connectionProps.user}
        onUserChange={handleUserChange}
        host={connectionProps.host}
        onHostChange={handleHostChange}
        path={connectionProps.remoteDirectory}
        onPathChange={handleRemotePathChange}
      />
      <div className='connection__bottom-wrapper'>
        <FolderExploreButton size='small' kind='info' path={connectionProps.localDirectory} />
        <SpawnTerminalButton size='small' kind='warning' label='Shell' disabled={!connectionProps.localDirectory} command={termAtFolderCommand} />
        <SpawnTerminalButton size='small' kind='warning' label='ssh' command={termSSHCommand} disabled={!canSSH()} />
        <SSHFSButton kind='info' size='small' />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    remove: removeConnection(dispatch),
    update: updateConnection(dispatch)
  }
}

export const Connection = connect(mapStateToProps, mapDispatchToProps)(internalConnection)
