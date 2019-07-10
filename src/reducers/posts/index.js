import {
  FETCH_ADD_POST,
  FETCH_ADD_POST_DONE,
  FETCH_ADD_POST_ERROR,
  FETCH_POSTS_ALL,
  FETCH_POSTS_ALL_DONE,
  FETCH_POSTS_ALL_ERROR,
  TOGGLE_EDIT_POST,
  FETCH_UPDATED_POST_DONE,
  FETCH_UPDATED_POST,
  REMOVE_POST_DONE,
  FETCH_UPDATED_POST_ERROR,
  CLEAR_POSTS
} from '../../actions/posts/types'
import {
  FETCH_ADD_COMMENT_DONE,
  FETCH_UPDATE_COMMENT_DONE,
  FETCH_REMOVE_COMMENT_DONE
} from '../../actions/comments/types'

const byId = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_POST_DONE:
    return { ...state, [payload.post._id]: { ...payload.post } }
  case FETCH_POSTS_ALL_DONE:
    return { ...state, ...payload.posts }
  case TOGGLE_EDIT_POST: {
    const post = state[payload.postId]
    return {
      ...state,
      [post._id]: {
        ...post,
        isEditable: !post.isEditable
      }
    }
  }
  case FETCH_UPDATED_POST:
    return {
      ...state,
      [payload.postId]: {
        ...state[payload.postId],
        isUpdating: true
      }
    }
  case FETCH_UPDATED_POST_DONE: {
    const post = payload.post
    return {
      ...state,
      [post._id]: {
        ...state[post._id],
        ...post,
        isEditable: false,
        isUpdating: false
      }
    }
  }
  case FETCH_UPDATED_POST_ERROR:
    return {
      ...state,
      [payload.postId]: {
        ...state[payload.postId],
        isEditable: false,
        isUpdating: false
      }
    }
  case REMOVE_POST_DONE:
    return Object.keys(state)
      .filter(key => key !== payload.postId)
      .reduce((newState, key) => {
        newState[key] = state[key]
        return newState
      }, {})
  case FETCH_ADD_COMMENT_DONE:
  case FETCH_UPDATE_COMMENT_DONE:
  case FETCH_REMOVE_COMMENT_DONE:
    return {
      ...state,
      [payload.postId]: {
        ...state[payload.postId],
        comments: payload.comment.count
      }
    }
  default:
    return state
  }
}

const allIds = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_POST_DONE:
    return [payload.post._id, ...state]
  case FETCH_POSTS_ALL_DONE:
    return [...state, ...payload.result.filter(id => !state.includes(id))]
  case REMOVE_POST_DONE:
    return state.filter(id => id !== payload.postId)
  default:
    return state
  }
}

const initial = {
  isFetchingManyPosts: false,
  hasMore: true,
  byId: {},
  allIds: []
}

const reducer = (state = initial, action) => {
  switch (action.type) {
  case CLEAR_POSTS:
    return initial
  case FETCH_ADD_POST:
    return {
      ...state,
      isFetchingOnePost: true
    }
  case FETCH_ADD_POST_DONE:
    return {
      ...state,
      isFetchingOnePost: false,
      byId: byId(state.byId, action),
      allIds: allIds(state.allIds, action)
    }
  case FETCH_ADD_POST_ERROR:
    return { ...state, isFetchingOnePost: false }
  case FETCH_POSTS_ALL:
    return { ...state, isFetchingManyPosts: true, hasMore: true }
  case FETCH_POSTS_ALL_DONE:
    return {
      ...state,
      isFetchingManyPosts: false,
      hasMore: action.payload.hasMore,
      byId: byId(state.byId, action),
      allIds: allIds(state.allIds, action)
    }
  case FETCH_POSTS_ALL_ERROR:
    return { ...state, isFetchingManyPosts: false }
  default:
    return {
      ...state,
      byId: byId(state.byId, action),
      allIds: allIds(state.allIds, action)
    }
  }
}

export default reducer
