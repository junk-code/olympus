import './UserHostPathInput.scss'
import React from 'react'
import {
  TextInput
} from './index'

export const UserHostPathInput = ({
  user,
  host,
  path,
  port,
  onUserChange,
  onHostChange,
  onPathChange,
  onPortChange,
  ...props
}) => {
  return (
    <div className='user-and-host-input'>
      <TextInput {...props} className='user-host-path-input__user' defaultValue={user} placeholder='User' onChange={onUserChange} />
      <span>@</span>
      <TextInput {...props} className='user-host-path-input__host' defaultValue={host} placeholder='Host' onChange={onHostChange} />
      <span>:</span>
      <TextInput {...props} className='user-host-path-input__path' defaultValue={path} placeholder='Remote Path' onChange={onPathChange} />
      <TextInput {...props} className='user-host-path-input__port' defaultValue={port || 22} placeholder='Port' onChange={onPortChange} />
    </div>
  )
}
