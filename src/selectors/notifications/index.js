import { createSelector } from 'reselect'

const byId = state => state.notifications.byId
const allIds = state => state.notifications.allIds

export const getNotifications = createSelector(
  byId,
  allIds,
  (byId, allIds) => allIds.map(id => byId[id])
)
