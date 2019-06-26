/* eslint-disable no-console */
const logger = store => next => action => {
  const today = new Date()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.group(`${action.type} | ${time}`)
  console.log('payload: ', action.payload)
  const result = next(action)
  console.log('nextState: ', store.getState())
  console.groupEnd()
  return result
}

export default logger
