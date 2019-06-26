import { combineReducers } from 'redux'
import currentUser from './currentUser'
import notifications from './notifications'

const reducer = combineReducers({ currentUser, notifications })

export default reducer
