import { createSelector } from 'reselect'
import { getUserId } from '../users'

const byId = state => state.posts.byId

const allIds = state => state.posts.allIds

export const hasMorePosts = state => state.posts.hasMore

export const isFetchingManyPosts = state => state.posts.isFetchingManyPosts

export const isFetchingOnePost = state => state.posts.isFetchingOnePost

export const getAllPosts = createSelector(
  byId,
  allIds,
  (byId, allIds) => allIds.map(id => byId[id])
)

export const getAllPostsByUsername = createSelector(
  byId,
  allIds,
  getUserId,
  (byId, allIds, getUserId) => username => {
    const userId = getUserId(username)
    return allIds.map(id => byId[id]).filter(post => post.user === userId)
  }
)
