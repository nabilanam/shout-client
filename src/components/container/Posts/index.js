import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { isTokenSaved } from '../../../localstorage'
import * as postActions from '../../../actions/posts'
import * as userSelector from '../../../selectors/users'
import * as currentUserSelector from '../../../selectors/currentUser'
import * as postSelector from '../../../selectors/posts'
import * as likeActions from '../../../actions/likes'
import * as likeSelectors from '../../../selectors/likes'
import Post from '../../presentational/Post'
import Editable from '../../presentational/Editable'

class Posts extends Component {
  state = {
    page: 1
  }

  prepareNextPage = () => {
    this.props.fetchNextPage(this.state.page)
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      }
    })
  }

  getScrollPercantage = () =>
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight)

  onscroll = debounce(() => {
    if (
      this.props.hasMore &&
      this.getScrollPercantage() > CONFIG.scrollPercentage
    ) {
      this.prepareNextPage()
    }
  }, 1000)

  setWindowScroll = () => {
    window.addEventListener('scroll', this.onscroll)
  }

  unsetWindowScroll = () => {
    window.removeEventListener('scroll', this.onscroll)
  }

  componentDidMount() {
    if (isTokenSaved()) {
      this.prepareNextPage()
      this.setWindowScroll()
    } else {
      setTimeout(() => {
        this.prepareNextPage()
        this.setWindowScroll()
      }, 1000)
    }
    document.documentElement.scrollTop = 0
  }

  componentWillUnmount() {
    this.unsetWindowScroll()
  }

  render() {
    const {
      posts,
      getUser,
      hasMore,
      isFetchingManyPosts,
      currentUserId,
      isPostLiked,
      getLikeCount
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        {posts.map(post => {
          const user = getUser(post.user)
          const isLiked = isPostLiked(post._id)
          const likeCount = getLikeCount(post._id)
          return post.isEditable ? (
            <Editable
              key={post._id}
              picture={user.picture}
              defaultText={post.text}
              isLoading={post.isUpdating}
              showCancel={true}
              onSubmit={text => this.props.updatePost(post._id, text)}
              onCancel={() => this.props.toggleEdit(post._id)}
            />
          ) : (
            <Post
              key={post._id}
              id={post._id}
              userId={user._id}
              username={user.username}
              fullname={user.fullname}
              profilePicture={user.picture}
              date={post.date}
              time={post.time}
              isLiked={isLiked}
              likeCount={likeCount}
              commentCount={post.comments}
              isOwnPost={currentUserId === user._id}
              onClickEdit={() => this.props.toggleEdit(post._id)}
              onClickLike={() => this.props.onClickLike(post._id)}
              onClickDelete={() => this.props.onClickDelete(post._id)}>
              {post.text}
            </Post>
          )
        })}
        {hasMore ? (
          isFetchingManyPosts ? (
            <p className="has-text-centered">Fetching more posts...</p>
          ) : null
        ) : (
          <p className="has-text-centered">You've read all posts!</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const posts =
    props.type === 'all'
      ? postSelector.getAllPosts(state)
      : postSelector.getAllPostsByUsername(state)(props.type)
  return {
    posts,
    hasMore: postSelector.hasMorePosts(state),
    isFetchingManyPosts: postSelector.isFetchingManyPosts(state),
    currentUserId: currentUserSelector.getUserId(state),
    getUser: userId => userSelector.getUser(state)(userId),
    isPostLiked: postId => likeSelectors.isPostLiked(state)(postId),
    getLikeCount: postId => likeSelectors.getLikeCount(state)(postId)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const fetchNextPage =
    props.type === 'all'
      ? page => dispatch(postActions.fetchNextPageAll(page))
      : page => dispatch(postActions.fetchNextPageUser(props.type, page))
  if (props.type === 'all') {
    dispatch(postActions.clearPosts())
  }
  return {
    fetchNextPage,
    onClickLike: postId => dispatch(likeActions.likePost(postId)),
    onClickDelete: postId => dispatch(postActions.deletePost(postId)),
    toggleEdit: postId => dispatch(postActions.toggleEdit(postId)),
    updatePost: (postId, text) => dispatch(postActions.updatePost(postId, text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
