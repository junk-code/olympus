import React from 'react'
import { connect } from 'react-redux'
import './ConnectionList.scss'

import { Button, Connection } from './index'

import { addConnection } from '../store/connectionsReducer'

const internalConnectionList = ({
  addConnection,
  connections,
  ...props
}) => {
  const handleAddClick = () => addConnection({})

  const mappedConnections = connections.map(({ id, ...data }) => (
    <Connection key={id} connectionId={id} {...data} />
  ))

  return (
    <div className='connection-list'>
      <div className='connection-list__toolbar'>
        <Button size='small' kind='success' onClick={handleAddClick} ><span className='fas fa-plus' /></Button>
      </div>
      <div className='connection-list__list'>
        { mappedConnections }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { connections } = state
  return {
    connections
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addConnection: addConnection(dispatch)
  }
}

export const ConnectionList = connect(mapStateToProps, mapDispatchToProps)(internalConnectionList)
