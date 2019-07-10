import {
  FETCH_ADD_COMMENT,
  FETCH_ADD_COMMENT_DONE,
  FETCH_ADD_COMMENT_ERROR,
  FETCH_ALL_COMMENTS,
  FETCH_ALL_COMMENTS_DONE,
  FETCH_ALL_COMMENTS_ERROR,
  TOGGLE_EDIT_COMMENT,
  FETCH_UPDATE_COMMENT,
  FETCH_UPDATE_COMMENT_DONE,
  FETCH_UPDATE_COMMENT_ERROR,
  FETCH_REMOVE_COMMENT,
  FETCH_REMOVE_COMMENT_DONE,
  FETCH_REMOVE_COMMENT_ERROR
} from './types'
import { addUsersData } from '../users'
import * as api from '../../api/feed'
import { commentNormalized, commentsNormalized } from '../../schema'

export const addComment = (postId, text) => dispatch => {
  dispatch({ type: FETCH_ADD_COMMENT, payload: { postId } })
  api
    .addComment(postId, text)
    .then(res => {
      const normalized = commentNormalized(res.data.data)
      dispatch({
        type: FETCH_ADD_COMMENT_DONE,
        payload: {
          postId,
          comment: normalized.entities.comments[normalized.result]
        }
      })
    })
    .catch(() =>
      dispatch({ type: FETCH_ADD_COMMENT_ERROR, payload: { postId } })
    )
}

export const fetchNextComments = (postId, page) => dispatch => {
  dispatch({ type: FETCH_ALL_COMMENTS, payload: { postId } })
  api
    .getPaginatedComments(postId, page)
    .then(res => {
      const normalized = commentsNormalized(res.data.data)
      const { comments, users } = normalized.entities
      dispatch({
        type: FETCH_ALL_COMMENTS_DONE,
        payload: {
          postId,
          comments,
          result: normalized.result,
          hasMore: CONFIG.commentPaginationLimit === normalized.result.length
        }
      })
      if (users) {
        dispatch(addUsersData(users))
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_ALL_COMMENTS_ERROR, payload: { postId } })
    })
}

export const toggleEdit = (postId, commentId) => {
  return {
    type: TOGGLE_EDIT_COMMENT,
    payload: {
      postId,
      commentId
    }
  }
}

export const updateComment = (postId, commentId, text) => dispatch => {
  dispatch({ type: FETCH_UPDATE_COMMENT, payload: { postId, commentId } })
  api
    .updateComment(postId, commentId, text)
    .then(res => {
      const normalized = commentNormalized(res.data.data)
      dispatch({
        type: FETCH_UPDATE_COMMENT_DONE,
        payload: {
          postId,
          comment: normalized.entities.comments[normalized.result]
        }
      })
    })
    .catch(() => {
      dispatch({
        type: FETCH_UPDATE_COMMENT_ERROR,
        payload: {
          postId,
          commentId
        }
      })
    })
}

export const deleteComment = (postId, commentId) => dispatch => {
  api
    .deleteComment(postId, commentId)
    .then(res => {
      dispatch({
        type: FETCH_REMOVE_COMMENT_DONE,
        payload: {
          postId,
          commentId,
          comment: res.data.data
        }
      })
    })
    .catch(() => {
      dispatch({
        type: FETCH_REMOVE_COMMENT_ERROR,
        payload: {
          postId,
          commentId
        }
      })
    })
}
