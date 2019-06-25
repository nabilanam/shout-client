import * as axios from 'axios'

const configureApi = () => {
  axios.defaults.baseURL = CONFIG.apiURL
  axios.interceptors.request.use(
    cfg => {
      if (!cfg.headers['x-auth-token']) {
        const token = localStorage.getItem('auth.token')
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
