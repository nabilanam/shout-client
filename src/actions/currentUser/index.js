import { ADD_TOKEN, REFRESHING_TOKEN, REMOVE_TOKEN } from './types'

export const addToken = token => {
  return {
    type: ADD_TOKEN,
    payload: {
      token
    }
  }
}

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN
  }
}

export const refreshingToken = () => {
  return {
    type: REFRESHING_TOKEN
  }
}
