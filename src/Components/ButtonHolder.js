import React from 'react'
import './ButtonHolder.scss'

export const ButtonHolder = ({ className, children }) => (
  <div className={`${className || ''} button-holder`}>{ children }</div>
)
