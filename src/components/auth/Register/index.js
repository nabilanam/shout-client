import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'

import * as authApi from '../../../api/auth'
import * as colors from '../../_constants/bulma-colors'
import * as currentUserSelectors from '../../../selectors/currentUser'
import * as notificationActions from '../../../actions/notifications'
import AuthRedirection from '../AuthRedirection'
import Button from '../../presentational/Button'
import CenteredColumn from '../../presentational/CenteredColumn'
import Hero from '../../presentational/Hero'
import Input from '../../presentational/Input'
import Notifications from '../../container/Notifications'

class Register extends Component {
  state = {
    username: {
      value: '',
      success: '',
      error: ''
    },
    email: {
      value: '',
      success: '',
      error: ''
    },
    password: {
      value: '',
      success: '',
      error: ''
    },
    button: {
      isLoading: false,
      isDisabled: false
    }
  }

  componentDidMount() {
    this.updateInputState('', '')
  }

  validationError = (key, value) => {
    switch (key) {
    case 'username':
      return value.length < CONFIG.nameMinLength ||
          value.length > CONFIG.nameMaxLength
        ? `Username must be ${CONFIG.nameMinLength} to ${
          CONFIG.nameMaxLength
        } characters long`
        : ''
    case 'email': {
      const re = /^(\w+|.)+@\w+.\w+/g
      return re.test(value) ? '' : `Invalid email`
    }
    case 'password':
      return value.length < CONFIG.passwordMinLength ||
          value.length > CONFIG.passwordMaxLength
        ? `Password must be ${CONFIG.passwordMinLength} to ${
          CONFIG.passwordMaxLength
        } characters long`
        : ''
    default:
      return ''
    }
  }

  updateInputState = (key, value) => {
    const error = this.validationError(key, value)
    this.setState(prevState => {
      const keys = ['username', 'password', 'email'].filter(k => k !== key)
      const errorCount =
        keys.reduce((acc, k) => acc + (prevState[k].error === '' ? 0 : 1), 0) +
        (error === '' ? 0 : 1)
      const emptyFieldCount =
        keys.reduce((acc, k) => acc + (prevState[k].value === '' ? 1 : 0), 0) +
        (value === '' ? 1 : 0)
      const isDisabled = !!(errorCount + emptyFieldCount)
      return {
        [key]: {
          value,
          error
        },
        button: {
          isDisabled
        }
      }
    })
  }

  onUsernameChange = e => {
    this.updateInputState('username', e.target.value)
  }

  onEmailChange = e => {
    this.updateInputState('email', e.target.value)
  }

  onPasswordChange = e => {
    this.updateInputState('password', e.target.value)
  }

  toggleIsLoading = () => {
    this.setState(prevState => {
      return {
        button: {
          isLoading: !prevState.button.isLoading
        }
      }
    })
  }

  toggleIsDisabled = () => {
    this.setState(prevState => {
      return {
        button: {
          isDisabled: !prevState.button.isDisabled
        }
      }
    })
  }

  clearInputs = () => {
    this.setState({
      username: {
        value: ''
      },
      email: {
        value: ''
      },
      password: {
        value: ''
      }
    })
  }

  handleSuccess = res => {
    this.props.notifySuccess(res.data.data)
    this.toggleIsLoading()
    this.toggleIsDisabled()
    this.clearInputs()
  }

  handleError = err => {
    const { response } = err
    if (response) {
      const { param, error, status } = response.data

      if (status === 500) {
        return this.props.notifyDanger('Internal server error')
      }

      switch (param) {
      case 'username':
        this.setState({ username: { error } })
        break
      case 'email':
        this.setState({ email: { error } })
        break
      case 'password':
        this.setState({ password: { error } })
        break
      default:
        break
      }
    } else {
      this.props.notifyDanger('Please check your network connection')
    }
    this.toggleIsLoading()
  }

  onSubmit = () => {
    this.toggleIsLoading()

    const username = this.state.username.value
    const email = this.state.email.value
    const password = this.state.password.value

    authApi
      .register({ username, email, password })
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  render() {
    return (
      <Hero>
        <AuthRedirection isProtected={false} hasToken={this.props.hasToken} />
        <CenteredColumn>
          <Notifications />
          <Input
            labelText="Username *"
            type="text"
            leftIcon="fas fa-user"
            placeholder="Type username"
            value={this.state.username.value}
            errorText={this.state.username.error}
            onChange={this.onUsernameChange}
          />
          <Input
            labelText="Email *"
            type="email"
            leftIcon="fas fa-envelope"
            placeholder="Type email"
            value={this.state.email.value}
            errorText={this.state.email.error}
            onChange={this.onEmailChange}
          />
          <Input
            labelText="Password *"
            type="password"
            leftIcon="fas fa-key"
            placeholder="Type password"
            value={this.state.password.value}
            errorText={this.state.password.error}
            onChange={this.onPasswordChange}
          />
          <Button
            text="Sign Up"
            color={colors.isInfo}
            onClick={this.onSubmit}
            isLoading={this.state.button.isLoading}
            isDisabled={this.state.button.isDisabled}
          />
          <hr />
          <NavLink to="/login">Already a member ?</NavLink>
        </CenteredColumn>
      </Hero>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasToken: currentUserSelectors.hasToken(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    notifySuccess: text => dispatch(notificationActions.notifySuccess(text)),
    notifyDanger: text => dispatch(notificationActions.notifyDanger(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
