import { connect } from 'react-redux'
import React, { Component } from 'react'

import * as currentUserActions from '../../../actions/currentUser'
import * as currentUserSelectors from '../../../selectors/currentUser'
import AuthRedirection from '../AuthRedirection'
import CenteredColumn from '../../presentational/CenteredColumn'
import Hero from '../../presentational/Hero'
import Notifications from '../../container/Notifications'

class Confirm extends Component {
  componentDidMount() {
    this.props.confirmUser(this.props.match.params.key)
  }

  render() {
    return (
      <Hero>
        <AuthRedirection isProtected={false} hasToken={this.props.hasToken} />
        <CenteredColumn>
          <Notifications />
        </CenteredColumn>
      </Hero>
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
    confirmUser: key => dispatch(currentUserActions.confirmUser(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm)
