import axios from 'axios'

export const register = ({ username, email, password }) =>
  axios.post('/users', { username, email, password })

export const login = ({ username, password }) =>
  axios.post('/auth/login', { username, password })

export const confirm = key => axios.get('/auth/' + key)

export const logout = () => axios.get('/auth/logout')
