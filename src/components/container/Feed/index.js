import { connect } from 'react-redux'
import React, { Component } from 'react'

import * as currentUserSelector from '../../../selectors/currentUser'
import * as postActions from '../../../actions/posts'
import * as postsSelector from '../../../selectors/posts'
import Editable from '../../presentational/Editable'
import Page from '../Page'
import Posts from '../Posts'

class Feed extends Component {
  render() {
    const parts = this.props.location.pathname.split('/')
    return (
      <Page>
        <Editable
          isBox={true}
          picture={this.props.picture}
          onSubmit={this.props.addPost}
          isLoading={this.props.isFetchingOnePost}
        />
        {parts.length === 3 ? (
          <Posts type={parts[2]} currentUserId={this.props.userId} />
        ) : null}
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    picture: currentUserSelector.getPicture(state),
    userId: currentUserSelector.getUserId(state),
    isFetchingOnePost: postsSelector.isFetchingOnePost(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: text => dispatch(postActions.addPost(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
