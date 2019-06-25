import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from '../../auth/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
