import axios from 'axios'
import { loadState } from '../localstorage'

const configureApi = () => {
  axios.defaults.baseURL = CONFIG.apiURL
  axios.interceptors.request.use(
    cfg => {
      const state = loadState()
      if (state) {
        const { token } = state.currentUser
        if (token) {
          cfg.headers['x-auth-token'] = token
        }
      }
      return cfg
    },
    error => Promise.reject(error)
  )
}

export default configureApi
