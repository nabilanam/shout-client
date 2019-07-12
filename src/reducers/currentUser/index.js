import {
  USER_LOGGED_IN,
  REFRESHING_TOKEN,
  REMOVE_TOKEN,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_ERROR
} from '../../actions/currentUser/types'

const init = {
  token: '',
  isRefreshingToken: false
}

const reducer = (state = init, action) => {
  const { type, payload } = action
  switch (type) {
  case USER_LOGGED_IN:
  case UPDATE_USER_DONE:
    return {
      ...state,
      ...payload,
      isRefreshingToken: false,
      isUpdating: false
    }
  case UPDATE_USER:
    return { ...state, isUpdating: true }
  case UPDATE_USER_ERROR:
    return { ...state, isUpdating: false }
  case REFRESHING_TOKEN:
    return { ...state, isRefreshingToken: true }
  case REMOVE_TOKEN:
    return { ...state, token: '', isRefreshingToken: false }
  default:
    return state
  }
}

export default reducer
