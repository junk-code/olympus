import React from 'react'
import { Button } from './index'
import { shell } from 'electron'

export const FolderExploreButton = ({ path, ...props }) => {
  const handleClick = () => {
    if (path) {
      shell.showItemInFolder(path)
    } else {
      console.error('no path given:', path)
    }
  }

  return (
    <Button {...props} onClick={handleClick} disabled={!path}>
      <span className='fas fa-folder-open' />
      &nbsp;
      Explore
    </Button>
  )
}
