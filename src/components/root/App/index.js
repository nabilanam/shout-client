import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from '../../auth/Register'
import Login from '../../auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
