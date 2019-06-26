import {
  ADD_TOKEN,
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
  case ADD_TOKEN:
    return { ...state, token: payload.token, isRefreshingToken: false }
  case REFRESHING_TOKEN:
    return { ...state, isRefreshingToken: true }
  case REMOVE_TOKEN:
    return { ...state, token: '', isRefreshingToken: false }
  default:
    return state
  }
}

export default reducer
