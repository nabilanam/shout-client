import React from 'react'

import Figure from '../Figure'
import UserInfo from '../UserInfo'
import CommentActions from '../CommentActions'

const Comment = ({
  username,
  fullname,
  date,
  time,
  profilePicture,
  children,
  isOwnComment,
  onClickEdit,
  onClickDelete
}) => {
  return (
    <article className="media">
      <Figure picture={profilePicture} />
      <div className="media-content">
        <div className="content">
          <p style={{ wordBreak: 'break-all' }}>
            <UserInfo
              username={username}
              fullname={fullname}
              date={date}
              time={time}
            />
            <br />
            {children}
          </p>
        </div>
        <CommentActions
          isOwnComment={isOwnComment}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </div>
    </article>
  )
}

export default Comment
