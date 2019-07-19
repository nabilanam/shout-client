import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

import { notifyDanger } from '../../../actions/notifications'
import * as currentUserActions from '../../../actions/currentUser'
import * as currentUserSelectors from '../../../selectors/currentUser'
import AuthRedirection from '../AuthRedirection'
import Button from '../../presentational/Button'
import CenteredColumn from '../../presentational/CenteredColumn'
import Hero from '../../presentational/Hero'
import Input from '../../presentational/Input'
import Notifications from '../../container/Notifications'

class Login extends Component {
  state = {
    username: {
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
      const keys = ['username', 'password'].filter(k => k !== key)
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
      password: {
        value: ''
      }
    })
  }

  handleValidationError = (param, error) => {
    switch (param) {
    case 'username':
      this.setState({ username: { error } })
      break
    case 'password':
      this.setState({ password: { error } })
      break
    default:
      this.props.notifyDanger('Invalid Credential. Please try again!')
      this.clearInputs()
      break
    }
  }

  handleError = err => {
    const { response } = err
    if (!response) {
      this.props.notifyDanger('Please check your network connection!')
    } else {
      const { status, param, error } = response.data
      if (status === 400) {
        this.handleValidationError(param, error)
      } else if (status === 401) {
        this.props.notifyDanger(error)
      } else {
        this.props.notifyDanger('User does not exist')
      }
    }
    this.toggleIsLoading()
  }

  onSubmit = () => {
    this.toggleIsLoading()

    this.props
      .login(this.state.username.value, this.state.password.value)
      .catch(this.handleError)
  }

  render() {
    return (
      <Fragment>
        <AuthRedirection isProtected={false} hasToken={this.props.hasToken} />
        <Hero>
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
              labelText="Password *"
              type="password"
              leftIcon="fas fa-key"
              placeholder="Type password"
              value={this.state.password.value}
              errorText={this.state.password.error}
              onChange={this.onPasswordChange}
            />
            <Button
              text="Log In"
              color={'is-primary'}
              onClick={this.onSubmit}
              isLoading={this.state.button.isLoading}
              isDisabled={this.state.button.isDisabled}
            />
            <hr />
            <NavLink to="/register">Not a member ?</NavLink>
          </CenteredColumn>
        </Hero>
      </Fragment>
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
    login: (username, password) =>
      dispatch(currentUserActions.login(username, password)),
    notifyDanger: text => dispatch(notifyDanger(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
