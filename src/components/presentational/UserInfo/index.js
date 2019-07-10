import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const UserInfo = ({ username, fullname, date, time, postUrl }) => {
  return (
    <Fragment>
      <NavLink to={`/profile/${username}`}>
        <strong style={{ textTransform: 'capitalize' }}>{fullname}</strong>
      </NavLink>
      <br />
      <NavLink to={`/feed/${username}`}>
        <small>{'@' + username}</small>
      </NavLink>
      {' . '}
      {postUrl ? (
        <Fragment>
          <NavLink to={postUrl}>
            <small>{date}</small>
            {' . '}
          </NavLink>
          <NavLink to={postUrl}>
            <small>{time}</small>
          </NavLink>
        </Fragment>
      ) : (
        <Fragment>
          <small>{date}</small>
          {' . '}
          <small>{time}</small>
        </Fragment>
      )}
    </Fragment>
  )
}

UserInfo.propTypes = {
  date: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  postUrl: PropTypes.string,
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default UserInfo
