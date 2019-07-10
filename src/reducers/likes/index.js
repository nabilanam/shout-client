import {
  FETCH_LIKES,
  FETCH_LIKES_DONE,
  TOGGLE_POST_LIKE
} from '../../actions/likes/types'
import {
  FETCH_POSTS_ALL_DONE,
  FETCH_ADD_POST_DONE,
  FETCH_UPDATED_POST_DONE,
  REMOVE_POST_DONE
} from '../../actions/posts/types'

const userIds = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_LIKES_DONE:
    return [...payload.userIds.filter(id => !state.includes(id))]
  default:
    return state
  }
}

const reducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_POST_DONE:
  case FETCH_UPDATED_POST_DONE: {
    const post = payload.post
    return {
      ...state,
      [post._id]: {
        count: post.likes,
        isLiked: post.isLiked,
        userIds: []
      }
    }
  }
  case FETCH_POSTS_ALL_DONE: {
    let posts = {}
    payload.result.forEach(postId => {
      const post = payload.posts[postId]
      posts = {
        ...posts,
        [postId]: {
          count: post.likes,
          isLiked: post.isLiked,
          userIds: []
        }
      }
    })
    return {
      ...state,
      ...posts
    }
  }
  case FETCH_LIKES:
    return {
      ...state,
      [payload.postId]: {
        ...state[payload.postId],
        userIds: [],
        isFetching: true,
        count: state[payload.postId].count
      }
    }
  case FETCH_LIKES_DONE:
    return {
      ...state,
      [payload.postId]: {
        ...state[payload.postId],
        isFetching: false,
        count: state[payload.postId].count,
        userIds: userIds(state[payload.postId].userIds, action)
      }
    }
  case TOGGLE_POST_LIKE: {
    const post = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...post,
        isLiked: !post.isLiked,
        count: payload.count
      }
    }
  }
  case REMOVE_POST_DONE:
    return Object.keys(state)
      .filter(key => key !== payload.postId)
      .reduce((newState, key) => {
        newState[key] = state[key]
        return newState
      }, {})
  default:
    return state
  }
}

export default reducer
