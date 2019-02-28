import nanoid from 'nanoid'

const actions = {
  add: 'CONNECTION_ADD',
  remove: 'CONNECTION_REMOVE',
  update: 'CONNECTION_UPDATE'
}

export const connectionsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.add: {
      const dumbCopy = state.splice()
      if (payload.id) {
        dumbCopy.push({ ...payload })
        return state.concat(dumbCopy)
      } else {
        const id = `connection-${nanoid()}`
        dumbCopy.push({ id, ...payload })
        return state.concat(dumbCopy)
      }
    }
    case actions.remove: {
      return state.filter(({ id }) => id !== payload.id)
    }
    case actions.update: {
      const itemId = payload.id
      return state.map(({ id, ...stuff }) => {
        if (id === itemId) {
          return {
            ...stuff,
            ...payload,
            id
          }
        } else {
          return {
            ...stuff,
            id
          }
        }
      })
    }
    default: {
      return state
    }
  }
}

export const addConnection = dispatch => ({ ...stuff }) => dispatch({
  type: actions.add,
  payload: {
    ...stuff
  }
})

export const removeConnection = dispatch => (id) => dispatch({
  type: actions.remove,
  payload: {
    id
  }
})

export const updateConnection = dispatch => ({ ...stuff }) => dispatch({
  type: actions.update,
  payload: {
    ...stuff
  }
})
