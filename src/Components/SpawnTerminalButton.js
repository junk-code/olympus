import { launchTerminal } from 'term-launcher'
import React from 'react'

import { Button } from './index'

export const SpawnTerminalButton = ({
  command,
  label,
  ...props
}) => {
  const handleClick = () => {
    if (command) {
      launchTerminal(command)
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      <span className='fas fa-terminal' />
      { label ? ` ${label}` : null }
    </Button>
  )
}
