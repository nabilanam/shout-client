import { Provider } from 'react-redux'
import ReacDOM from 'react-dom'
import React from 'react'

import App from './components/root/App'
import configureApi from './api/configure'
import configureStore from './store'

configureApi()

ReacDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
