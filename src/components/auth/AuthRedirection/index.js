import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { hasToken } from '../../../selectors/currentUser'

const AuthRedirection = ({ isProtected = true, hasToken }) => {
  if (isProtected && !hasToken) {
    return <Redirect to="/login" />
  } else if (!isProtected && hasToken) {
    return <Redirect to="/feed/all" />
  }
  return null
}

AuthRedirection.propTypes = {
  isProtected: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    hasToken: hasToken(state)
  }
}

export default connect(mapStateToProps)(AuthRedirection)
