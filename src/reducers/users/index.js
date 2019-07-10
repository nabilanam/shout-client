import { combineReducers } from 'redux'
import { ADD_USER_DATA, ADD_PROFILE_PICTURE } from '../../actions/users/types'

const byId = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
  case ADD_USER_DATA:
    return {
      ...state,
      [payload._id]: { ...state[payload._id], ...payload }
    }
  case ADD_PROFILE_PICTURE:
    return {
      ...state,
      [payload.userId]: { ...state[payload.userId], picture: payload.picture }
    }
  default:
    return state
  }
}

export default combineReducers({ byId })
