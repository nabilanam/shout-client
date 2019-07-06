import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

const AuthRedirection = ({ isProtected, hasToken }) => {
  if (isProtected && !hasToken) {
    return <Redirect to="/login" />
  } else if (!isProtected && hasToken) {
    return <Redirect to="/feed/all" />
  }
  return null
}

AuthRedirection.propTypes = {
  isProtected: PropTypes.bool.isRequired,
  hasToken: PropTypes.bool.isRequired
}

export default AuthRedirection
