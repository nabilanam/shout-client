import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Editable from '../../presentational/Editable'
import Comment from '../../presentational/Comment'
import { connect } from 'react-redux'
import * as commentActions from '../../../actions/comments'
import * as commentSelectors from '../../../selectors/comments'
import * as userSelectors from '../../../selectors/users'
import * as currentUserSelector from '../../../selectors/currentUser'
import Button from '../../presentational/Button'

class Comments extends Component {
  state = {
    page: 1
  }

  fetchNextPage = () => {
    this.props.fetchNextCommments(this.props.postId, this.state.page)
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      }
    })
  }

  componentDidMount() {
    this.fetchNextPage()
  }

  render() {
    return (
      <Fragment>
        <Editable
          maxLength={CONFIG.commentMaxLength}
          picture={this.props.picture}
          isBox={false}
          onSubmit={text => this.props.addComment(this.props.postId, text)}
          isLoading={this.props.isAddingNewComment}
        />
        {this.props.comments
          ? this.props.comments.map(comment => {
            const user = this.props.getUser(comment.user)
            return user ? (
              comment.isEditable ? (
                <Editable
                  key={comment._id}
                  maxLength={CONFIG.commentMaxLength}
                  defaultText={comment.text}
                  picture={this.props.picture}
                  isBox={false}
                  isLoading={this.props.isUpdating(comment._id)}
                  onSubmit={text =>
                    this.props.updateComment(
                      this.props.postId,
                      comment._id,
                      text
                    )
                  }
                  showCancel={true}
                  onCancel={() =>
                    this.props.toggleEdit(this.props.postId, comment._id)
                  }
                />
              ) : (
                <Comment
                  key={comment._id}
                  username={user.username}
                  fullname={user.fullname}
                  profilePicture={user.picture}
                  date={comment.date}
                  time={comment.time}
                  isOwnComment={comment.user === this.props.userId}
                  onClickEdit={() =>
                    this.props.toggleEdit(this.props.postId, comment._id)
                  }
                  onClickDelete={() =>
                    this.props.deleteComment(this.props.postId, comment._id)
                  }>
                  {comment.text}
                </Comment>
              )
            ) : null
          })
          : null}
        {this.props.hasMore ? (
          <Fragment>
            <hr />
            <Button
              text="Load More"
              color="is-primary"
              isLoading={this.props.isFetching}
              onClick={this.fetchNextPage}
            />
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    userId: currentUserSelector.getUserId(state),
    picture: currentUserSelector.getPicture(state),
    getUser: userId => userSelectors.getUser(state)(userId),
    comments: commentSelectors.getComments(state)(props.postId),
    isFetching: commentSelectors.isFetching(state)(props.postId),
    hasMore: commentSelectors.hasMore(state)(props.postId),
    isAddingNewComment: commentSelectors.isAddingNewComment(state)(
      props.postId
    ),
    isUpdating: commentSelectors.isUpdating(state)(props.postId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (postId, text) =>
      dispatch(commentActions.addComment(postId, text)),
    toggleEdit: (postId, commentId) =>
      dispatch(commentActions.toggleEdit(postId, commentId)),
    updateComment: (postId, commentId, text) =>
      dispatch(commentActions.updateComment(postId, commentId, text)),
    deleteComment: (postId, commentId) =>
      dispatch(commentActions.deleteComment(postId, commentId)),
    fetchNextCommments: (postId, page) =>
      dispatch(commentActions.fetchNextComments(postId, page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)

Comments.proptTypes = {
  postId: PropTypes.string.isRequired
}
