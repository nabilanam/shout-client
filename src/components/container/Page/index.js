import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import * as currentUserSelectors from '../../../selectors/currentUser'
import AuthRedirection from '../../auth/AuthRedirection'
import Footer from '../../presentational/Footer'
import Header from '../../presentational/Header'
import Notifications from '../Notifications'

class Page extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <AuthRedirection isProtected={true} hasToken={this.props.hasToken} />
        <Notifications />
        <Header username={this.props.username} />
        <div className="section">
          <div className="container">
            {this.props.hasToken ? this.props.children : null}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

const mapStateToProps = state => {
  return {
    username: currentUserSelectors.getUsername(state),
    hasToken: currentUserSelectors.hasToken(state)
  }
}

export default connect(mapStateToProps)(Page)
