import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import * as userActions from '../../../actions/users'
import * as userSelectors from '../../../selectors/users'
import Page from '../Page'

class Profile extends Component {
  state = {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    reddit: 'https://reddit.com/user'
  }

  render() {
    if (!this.props.user) {
      return <p>Waiting for data..</p>
    }
    const { picture, username, fullname, bio, quote, social } = this.props.user
    return (
      <Page>
        <div className="tile is-ancestor">
          <div className="tile is-3 is-vertical is-parent">
            <div className="tile is-child">
              <p className="image is-128x128">
                <img src={picture} alt="user" style={{ maxHeight: 128 }} />
              </p>
              <br />
              <p style={{ textTransform: 'capitalize' }}>{fullname}</p>
              <p>{'@' + username}</p>
              <NavLink to={`/feed/${username}`}>View posts</NavLink>
              <br />
              {social ? (
                <Fragment>
                  {Object.keys(social)
                    .filter(key => social[key] !== '')
                    .map(key => (
                      <a
                        key={key}
                        className="icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${this.state[key]}/${social[key]}`}>
                        <i className={'fab fa-' + key} />
                      </a>
                    ))}
                </Fragment>
              ) : null}
            </div>
          </div>
          <div className="tile is-vertical ">
            <br />
            <label className="label">Bio</label>
            <div className="box" style={{ wordBreak: 'break-all' }}>
              {bio
                ? bio
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id laoreet magna. Cras varius dui augue, a interdum orci suscipit et. Vivamus ante metus, scelerisque vitae arcu ac, scelerisque ullamcorper neque. Suspendisse et ligula vitae libero blandit aliquet. In ut nisl a dolor suscipit pharetra sed non elit.'}
            </div>
            <label className="label">Quote</label>
            <div className="box" style={{ wordBreak: 'break-all' }}>
              {quote
                ? quote
                : 'Curabitur auctor aliquam neque scelerisque pharetra. Nullam ut eros ac leo rutrum efficitur vel et ligula. Aliquam aliquam pellentesque erat faucibus eleifend.'}
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = (state, props) => {
  const username = props.location.pathname.split('/')[2]
  return {
    user: userSelectors.getUserByUsername(state)(username)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const username = props.location.pathname.split('/')[2]
  dispatch(userActions.fetchUserProfile(username))
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
