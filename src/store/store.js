import { createStore, combineReducers } from 'redux'
import { observableStore } from './observableStore'
import { connectionsReducer } from './connectionsReducer'

import { directoryWatcher } from './middleware/directoryWatcher'

import throttle from 'lodash/throttle'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  state: {
    connections: []
  }
}).write()

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
  const state = loadState()
  return state
}

export const store = createStore(masterReducer, getInitialState())

observableStore(store, (state) => state, (state) => saveState(state))

directoryWatcher(store)
