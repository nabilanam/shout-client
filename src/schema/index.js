import { normalize, schema } from 'normalizr'
import moment from 'moment'

const user = new schema.Entity(
  'users',
  {},
  {
    idAttribute: '_id',
    processStrategy: value => {
      return {
        ...value,
        fullname:
          value.firstname && value.lastname
            ? value.firstname + ' ' + value.lastname
            : value.username
      }
    }
  }
)

const post = new schema.Entity(
  'posts',
  {
    user
  },
  {
    idAttribute: '_id',
    processStrategy: value => {
      const { created_at } = value
      const newValue = {
        ...value,
        isEditable: false,
        isUpdating: false,
        date: moment(created_at).format('DD-MM-YY'),
        time: moment(created_at).format('ddd hh:mm A')
      }
      return newValue
    }
  }
)

const like = new schema.Entity('likes', { user }, { idAttribute: '_id' })

const comment = new schema.Entity(
  'comments',
  { user },
  {
    idAttribute: '_id',
    processStrategy: value => {
      const { created_at } = value
      const newValue = {
        ...value,
        isEditable: false,
        isUpdating: false,
        date: moment(created_at).format('DD-MM-YY'),
        time: moment(created_at).format('hh:mm A')
      }
      return newValue
    }
  }
)

export const userNormalized = data => normalize(data, user)
export const postNormalized = data => normalize(data, post)
export const postsNormalized = data => normalize(data, [post])
export const likesNormalized = data => normalize(data, [like])
export const commentNormalized = data => normalize(data, comment)
export const commentsNormalized = data => normalize(data, [comment])
