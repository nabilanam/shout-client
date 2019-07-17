import JwtDecode from 'jwt-decode'

import {
  USER_LOGGED_IN,
  REFRESHING_TOKEN,
  REMOVE_CURRENT_USER,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_ERROR
} from './types'
import { ADD_USER_DATA } from '../users/types'
import { notifySuccess, notifyDanger } from '../notifications'
import { userNormalized } from '../../schema'
import * as authApi from '../../api/auth'
import * as profilesApi from '../../api/profiles'

export const userLoggedIn = (token, userId) => dispatch => {
  profilesApi
    .getProfileWithToken(userId, token)
    .then(res => {
      const normalized = userNormalized(res.data.data)
      const userData = normalized.entities.users[normalized.result]
      profilesApi.getPictureWithToken(userId, token).then(picture => {
        dispatch({
          type: ADD_USER_DATA,
          payload: { ...userData, picture }
        })
        dispatch({
          type: USER_LOGGED_IN,
          payload: {
            ...userData,
            picture,
            token
          }
        })
        dispatch(notifySuccess(`Welcome ${userData.fullname}!`))
      })
    })
    .catch(() => notifyDanger('An error occurred'))
}

const getUpdateUserActions = userData => {
  return [
    {
      type: ADD_USER_DATA,
      payload: { ...userData }
    },
    {
      type: UPDATE_USER_DONE,
      payload: { ...userData }
    }
  ]
}

export const updateUser = (formData, shouldFetchPicture) => dispatch => {
  dispatch({ type: UPDATE_USER })
  profilesApi
    .updateProfile(formData)
    .then(res => {
      const normalized = userNormalized(res.data.data)
      const userData = normalized.entities.users[normalized.result]
      const actions = getUpdateUserActions(userData)
      if (shouldFetchPicture) {
        profilesApi.getPicture(userData._id).then(picture => {
          actions.forEach(action => {
            action.payload.picture = picture
            dispatch(action)
          })
        })
      } else {
        actions.forEach(action => dispatch(action))
      }
      dispatch(notifySuccess(`Profile successfully updated!`))
    })
    .catch(() => {
      dispatch({ type: UPDATE_USER_ERROR })
      dispatch(notifyDanger(`Profile update unsuccessful!`))
    })
}

export const login = (username, password) => dispatch =>
  authApi.login({ username, password }).then(res => {
    const token = res.data.data
    dispatch(userLoggedIn(token, JwtDecode(token).id))
  })

export const confirmUser = key => dispatch =>
  authApi
    .confirm(key)
    .then(res => {
      const token = res.data.data
      dispatch(userLoggedIn(token, JwtDecode(token).id))
    })
    .catch(() => dispatch(notifyDanger('Invalid auth key')))

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  }
}

export const logout = () => dispatch => {
  authApi.logout().then(() => dispatch(removeCurrentUser()))
}

export const refreshingToken = () => {
  return {
    type: REFRESHING_TOKEN
  }
}
