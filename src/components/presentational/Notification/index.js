import PropTypes from 'prop-types'
import React from 'react'

const Notification = ({ text, color, onClick }) => {
  return (
    <div
      className={'notification has-text-centered ' + color}
      style={{ textTransform: 'capitalize' }}>
      <button className="delete" onClick={onClick} />
      {text}
    </div>
  )
}

Notification.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Notification
