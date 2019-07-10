import { ADD_USER_DATA } from '../users/types'
import { USER_LOGGED_IN, REFRESHING_TOKEN, REMOVE_TOKEN } from './types'
import * as profilesApi from '../../api/profiles'
import * as authApi from '../../api/auth'
import { userNormalized } from '../../schema'
import { notifySuccess, notifyDanger } from '../notifications'
import JwtDecode from 'jwt-decode'

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

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN
  }
}

export const logout = () => dispatch => {
  authApi.logout().then(() => dispatch(removeToken()))
}

export const refreshingToken = () => {
  return {
    type: REFRESHING_TOKEN
  }
}
