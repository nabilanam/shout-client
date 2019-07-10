import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

import * as currentUserActions from '../../../actions/currentUser'
import * as currentUserSelectors from '../../../selectors/currentUser'
import * as notificationActions from '../../../actions/notifications'

class Logout extends Component {
  componentDidMount() {
    this.props.logout(this.props.token)
    this.props.notifySuccess('Goodbye!')
    document.body.classList.remove('has-navbar-fixed-top')
  }

  render() {
    return (
      <Fragment>
        {this.props.hasToken ? <p>Logging out...</p> : <Redirect to="/login" />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasToken: currentUserSelectors.hasToken(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(currentUserActions.logout()),
    notifySuccess: text => dispatch(notificationActions.notifySuccess(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)
