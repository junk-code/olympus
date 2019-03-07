import { observableStore } from '../observableStore'
import df from 'node-df'

import { updateConnection } from '../connectionsReducer'

let initialRunComplete = false

export const directoryWatcher = (store) => {
  const { dispatch } = store
  const selector = (store) => store.connections

  const callback = (data) => {
    if (initialRunComplete === false) {
      const connectionsWithDirectories = data.filter((d) => d.localDirectory && d.localDirectory.length > 0)
      connectionsWithDirectories.map(({ id, localDirectory }, index, array) => {
        df({
          file: localDirectory
        }, (error, data) => {
          if (error) {
            console.error(error)
          } else {
            const { filesystem } = data[0]
            updateConnection(dispatch)({ id, filesystem })
          }
        })

        if (index === array.length - 1) {
          initialRunComplete = true
        }
      })
    }
  }

  const disable = observableStore(store, selector, callback)
  return disable
}
