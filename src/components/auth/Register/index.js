import React, { Component } from 'react'
import { connect } from 'react-redux'
import Hero from '../../presentational/Hero'
import Notifications from '../../container/Notifications'
import CenteredColumn from '../../presentational/CenteredColumn'
import Input from '../../presentational/Input'
import Button from '../../presentational/Button'
import * as colors from '../../_constants/bulma-colors'
import { register } from '../../../api/auth'
import { addNotification } from '../../../actions/notifications'

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

  onUsernameChange = e => {
    this.setState({
      username: {
        value: e.target.value
      }
    })
  }

  onEmailChange = e => {
    this.setState({
      email: {
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
      email: {
        value: ''
      },
      password: {
        value: ''
      }
    })
  }

  handleSuccess = res => {
    this.props.createNotification(res.data.data)
    this.toggleIsLoading()
    this.toggleIsDisabled()
    this.clearInputs()
  }

  handleError = err => {
    const { param, error } = err.response.data
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
    this.toggleIsLoading()
  }

  onSubmit = () => {
    this.toggleIsLoading()

    const username = this.state.username.value
    const email = this.state.email.value
    const password = this.state.password.value

    register({ username, email, password })
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
        </CenteredColumn>
      </Hero>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNotification: text =>
      dispatch(addNotification(text, colors.isSuccess))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
