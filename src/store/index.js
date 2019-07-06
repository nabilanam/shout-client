import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle'

import { loadState, saveState } from '../localstorage'
import middlewares from './middlewares'
import reducer from '../reducers'

const configureStore = () => {
  const store = createStore(
    reducer,
    loadState(),
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  store.subscribe(
    throttle(
      () =>
        saveState({
          currentUser: store.getState().currentUser
        }),
      1000
    )
  )

  return store
}

export default configureStore
