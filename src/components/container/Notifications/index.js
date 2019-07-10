import { connect } from 'react-redux'
import React from 'react'

import { getNotifications } from '../../../selectors/notifications'
import { removeNotification } from '../../../actions/notifications'
import Notification from '../../presentational/Notification'

let Notifications = ({ notifications, onClick }) => {
  return (
    <div>
      {notifications.map(item => (
        <Notification
          key={item.id}
          text={item.text}
          color={item.color}
          onClick={() => onClick(item.id)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notifications: getNotifications(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: id => dispatch(removeNotification(id))
  }
}

Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)

export default Notifications
