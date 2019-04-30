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
  MountRemoteFolderButton,
  LaunchInEditorButton
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
    handleUpdate({ localDirectory })
  }

  const termAtFolderCommand = `
  unset PREFIX;
  clear;
  cd ${connectionProps.localDirectory};
  exec $SHELL -l;`

  const termSSHCommand = `
  clear;
  echo "Connecting to ${connectionProps.user}@${connectionProps.host}:${connectionProps.remoteDirectory}${connectionProps.port ? ` on port ${connectionProps.port}` : ''}\n"
  ssh -t ${connectionProps.user}@${connectionProps.host} ${connectionProps.port ? ` -p ${connectionProps.port}` : ''} "cd ${connectionProps.remoteDirectory} && exec $SHELL -l;"
  `

  const handleLabelChange = ({ target }) => handleUpdate({ label: target.value })
  const handleUserChange = ({ target }) => handleUpdate({ user: target.value })
  const handleHostChange = ({ target }) => handleUpdate({ host: target.value })
  const handleRemotePathChange = ({ target }) => handleUpdate({ remoteDirectory: target.value })
  const handlePortChange = ({ target }) => handleUpdate({ port: target.value })

  const canSSH = () => {
    if (connectionProps.user && connectionProps.host && connectionProps.remoteDirectory) {
      return true
    } else {
      return false
    }
  }

  const isMounted = connectionProps.filesystem === `${connectionProps.user}@${connectionProps.host}:${connectionProps.remoteDirectory}`

  return (
    <div className='connection'>
      <div className='connection__top-wrapper'>
        <FolderSelectButton size='small' kind='success' onFolderSelected={handleFolderSelected} disabled={isMounted} />
        <TextInput className='connection__label' disabled={isMounted} defaultValue={connectionProps.label} onChange={handleLabelChange} placeholder='Label' />
      </div>
      <div>{ connectionProps.localDirectory } <span className='fas fa-code-commit' /> { connectionProps.remoteDirectory }</div>
      <UserHostPathInput
        user={connectionProps.user}
        onUserChange={handleUserChange}
        host={connectionProps.host}
        onHostChange={handleHostChange}
        path={connectionProps.remoteDirectory}
        onPathChange={handleRemotePathChange}
        port={connectionProps.port}
        onPortChange={handlePortChange}
        disabled={isMounted}
      />
      <div className='connection__bottom-wrapper'>
        <Button onClick={handleRemoveClick} size='small' kind='danger' disabled={isMounted}><span className='fas fa-folder-times' /></Button>
        <FolderExploreButton size='small' kind='info' path={connectionProps.localDirectory} />
        <MountRemoteFolderButton
          kind='info'
          size='small'
          isBusy={connectionProps.isMountButtonBusy}
          connectionId={connectionId}
          user={connectionProps.user}
          host={connectionProps.host}
          remotePath={connectionProps.remoteDirectory}
          localPath={connectionProps.localDirectory}
          volumeName={connectionProps.label}
          isMounted={isMounted}
          disabled={!(connectionProps.host && connectionProps.user && connectionProps.localDirectory)}
        />
        <LaunchInEditorButton
          kind='info'
          size='small'
          editor={'code'}
          localPath={connectionProps.localDirectory}
          disabled={!(connectionProps.localDirectory)}
        />
        <SpawnTerminalButton size='small' kind='warning' label='Shell' disabled={!connectionProps.localDirectory} command={termAtFolderCommand} />
        <SpawnTerminalButton size='small' kind='warning' label='ssh' command={termSSHCommand} disabled={!canSSH()} />
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
