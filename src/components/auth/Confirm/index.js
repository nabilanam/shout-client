import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { confirm } from '../../../api/auth'
import { addToken } from '../../../actions/currentUser'
import { addNotification } from '../../../actions/notifications'
import { hasToken } from '../../../selectors/currentUser'
import Hero from '../../presentational/Hero'
import CenteredColumn from '../../presentational/CenteredColumn'
import Notifications from '../../container/Notifications'
import * as colors from '../../_constants/bulma-colors'
import AuthRedirection from '../AuthRedirection'

class Confirm extends Component {
  verifyKey = key => {
    confirm(key)
      .then(res => {
        this.props.addToken(res.data.data)
        this.props.addNotification(
          'Email confirmation successful!',
          colors.isSuccess
        )
      })
      .catch(() => this.props.addNotification('Invalid Key!', colors.isDanger))
  }

  componentDidMount() {
    const { key } = this.props.match.params
    if (key) {
      this.verifyKey(key)
    }
  }

  render() {
    return (
      <Hero>
        <AuthRedirection isProtected={false} />
        <CenteredColumn>
          <Notifications />
        </CenteredColumn>
      </Hero>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasToken: hasToken(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToken: token => dispatch(addToken(token)),
    addNotification: (text, color) => dispatch(addNotification(text, color))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm)
