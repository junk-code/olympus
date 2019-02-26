import React from 'react'
import './App.scss'

const Button = ({ children }) => (
  <button className='button button--hot-pink'>{ children }</button>
)

const ButtonHolder = ({ children }) => (
  <div className='button-holder'>{children}</div>
)
export const App = () => {
  return (
    <React.Fragment>
      <ButtonHolder>
        <Button>Launch</Button>
        <Button>Grab</Button>
        <Button>Kill</Button>
      </ButtonHolder>
    </React.Fragment>
  )
}
