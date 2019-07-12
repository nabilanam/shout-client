import { connect } from 'react-redux'
import React, { Component } from 'react'

import * as currentUserActions from '../../../actions/currentUser'
import * as currentUserSelectors from '../../../selectors/currentUser'
import Button from '../../presentational/Button'
import Input from '../../presentational/Input'
import Page from '../Page'

class Update extends Component {
  state = {
    picture: null,
    username: '',
    firstname: '',
    lastname: '',
    bio: '',
    quote: '',
    social: {},
    error_username: '',
    error_firstname: '',
    error_lastname: ''
  }

  componentDidMount() {
    const { username, firstname, lastname, bio, quote, social } = this.props
    this.setState({
      username: username || '',
      firstname: firstname || '',
      lastname: lastname || '',
      bio: bio || '',
      quote: quote || '',
      social: {
        facebook: social ? social.facebook || '' : '',
        twitter: social ? social.twitter || '' : '',
        youtube: social ? social.youtube || '' : '',
        instagram: social ? social.instagram || '' : '',
        reddit: social ? social.reddit || '' : ''
      }
    })
  }

  fileInput = () => {
    return (
      <div className="file has-name is-boxed">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="profile-picture"
            onChange={e =>
              this.setState({
                filename: e.target.files.length ? e.target.files[0].name : '',
                picture: e.target.files.length ? e.target.files[0] : null
              })
            }
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload" />
            </span>
            <span className="file-label">Choose profile picture</span>
          </span>
          <span className="file-name has-text-centered">
            {this.state.filename ? this.state.filename : 'No picture selected'}
          </span>
        </label>
      </div>
    )
  }

  textArea = ({ value, onChange, maxLength, labelText, placeholder }) => {
    return (
      <div className="field">
        <label className="label">{labelText}</label>
        <div className="control">
          <textarea
            className="textarea is-primary"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
          />
        </div>
        <div className="level">
          <div className="level-left" />
          <div className="level-right">
            <span className="level-item">
              {value ? `${value.length}/${maxLength}` : null}
            </span>
          </div>
        </div>
      </div>
    )
  }

  onChangeSocial = (key, value) => {
    this.setState(prevState => {
      return {
        social: { ...prevState.social, [key]: value.trim() }
      }
    })
  }

  getFormData = () => {
    const data = new FormData()
    if (this.state.picture) {
      data.append('picture', this.state.picture)
    }
    if (
      this.state.username.length >= CONFIG.nameMinLength &&
      this.state.username.length <= CONFIG.nameMaxLength
    ) {
      data.append('username', this.state.username)
    }
    if (
      this.state.firstname.length >= CONFIG.nameMinLength &&
      this.state.firstname.length <= CONFIG.nameMaxLength
    ) {
      data.append('firstname', this.state.firstname)
    }
    if (
      this.state.lastname.length >= CONFIG.nameMinLength &&
      this.state.lastname.length <= CONFIG.nameMaxLength
    ) {
      data.append('lastname', this.state.lastname)
    }
    data.append('bio', this.state.bio)
    data.append('quote', this.state.quote)
    data.append('social', JSON.stringify(this.state.social))
    return data
  }

  onClickUpdate = () => {
    this.props.updateUser(this.getFormData(), !!this.state.picture)
  }

  onChangeUsername = e => {
    const username = e.target.value.trim()
    let error_username = ''
    if (
      username.length < CONFIG.nameMinLength ||
      username.length > CONFIG.nameMaxLength
    ) {
      error_username = `Username must be between ${CONFIG.nameMinLength} to 
      ${
        CONFIG.nameMaxLength
      } characters, else value will be discarded when submitted.`
    }
    this.setState({ username, error_username })
  }

  onChangeFirstname = e => {
    const firstname = e.target.value.trim()
    let error_firstname = ''
    if (
      firstname.length < CONFIG.nameMinLength ||
      firstname.length > CONFIG.nameMaxLength
    ) {
      error_firstname = `First name must be between ${CONFIG.nameMinLength} to 
      ${
        CONFIG.nameMaxLength
      } characters, else value will be discarded when submitted.`
    }
    this.setState({ firstname, error_firstname })
  }

  onChangeLastname = e => {
    const lastname = e.target.value.trim()
    let error_lastname = ''
    if (
      lastname.length < CONFIG.nameMinLength ||
      lastname.length > CONFIG.nameMaxLength
    ) {
      error_lastname = `Last name must be between ${CONFIG.nameMinLength} to 
      ${
        CONFIG.nameMaxLength
      } characters, else value will be discarded when submitted.`
    }
    this.setState({ lastname, error_lastname })
  }

  render() {
    return (
      <Page>
        <this.fileInput />
        <br />
        <Input
          type="text"
          labelText="Username"
          placeholder="Type username"
          value={this.state.username}
          maxLength={CONFIG.nameMaxLength}
          onChange={this.onChangeUsername}
          errorText={this.state.error_username}
        />
        <Input
          type="text"
          labelText="First Name"
          placeholder="Type first name"
          value={this.state.firstname}
          maxLength={CONFIG.nameMaxLength}
          onChange={this.onChangeFirstname}
          errorText={this.state.error_firstname}
        />
        <Input
          type="text"
          labelText="Last Name"
          placeholder="Type last name"
          value={this.state.lastname}
          maxLength={CONFIG.nameMaxLength}
          onChange={this.onChangeLastname}
          errorText={this.state.error_lastname}
        />
        <this.textArea
          labelText="Bio"
          value={this.state.bio}
          placeholder="Add bio"
          onChange={e =>
            this.setState({ bio: e.target.value.replace(/\s\s+/g, ' ') })
          }
          maxLength={CONFIG.bioMaxLength}
        />
        <this.textArea
          labelText="Quote"
          value={this.state.quote}
          placeholder="Add quote"
          maxLength={CONFIG.quoteMaxLength}
          onChange={e =>
            this.setState({ quote: e.target.value.replace(/\s\s+/g, ' ') })
          }
        />
        {Object.keys(this.state.social).map(key => {
          return (
            <Input
              key={key}
              type="text"
              placeholder={this.state.username}
              leftIcon={`fab fa-${key}`}
              labelText={`${key} username`}
              value={this.state.social[key]}
              maxLength={CONFIG.socialMaxLength}
              onChange={e => this.onChangeSocial(key, e.target.value)}
            />
          )
        })}
        <Button
          text="Update"
          color="is-primary"
          isLoading={this.props.isUpdating}
          onClick={this.onClickUpdate}
        />
      </Page>
    )
  }
}

const mapStateToProps = state => {
  const {
    username,
    firstname,
    lastname,
    bio,
    quote,
    social
  } = currentUserSelectors.currentUser(state)
  return {
    username,
    firstname,
    lastname,
    bio,
    quote,
    social,
    isUpdating: currentUserSelectors.isUpdating(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (formData, shouldFetchPicture) =>
      dispatch(currentUserActions.updateUser(formData, shouldFetchPicture))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update)
