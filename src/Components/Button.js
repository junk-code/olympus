import './Button.scss'
import React from 'react'
export const Button = ({
  className,
  children,
  kind,
  size,
  ...props
}) => {
  return (
    <button
      className={`${className || ''} button button--size-${size || 'normal'} button--kind-${kind || 'default'}`} {...props}>
      { children }
    </button>
  )
}
