import {
  USER_LOGGED_IN,
  REFRESHING_TOKEN,
  REMOVE_TOKEN
} from '../../actions/currentUser/types'

const init = {
  token: '',
  isRefreshingToken: false
}

const reducer = (state = init, action) => {
  const { type, payload } = action
  switch (type) {
  case USER_LOGGED_IN:
    return {
      ...state,
      ...payload,
      isRefreshingToken: false
    }
  case REFRESHING_TOKEN:
    return { ...state, isRefreshingToken: true }
  case REMOVE_TOKEN:
    return { ...state, token: '', isRefreshingToken: false }
  default:
    return state
  }
}

export default reducer
