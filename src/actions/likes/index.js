import { FETCH_LIKES, FETCH_LIKES_DONE, TOGGLE_POST_LIKE } from './types'
import * as api from '../../api/feed'
import { ADD_USER_DATA } from '../users/types'
import { fetchUserPicture } from '../users'
import { likesNormalized } from '../../schema'

export const likePost = postId => dispatch => {
  api.like(postId).then(res => {
    dispatch({
      type: TOGGLE_POST_LIKE,
      payload: { postId, count: res.data.data.count }
    })
  })
}

export const fetchPaginatedLikes = (postId, page) => (dispatch, getState) => {
  dispatch({ type: FETCH_LIKES, payload: { postId } })
  api.getPaginatedLikes(postId, page).then(res => {
    const state = getState()
    const normalized = likesNormalized(res.data.data)
    const { likes, users } = normalized.entities
    const result = normalized.result
    const userIds =
      result instanceof Array
        ? result.map(likeId => likes[likeId].user)
        : likes[result].user
          ? [likes[result].user]
          : []

    const finalAction = {
      type: FETCH_LIKES_DONE,
      payload: {
        postId,
        userIds,
        hasMore: result.length === CONFIG.likePaginationLimit ? true : false
      }
    }

    if (!res.data.data.length) {
      return dispatch(finalAction)
    }

    userIds
      .filter(userId => !state.users.byId[userId])
      .forEach(userId => {
        dispatch({
          type: ADD_USER_DATA,
          payload: { ...users[userId] }
        })
        dispatch(fetchUserPicture(userId))
      })

    dispatch(finalAction)
  })
}
