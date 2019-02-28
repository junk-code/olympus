import './Button.scss'
import React from 'react'
export const Button = ({
  className,
  children,
  kind,
  size,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${className || ''} button button--size-${size || 'normal'} button--kind-${kind || 'default'} ${disabled ? 'button--disabled' : 'button--enabled'}`} disabled={!!disabled} {...props}>
      { children }
    </button>
  )
}
