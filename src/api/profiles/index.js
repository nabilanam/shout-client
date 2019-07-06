import axios from 'axios'
const route = '/api/profiles'

export const getPicture = userId =>
  axios
    .get(`${route}/${userId}/picture`, { responseType: 'arraybuffer' })
    .then(
      res =>
        `data:${res.headers['content-type']};base64,${btoa(
          String.fromCharCode(...new Uint8Array(res.data))
        )}`
    )

export const getProfileByUserId = userId => axios.get(`${route}/id/${userId}`)

export const getProfileByUsername = username =>
  axios.get(`${route}/${username}`)

export const updateProfile = formData =>
  axios.post(`${route}/update`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const getProfileWithToken = (userId, token) =>
  axios.get(`${route}/id/${userId}`, { headers: { 'x-auth-token': token } })

export const getPictureWithToken = (userId, token) =>
  axios
    .get(`${route}/${userId}/picture`, {
      responseType: 'arraybuffer',
      headers: { 'x-auth-token': token }
    })
    .then(
      res =>
        `data:${res.headers['content-type']};base64,${btoa(
          String.fromCharCode(...new Uint8Array(res.data))
        )}`
    )
