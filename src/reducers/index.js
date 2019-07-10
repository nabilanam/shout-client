import { combineReducers } from 'redux'

import currentUser from './currentUser'
import notifications from './notifications'
import posts from './posts'
import users from './users'
import likes from './likes'
import comments from './comments'

export default combineReducers({
  currentUser,
  notifications,
  posts,
  users,
  likes,
  comments
})
