import {
  ADD_TOKEN,
  REFRESHING_TOKEN,
  REMOVE_TOKEN,
  LOADED_USER_DATA
} from './types'
import { addNotification } from '../notifications'
import { getProfileByUserId } from '../../api/profiles'

export const addToken = token => {
  return {
    type: ADD_TOKEN,
    payload: {
      token
    }
  }
}

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN
  }
}

export const refreshingToken = () => {
  return {
    type: REFRESHING_TOKEN
  }
}

export const fetchUserData = id => {
  return dispatch =>
    getProfileByUserId(id)
      .then(res => dispatch({ type: LOADED_USER_DATA, payload: res.data.data }))
      .catch(() =>
        dispatch(
          addNotification(
            'Error loading user data. Please refresh!',
            'is-danger'
          )
        )
      )
}
