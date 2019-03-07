import React from 'react'
import { Button } from './index'
import openInEditor from 'open-in-editor'

export const LaunchInEditorButton = ({
  editor,
  localPath,
  ...props
}) => {
  const opener = openInEditor.configure({
    editor
  })
  const handleClick = () => {
    opener.open(localPath)
  }
  return (
    <Button {...props} onClick={handleClick}>
      <span className='fas fa-file-edit' />
    </Button>
  )
}
