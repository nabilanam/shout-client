import {
  FETCH_ADD_COMMENT,
  FETCH_ADD_COMMENT_DONE,
  FETCH_ALL_COMMENTS,
  FETCH_ALL_COMMENTS_DONE,
  FETCH_ADD_COMMENT_ERROR,
  TOGGLE_EDIT_COMMENT,
  FETCH_REMOVE_COMMENT_DONE,
  FETCH_UPDATE_COMMENT,
  FETCH_UPDATE_COMMENT_DONE,
  FETCH_UPDATE_COMMENT_ERROR
} from '../../actions/comments/types'

const byId = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_COMMENT_DONE:
    return {
      ...state,
      [payload.comment._id]: {
        ...state[payload.comment._id],
        ...payload.comment
      }
    }
  case TOGGLE_EDIT_COMMENT:
    return {
      ...state,
      [payload.commentId]: {
        ...state[payload.commentId],
        isEditable: !state[payload.commentId].isEditable
      }
    }
  case FETCH_UPDATE_COMMENT:
    return {
      ...state,
      [payload.commentId]: {
        ...state[payload.commentId],
        isUpdating: true
      }
    }
  case FETCH_UPDATE_COMMENT_DONE:
  case FETCH_UPDATE_COMMENT_ERROR:
    return {
      ...state,
      [payload.comment._id]: {
        ...state[payload.comment._id],
        ...payload.comment,
        isUpdating: false,
        isEditable: false
      }
    }
  case FETCH_ALL_COMMENTS_DONE:
    return {
      ...state,
      ...payload.comments
    }
  case FETCH_REMOVE_COMMENT_DONE:
    return Object.keys(state)
      .filter(id => id !== payload.commentId)
      .reduce((acc, val) => {
        acc[val] = state[val]
        return acc
      }, {})
  default:
    return state
  }
}

const allIds = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_COMMENT_DONE:
    return [payload.comment._id, ...state]
  case FETCH_ALL_COMMENTS_DONE:
    return [...state, ...payload.result.filter(id => !state.includes(id))]
  case FETCH_REMOVE_COMMENT_DONE:
    return state.filter(id => id !== payload.commentId)
  default:
    return state
  }
}

const reducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_ADD_COMMENT: {
    const prev = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...prev,
        byId: byId(prev ? prev.byId : {}, action),
        allIds: allIds(prev ? prev.allIds : [], action),
        isAddingNewComment: true
      }
    }
  }
  case FETCH_ADD_COMMENT_DONE: {
    const prev = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...prev,
        byId: byId(prev ? prev.byId : {}, action),
        allIds: allIds(prev ? prev.allIds : [], action),
        isAddingNewComment: false
      }
    }
  }
  case FETCH_UPDATE_COMMENT:
  case FETCH_ADD_COMMENT_ERROR:
  case FETCH_UPDATE_COMMENT_DONE:
  case FETCH_UPDATE_COMMENT_ERROR:
  case FETCH_REMOVE_COMMENT_DONE:
  case TOGGLE_EDIT_COMMENT: {
    const prev = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...prev,
        byId: byId(prev.byId, action),
        allIds: allIds(prev.allIds, action)
      }
    }
  }
  case FETCH_ALL_COMMENTS: {
    const prev = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...prev,
        byId: byId(prev ? prev.byId : {}, action),
        allIds: allIds(prev ? prev.allIds : [], action),
        isFetching: true,
        hasMore: true
      }
    }
  }
  case FETCH_ALL_COMMENTS_DONE: {
    const prev = state[payload.postId]
    return {
      ...state,
      [payload.postId]: {
        ...prev,
        byId: byId(prev.byId, action),
        allIds: allIds(prev.allIds, action),
        isFetching: false,
        hasMore: payload.hasMore
      }
    }
  }
  default:
    return state
  }
}

export default reducer
