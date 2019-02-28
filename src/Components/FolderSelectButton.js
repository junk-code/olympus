import React from 'react'

import { Button } from './index'

const { remote } = require('electron')
const { dialog } = remote

export const FolderSelectButton = ({
  kind,
  size,
  title,
  message,
  onFolderSelected
}) => {
  const callback = (a, b) => {
    if (typeof onFolderSelected === 'function') {
      if (Array.isArray(a)) {
        onFolderSelected(a[0], b)
      }
    }
  }

  function clickHandler () {
    dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title,
        message,
        buttonLabel: 'Select Directory',
        securityScopedBookmarks: true,
        properties: [
          'openDirectory',
          'createDirectory',
          'showHiddenFiles'
        ]
      },
      callback
    )
  }
  return (
    <Button kind={kind} size={size} onClick={clickHandler}><span className='fas fa-folder' /></Button>
  )
}
