import { combineReducers } from 'redux'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../../actions/notifications/types'

const byId = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
  case ADD_NOTIFICATION:
    return {
      ...state,
      [payload.id]: {
        id: payload.id,
        text: payload.text,
        color: payload.color
      }
    }

  case REMOVE_NOTIFICATION:
    return Object.keys(state)
      .filter(key => key !== payload.id.toString())
      .reduce((obj, key) => ((obj[key] = state[key]), obj), {})

  default:
    return state
  }
}

const allIds = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
  case ADD_NOTIFICATION:
    return state.concat(payload.id)

  case REMOVE_NOTIFICATION:
    return state.filter(curId => curId !== payload.id)

  default:
    return state
  }
}

const reducer = combineReducers({ byId, allIds })

export default reducer
