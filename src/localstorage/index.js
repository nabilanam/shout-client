export const loadState = () => {
  try {
    let state = localStorage.getItem('state')
    if (!state) {
      return undefined
    }
    state = JSON.parse(state)

    const user = { ...state.currentUser }
    delete user.email
    delete user.token
    delete user.isUpdating
    delete user.isRefreshingToken

    return { ...state, users: { byId: { [user._id]: { ...user } } } }
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
