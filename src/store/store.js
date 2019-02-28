import { createStore, combineReducers } from 'redux'

import { connectionsReducer } from './connectionsReducer'

import throttle from 'lodash/throttle'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ state: {
  connections: []
} })
  .write()

const masterReducer = combineReducers({
  connections: connectionsReducer
})

const saveState = (state) => {
  const saveTheState = () => {
    db.set('state', state).write()
  }
  throttle(saveTheState, 1000)()
}

const loadState = () => {
  return db.get('state').value()
}

const getInitialState = () => {
  return loadState()
}

export const store = createStore(masterReducer, getInitialState())

store.subscribe(() => {
  saveState({
    connections: store.getState().connections
  })
})
