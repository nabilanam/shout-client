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

export const notifyDanger = text => {
  return addNotification(text, 'is-danger')
}

export const notifyWarning = text => {
  return addNotification(text, 'is-warning')
}

export const notifySuccess = text => {
  return addNotification(text, 'is-success')
}

export const removeNotification = id => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: {
      id
    }
  }
}
