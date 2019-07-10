import { ADD_USER_DATA, ADD_PROFILE_PICTURE } from './types'
import * as api from '../../api/profiles'

export const fetchUserPicture = userId => dispatch =>
  api.getPicture(userId).then(picture => {
    dispatch({ type: ADD_PROFILE_PICTURE, payload: { userId, picture } })
  })

export const fetchUserData = userId => dispatch =>
  api.getProfileByUserId(userId).then(res => {
    const userData = res.data.data
    api.getPicture(userId).then(picture => {
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
