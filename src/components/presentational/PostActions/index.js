import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const PostActions = ({
  isLiked,
  isOwnPost,
  likeCount,
  commentCount,
  onClickLike,
  onClickEdit,
  onClickDelete,
  onClickLikeCount,
  onClickCommentCount
}) => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <a className="level-item" onClick={onClickLike}>
          <span className="icon is-small">
            <i className={getLikeClasses(isLiked)} />
          </span>
        </a>
        {isOwnPost ? (
          <Fragment>
            <a className="level-item" onClick={onClickEdit}>
              <span className="icon is-small">
                <i className="far fa-edit" />
              </span>
            </a>
            <a className="level-item" onClick={onClickDelete}>
              <span className="icon is-small">
                <i className="far fa-trash-alt" />
              </span>
            </a>
          </Fragment>
        ) : null}
      </div>
      <div className="level-right">
        {showLikeCount(likeCount, onClickLikeCount)}
        {showCommentCount(commentCount, onClickCommentCount)}
      </div>
    </nav>
  )
}

PostActions.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  isOwnPost: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickLikeCount: PropTypes.func.isRequired,
  onClickCommentCount: PropTypes.func.isRequired
}

export default PostActions

const getLikeClasses = isLiked => {
  const classes = ['fa-thumbs-up']
  if (isLiked) {
    classes.unshift('fas')
  } else {
    classes.unshift('far')
  }
  return classes.join(' ')
}

const showLikeCount = (count, onClick) => {
  return count > 0 ? (
    <a className="level-item" onClick={onClick}>
      {count} Likes
    </a>
  ) : (
    <span className="level-item">0 Likes</span>
  )
}

const showCommentCount = (count, onClick) => {
  return count > 0 ? (
    <a className="level-item" onClick={onClick}>
      {count} Comments
    </a>
  ) : (
    <span className="level-item">0 Comments</span>
  )
}
