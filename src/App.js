import React from 'react'
import './App.scss'

import {
  Button,
  ButtonHolder,
  TextInput,
  ConnectionList,
  FolderSelectButton
} from './Components'

export const App = () => {
  const handleFolderSelection = (selection) => {
    console.log('Folder Selection:', selection)
  }

  return (
    <div>
      <ConnectionList />
      <FolderSelectButton onFolderSelected={handleFolderSelection} size='small' kind='info' title='Select a Directory' message='Please choose a place where we can mount our remote directory. An empty directory is best.' />
    </div>
  )
}
