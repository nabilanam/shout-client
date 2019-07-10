import { createSelector } from 'reselect'

export const comments = state => state.comments

export const getComment = createSelector(
  comments,
  comments => (postId, commentId) =>
    comments[postId] ? comments[postId].byId[commentId] : {}
)

export const getComments = createSelector(
  comments,
  comments => postId =>
    comments[postId]
      ? comments[postId].allIds.map(id => comments[postId].byId[id])
      : []
)

export const isFetching = createSelector(
  comments,
  comments => postId => (comments[postId] ? comments[postId].isFetching : false)
)

export const hasMore = createSelector(
  comments,
  comments => postId => (comments[postId] ? comments[postId].hasMore : false)
)

export const isAddingNewComment = createSelector(
  comments,
  comments => postId =>
    comments[postId] ? comments[postId].isAddingNewComment : false
)

export const isUpdating = createSelector(
  getComment,
  getComment => postId => commentId => getComment(postId, commentId).isUpdating
)
