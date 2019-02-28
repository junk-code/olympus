import './ToggleButton.scss'
import React, { Component } from 'react'
import { Button } from './index'

export class ToggleButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: !!props.initialValue
    }
  }
  render () {
    const self = this
    const { props, state } = self
    const toggle = () => {
      this.setState((state, props) => ({ currentValue: !state.currentValue }))
    }
    return (
      <Button {...props} kind={(state.currentValue) ? ('success') : 'danger'} onClick={toggle} className={(`toggle-button toggle-button--value-${state.currentValue}`).toLowerCase()}>
        {
          (state.currentValue) ? (
            <span className='fas fa-toggle-on' />
          ) : (
            <span className='fas fa-toggle-off' />
          )
        }
      </Button>
    )
  }
}
