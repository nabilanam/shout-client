export const loadState = () => {
  try {
    const state = localStorage.getItem('state')
    if (!state) {
      return undefined
    }
    return JSON.parse(state)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (err) {
    return undefined
  }
}

export const isTokenSaved = () => {
  const state = loadState()
  return state && state.currentUser && state.currentUser.token
}
