import axios from 'axios'
const route = '/api/profiles'

export const getPicture = userId => axios.get(`${route}/${userId}/picture`)

export const getProfileByUserId = userId => axios.get(`${route}/id/${userId}`)

export const getProfileByUsername = username =>
  axios.get(`${route}/${username}`)

export const updateProfile = formData =>
  axios.post(`${route}/update`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
