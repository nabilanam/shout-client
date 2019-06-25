import React from 'react'
import { connect } from 'react-redux'
import Notification from '../../presentational/Notification'
import { removeNotification } from '../../../actions/notifications'
import { getNotifications } from '../../../selectors/notifications'

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
      {notifications.length ? <hr /> : null}
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
