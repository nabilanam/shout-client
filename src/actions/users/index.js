import { ADD_USER_DATA, ADD_PROFILE_PICTURE } from './types'
import * as api from '../../api/profiles'
import { userNormalized } from '../../schema'

export const fetchUserPicture = userId => dispatch =>
  api.getPicture(userId).then(picture => {
    dispatch({ type: ADD_PROFILE_PICTURE, payload: { userId, picture } })
  })

export const fetchUserProfile = username => dispatch =>
  api.getProfileByUsername(username).then(res => {
    const normalized = userNormalized(res.data.data)
    const userData = normalized.entities.users[normalized.result]
    api.getPicture(userData._id).then(picture => {
      dispatch({ type: ADD_USER_DATA, payload: { ...userData, picture } })
    })
  })

export const addUsersData = users => (dispatch, getState) => {
  const state = getState()
  Object.keys(users).forEach(userId => {
    dispatch({
      type: ADD_USER_DATA,
      payload: { ...users[userId] }
    })

    if (!state.users.byId[userId]) {
      dispatch(fetchUserPicture(userId))
    }
  })
}
