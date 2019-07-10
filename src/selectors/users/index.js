import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'

const byId = state => state.users.byId

export const getUser = createSelector(
  byId,
  byId => memoize(userId => byId[userId])
)

export const getUserPicture = createSelector(
  getUser,
  getUser => memoize(userId => getUser(userId).picture)
)

export const getUsername = createSelector(
  getUser,
  getUser => memoize(userId => getUser(userId).username)
)

export const getUserId = createSelector(
  byId,
  byId =>
    memoize(username => {
      const allIds = Object.keys(byId)
      for (let userId of allIds) {
        if (byId[userId].username === username) {
          return byId[userId]._id
        }
      }
    })
)
