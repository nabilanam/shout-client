import JwtDecode from 'jwt-decode'
import moment from 'moment'
import {
  ADD_TOKEN,
  REFRESHING_TOKEN,
  REMOVE_TOKEN
} from '../../../actions/currentUser/types'
import {
  addToken,
  refreshingToken,
  removeToken
} from '../../../actions/currentUser'
import { extend } from '../../../api/auth'

const buffer = []

const dispatchActionsInBuffers = dispatch => {
  if (buffer.length) {
    for (let action of buffer) {
      dispatch(action)
    }
    buffer.length = 0
  }
}

const renewToken = dispatch => {
  extend()
    .then(res => {
      dispatch(addToken(res.data.data))
      dispatchActionsInBuffers(dispatch)
    })
    .catch(() => {
      dispatch(removeToken())
      dispatchActionsInBuffers(dispatch)
    })
}

const isRefreshRequired = token => {
  const decoded = JwtDecode(token)
  const diff = moment(decoded.exp * 1000) - moment(Date.now())
  return diff < CONFIG.tokenRefreshAge
}

const token = ({ getState, dispatch }) => next => action => {
  const currentUser = getState().currentUser
  if (typeof action !== 'function') {
    return next(action)
  } else if (
    action.type === ADD_TOKEN ||
    action.type === REFRESHING_TOKEN ||
    action.type === REMOVE_TOKEN
  ) {
    return next(action)
  } else if (currentUser.isRefreshingToken) {
    buffer.push(action)
  } else {
    const { token } = currentUser
    if (token) {
      if (isRefreshRequired(token)) {
        buffer.push(action)
        dispatch(refreshingToken())
        renewToken(dispatch)
      } else {
        return next(action)
      }
    }
  }
}

export default token
