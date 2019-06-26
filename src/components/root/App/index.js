import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from '../../auth/Register'
import Login from '../../auth/Login'
import Confirm from '../../auth/Confirm'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/auth/:key?" component={Confirm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
