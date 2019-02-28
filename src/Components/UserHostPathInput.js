import './UserHostPathInput.scss'
import React from 'react'
import {
  TextInput
} from './index'

export const UserHostPathInput = ({
  user,
  host,
  path,
  onUserChange,
  onHostChange,
  onPathChange
}) => {
  return (
    <div className='user-and-host-input'>
      <TextInput className='user-host-path-input__user' defaultValue={user} placeholder='User' onChange={onUserChange} />
      <span>@</span>
      <TextInput className='user-host-path-input__host' defaultValue={host} placeholder='Host' onChange={onHostChange} />
      <span>:</span>
      <TextInput className='user-host-path-input__path' defaultValue={path} placeholder='Remote Path' onChange={onPathChange} />
    </div>
  )
}
