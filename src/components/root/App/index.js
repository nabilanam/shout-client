import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'

import Confirm from '../../auth/Confirm'
import Feed from '../../container/Feed'
import Login from '../../auth/Login'
import Register from '../../auth/Register'
import Logout from '../../auth/Logout'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/auth/:key" component={Confirm} />
        <Route
          exact
          path="/feed/all"
          render={props => <Feed key="1" {...props} />}
        />
        <Route
          exact
          path="/feed/:username"
          render={props => <Feed key="2" {...props} />}
        />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
