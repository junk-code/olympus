import React from 'react'
import { connect } from 'react-redux'

import { Button } from './index'

import { removeConnection, updateConnection } from '../store/connectionsReducer'

const internalConnection = ({ connectionId, remove, update, ...connectionProps }) => {
  const handleRemoveClick = () => {
    remove(connectionId)
  }

  const handleUpdate = ({ ...changes }) => {
    update({
      ...changes,
      id: connectionId
    })
  }

  return (
    <div>
      <div>
        { connectionId }
      </div>
      <Button onClick={handleRemoveClick} size='small' kind='danger'><span className='fas fa-minus' /></Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    remove: removeConnection(dispatch),
    update: updateConnection(dispatch)
  }
}

export const Connection = connect(mapStateToProps, mapDispatchToProps)(internalConnection)
