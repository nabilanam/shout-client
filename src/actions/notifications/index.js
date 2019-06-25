import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types'

let nextId = 0

export const addNotification = (text, color) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      id: nextId++,
      text,
      color
    }
  }
}

export const removeNotification = id => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: {
      id
    }
  }
}
