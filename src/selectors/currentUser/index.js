import { createSelector } from 'reselect'

const token = state => state.currentUser.token

export const hasToken = createSelector(
  token,
  token => (token ? true : false)
)
