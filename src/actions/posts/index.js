import {
  FETCH_ADD_POST,
  FETCH_ADD_POST_DONE,
  FETCH_ADD_POST_ERROR,
  FETCH_POSTS_ALL,
  FETCH_POSTS_ALL_DONE,
  FETCH_POSTS_ALL_ERROR,
  TOGGLE_EDIT_POST,
  FETCH_UPDATED_POST,
  FETCH_UPDATED_POST_DONE,
  FETCH_UPDATED_POST_ERROR,
  REMOVE_POST_DONE,
  CLEAR_POSTS
} from './types'
import { notifyDanger, notifySuccess } from '../notifications'
import { addUsersData } from '../users'
import { postsNormalized, postNormalized } from '../../schema'
import * as api from '../../api/feed'

export const addPost = text => dispatch => {
  dispatch({ type: FETCH_ADD_POST })
  api
    .addPost(text)
    .then(res => {
      const normalized = postNormalized(res.data.data)
      dispatch({
        type: FETCH_ADD_POST_DONE,
        payload: {
          post: normalized.entities.posts[normalized.result]
        }
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_ADD_POST_ERROR
      })
      dispatch(notifyDanger(err.response.data.error))
    })
}

export const toggleEdit = postId => {
  return {
    type: TOGGLE_EDIT_POST,
    payload: {
      postId
    }
  }
}

export const updatePost = (postId, text) => dispatch => {
  dispatch({ type: FETCH_UPDATED_POST, payload: { postId } })
  api
    .updatePost(postId, text)
    .then(res => {
      const normalized = postNormalized(res.data.data)
      dispatch({
        type: FETCH_UPDATED_POST_DONE,
        payload: {
          post: normalized.entities.posts[normalized.result]
        }
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_UPDATED_POST_ERROR,
        payload: {
          postId
        }
      })
      dispatch(notifyDanger(err.response.data.error))
    })
}

export const deletePost = postId => dispatch => {
  api
    .deletePost(postId)
    .then(res => {
      dispatch({ type: REMOVE_POST_DONE, payload: { postId } })
      dispatch(notifySuccess(res.data.data))
    })
    .catch(res => dispatch(notifyDanger(res.data.data)))
}

export const fetchNextPageAll = page => dispatch => {
  dispatch({ type: FETCH_POSTS_ALL })
  api
    .getPaginatedPosts(page)
    .then(res => {
      const normalized = postsNormalized(res.data.data)
      const { users, posts } = normalized.entities
      const result =
        normalized.result instanceof Array
          ? normalized.result
          : [normalized.result]
      const finalAction = {
        type: FETCH_POSTS_ALL_DONE,
        payload: {
          posts,
          result,
          hasMore: result.length === CONFIG.feedPaginationLimit ? true : false
        }
      }

      if (!res.data.data.length) {
        return dispatch(finalAction)
      }

      dispatch(addUsersData(users))

      dispatch(finalAction)
    })
    .catch(() => {
      dispatch({
        type: FETCH_POSTS_ALL_ERROR
      })
    })
}

export const fetchNextPageUser = (username, page) => dispatch => {
  dispatch({ type: FETCH_POSTS_ALL })
  api
    .getPaginatedPostsByUsername(username, page)
    .then(res => {
      const normalized = postsNormalized(res.data.data)
      const { users, posts } = normalized.entities
      const result =
        normalized.result instanceof Array
          ? normalized.result
          : [normalized.result]
      const finalAction = {
        type: FETCH_POSTS_ALL_DONE,
        payload: {
          posts,
          result,
          hasMore: result.length === CONFIG.feedPaginationLimit ? true : false
        }
      }

      if (!res.data.data.length) {
        return dispatch(finalAction)
      }

      dispatch(addUsersData(users))

      dispatch(finalAction)
    })
    .catch(() => {
      dispatch({
        type: FETCH_POSTS_ALL_ERROR
      })
    })
}

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}
