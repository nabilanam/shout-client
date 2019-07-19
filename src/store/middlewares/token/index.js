import JwtDecode from 'jwt-decode'
import moment from 'moment'

import {
  USER_LOGGED_IN,
  REFRESHING_TOKEN,
  REMOVE_CURRENT_USER
} from '../../../actions/currentUser/types'
import * as currentUserActions from '../../../actions/currentUser'
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
      dispatch(
        currentUserActions.userLoggedIn(
          res.data.data,
          JwtDecode(res.data.data).id
        )
      )
      dispatchActionsInBuffers(dispatch)
    })
    .catch(() => {
      dispatch(currentUserActions.removeCurrentUser())
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
  if (
    typeof action !== 'function' ||
    action.type === USER_LOGGED_IN ||
    action.type === REFRESHING_TOKEN ||
    action.type === REMOVE_CURRENT_USER
  ) {
    return next(action)
  } else if (currentUser.isRefreshingToken) {
    buffer.push(action)
  } else {
    const { token } = currentUser
    if (token && isRefreshRequired(token)) {
      buffer.push(action)
      dispatch(currentUserActions.refreshingToken())
      renewToken(dispatch)
    } else {
      return next(action)
    }
  }
}

export default token
