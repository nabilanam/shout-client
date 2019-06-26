import { createStore, applyMiddleware } from 'redux'
import { loadState, saveState } from '../localstorage'
import throttle from 'lodash/throttle'
import reducer from '../reducers'
import middlewares from './middlewares'

const configureStore = () => {
  const store = createStore(
    reducer,
    loadState(),
    applyMiddleware(...middlewares)
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
