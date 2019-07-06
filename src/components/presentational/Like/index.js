import PropTypes from 'prop-types'
import React from 'react'

import Figure from '../Figure'

const Like = ({ username, fullname, picture }) => {
  return (
    <article className="media" style={{ borderTop: 0, paddingTop: 0 }}>
      <Figure picture={picture} size={32} />
      <div className="media-content">
        <div className="content">
          <p>
            <strong style={{ textTransform: 'capitalize' }}>{fullname}</strong>
            <small>{' @' + username}</small>
          </p>
        </div>
      </div>
    </article>
  )
}

Like.propTypes = {
  fullname: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default Like
