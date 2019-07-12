import { createSelector } from 'reselect'

export const currentUser = state => state.currentUser

const token = createSelector(
  currentUser,
  currentUser => currentUser.token
)

export const hasToken = createSelector(
  token,
  token => !!token
)

export const getUserId = createSelector(
  currentUser,
  currentUser => currentUser._id
)

export const getUsername = createSelector(
  currentUser,
  currentUser => currentUser.username
)

export const getPicture = createSelector(
  currentUser,
  currentUser => currentUser.picture
)

export const isUpdating = createSelector(
  currentUser,
  currentUser => currentUser.isUpdating
)
