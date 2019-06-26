import React, { Component } from 'react'
import { connect } from 'react-redux'
import Hero from '../../presentational/Hero'
import Notifications from '../../container/Notifications'
import CenteredColumn from '../../presentational/CenteredColumn'
import Input from '../../presentational/Input'
import Button from '../../presentational/Button'
import * as colors from '../../_constants/bulma-colors'
import { login } from '../../../api/auth'
import { addToken } from '../../../actions/currentUser'
import { addNotification } from '../../../actions/notifications'

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

  onUsernameChange = e => {
    this.setState({
      username: {
        value: e.target.value
      }
    })
  }

  onPasswordChange = e => {
    this.setState({
      password: {
        value: e.target.value
      }
    })
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

  handleSuccess = res => {
    this.props.addToken(res.data.data)
    this.props.createNotification('Welcome!', colors.isSuccess)
    this.toggleIsLoading()
    this.toggleIsDisabled()
    this.clearInputs()
  }

  handleErrorCodes = ({ status, param, error }) => {
    if (status === 400) {
      switch (param) {
      case 'username':
        this.setState({ username: { error } })
        break
      case 'password':
        this.setState({ password: { error } })
        break
      default:
        this.props.createNotification(
          'Invalid Credential. Please try again!',
          colors.isDanger
        )
        this.clearInputs()
        break
      }
    } else {
      this.props.createNotification(error, colors.isDanger)
    }
  }

  handleError = err => {
    const { response } = err
    if (response) {
      this.handleErrorCodes(response)
    } else {
      this.props.createNotification(
        'Please check your network connection!',
        colors.isDanger
      )
    }
    this.toggleIsLoading()
  }

  onSubmit = () => {
    this.toggleIsLoading()

    const username = this.state.username.value
    const password = this.state.password.value

    login({ username, password })
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  onTabRegisterClick = () => {}
  onTabLoginClick = () => {}

  render() {
    return (
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
            color={colors.isInfo}
            onClick={this.onSubmit}
            isLoading={this.state.button.isLoading}
            isDisabled={this.state.button.isDisabled}
          />
        </CenteredColumn>
      </Hero>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToken: token => dispatch(addToken(token)),
    createNotification: (text, color) => dispatch(addNotification(text, color))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
