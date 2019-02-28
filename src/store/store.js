import { createStore, combineReducers } from 'redux'

import { connectionsReducer } from './connectionsReducer'

const masterReducer = combineReducers({
  connections: connectionsReducer
})

export const store = createStore(masterReducer)
