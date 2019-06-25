import React from 'react'
import ReacDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/root/App'
import configureApi from './api/configure'
import reducer from './reducers'

configureApi()

ReacDOM.render(
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
