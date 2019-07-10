import { createSelector } from 'reselect'

import { getUser } from '../users'

const likes = state => state.likes

export const isFetching = createSelector(
  likes,
  likes => postId => likes[postId].isFetching
)

export const getLikeCount = createSelector(
  likes,
  likes => postId => likes[postId].count
)

export const getLikers = createSelector(
  likes,
  getUser,
  (likes, getUser) => postId => likes[postId].userIds.map(id => getUser(id))
)

export const isPostLiked = createSelector(
  likes,
  likes => postId => likes[postId].isLiked
)
