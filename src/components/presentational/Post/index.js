import React, { Component } from 'react'

import Comments from '../../container/Comments'
import Figure from '../Figure'
import Likes from '../../container/Likes'
import PostActions from '../PostActions'
import UserInfo from '../UserInfo'

class Post extends Component {
  state = {
    showLikes: false,
    showComments: true
  }

  toggleLikes = () => {
    this.setState(prevState => {
      return {
        showLikes: !prevState.showLikes
      }
    })
  }

  toggleComments = () => {
    this.setState(prevState => {
      return {
        showComments: !prevState.showComments
      }
    })
  }

  render() {
    return (
      <div className="box">
        <article className="media">
          <Figure picture={this.props.profilePicture} />
          <div className="media-content">
            <div className="content">
              <p style={{ wordBreak: 'break-all' }}>
                <UserInfo
                  username={this.props.username}
                  fullname={this.props.fullname}
                  date={this.props.date}
                  time={this.props.time}
                  postUrl={'/feed/' + this.props.id}
                />
                <br />
                {this.props.children}
              </p>
            </div>
            <PostActions
              isLiked={this.props.isLiked}
              likeCount={this.props.likeCount}
              commentCount={this.props.commentCount}
              onClickLike={this.props.onClickLike}
              onClickDelete={this.props.onClickDelete}
              onClickComment={this.props.onClickComment}
              onClickLikeCount={this.toggleLikes}
              onClickCommentCount={this.toggleComments}
              onClickEdit={this.props.onClickEdit}
              isOwnPost={this.props.isOwnPost}
            />
            {this.state.showLikes ? (
              <Likes postId={this.props.id} onClickClose={this.toggleLikes} />
            ) : null}
            {this.state.showComments ? (
              <Comments postId={this.props.id} />
            ) : null}
          </div>
        </article>
      </div>
    )
  }
}

export default Post
