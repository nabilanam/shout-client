import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const CommentActions = ({ isOwnComment, onClickEdit, onClickDelete }) => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        {isOwnComment ? (
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
    </nav>
  )
}

CommentActions.propTypes = {
  isOwnComment: PropTypes.bool.isRequired,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func
}

export default CommentActions
