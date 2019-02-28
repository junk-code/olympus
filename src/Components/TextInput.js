import React from 'react'
import './TextInput.scss'

export const TextInput = ({ className, disabled, icon, kind, ...props }) => {
  return (
    <input className={`${className || ''} text-input text-input--kind-${kind || 'default'} ${disabled ? 'text-input--disabled' : ''}`} type='text' {...props} />
  )
}
