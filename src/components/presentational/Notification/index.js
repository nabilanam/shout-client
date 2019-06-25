import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ text, color, onClick }) => {
  return (
    <div className={'notification ' + color}>
      <button className="delete" onClick={onClick} />
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Notification
