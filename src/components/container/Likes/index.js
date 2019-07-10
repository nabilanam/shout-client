import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as likeActions from '../../../actions/likes'
import * as likeSelectors from '../../../selectors/likes'
import Button from '../../presentational/Button'

import Like from '../../presentational/Like'

class Likes extends Component {
  state = {
    currentPage: 0
  }

  decrementPage = () => {
    this.setState(
      prevState => {
        return {
          currentPage: prevState.currentPage - 1
        }
      },
      () => {
        this.props.fetchPaginatedLikes(
          this.props.postId,
          this.state.currentPage
        )
      }
    )
  }

  incrementPage = () => {
    this.setState(
      prevState => {
        return {
          currentPage: prevState.currentPage + 1
        }
      },
      () => {
        this.props.fetchPaginatedLikes(
          this.props.postId,
          this.state.currentPage
        )
      }
    )
  }

  componentDidMount() {
    this.incrementPage()
  }

  render() {
    const users = this.props.getLikers(this.props.postId)
    const likeCount = this.props.getLikeCount(this.props.postId)
    const isLoading = this.props.isFetching(this.props.postId)
    const isPrevDisabled = this.state.currentPage === 1
    const isNextDisabled =
      users.length < CONFIG.likePaginationLimit ||
      this.state.currentPage * CONFIG.likePaginationLimit === likeCount

    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Likes</p>
            <button
              className="delete"
              onClick={this.props.onClickClose}
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            {users.map(user => (
              <Like
                key={user._id}
                username={user.username}
                fullname={user.fullname}
                picture={user.picture}
              />
            ))}
          </section>
          <footer
            className="modal-card-foot"
            style={{ justifyContent: 'space-between' }}>
            <Button
              color="is-primary"
              isDisabled={isPrevDisabled}
              onClick={this.decrementPage}
              isLoading={isPrevDisabled ? false : isLoading}
              text="Previous"
            />
            <Button
              color="is-primary"
              isDisabled={isNextDisabled}
              onClick={this.incrementPage}
              isLoading={isNextDisabled ? false : isLoading}
              text="Next"
            />
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: postId => likeSelectors.isFetching(state)(postId),
    getLikers: postId => likeSelectors.getLikers(state)(postId),
    getLikeCount: postId => likeSelectors.getLikeCount(state)(postId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPaginatedLikes: (postId, page) =>
      dispatch(likeActions.fetchPaginatedLikes(postId, page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Likes)

Likes.propTypes = {
  onClickClose: PropTypes.func.isRequired
}
