import React from 'react'
import { connect } from 'react-redux'

import { Button, Connection } from './index'

import { addConnection } from '../store/connectionsReducer'

const internalConnectionList = ({
  addConnection,
  connections,
  ...props
}) => {
  const handleAddClick = () => {
    addConnection({ label: 'cheese' })
  }

  const mappedConnections = connections.map(({ id, ...data }) => (
    <Connection key={id} connectionId={id} {...data} />
  ))

  return (
    <div>
      <Button size='small' kind='success' onClick={handleAddClick} ><span className='fas fa-plus' /></Button>
      <div>
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
