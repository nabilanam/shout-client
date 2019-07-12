import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'

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
              <p>{fullname}</p>
              <p>{'@' + username}</p>
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
              {bio}
            </div>
            <label className="label">Quote</label>
            <div className="box" style={{ wordBreak: 'break-all' }}>
              {quote}
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
