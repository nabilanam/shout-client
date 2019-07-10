import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import logo from '../../../assets/logo.png'

class Header extends Component {
  state = {
    showDropdown: false
  }

  toggleBurgerClick = () => {
    this.setState(prevState => {
      return {
        showDropdown: !prevState.showDropdown
      }
    })
  }

  render() {
    return (
      <nav
        className="navbar is-fixed-top is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <a
            onClick={this.toggleBurgerClick}
            role="button"
            className={
              'navbar-burger' + (this.state.showDropdown ? ' is-active' : '')
            }
            data-target="my-navbar"
            aria-label="menu"
            aria-expanded="false">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="my-navbar"
          className={
            'navbar-menu' + (this.state.showDropdown ? ' is-active' : '')
          }>
          <div className="navbar-end">
            <NavLink
              to="/feed/all"
              onClick={this.toggleBurgerClick}
              className="navbar-item has-text-centered">
              Home
            </NavLink>
            <NavLink
              to={'/feed/' + this.props.username}
              onClick={this.toggleBurgerClick}
              className="navbar-item has-text-centered">
              My Posts
            </NavLink>
            <NavLink
              to="/profile"
              onClick={this.toggleBurgerClick}
              className="navbar-item has-text-centered">
              Profile
            </NavLink>
            <NavLink
              to="/profile/update"
              onClick={this.toggleBurgerClick}
              className="navbar-item has-text-centered">
              Update
            </NavLink>
            <div className="navbar-item has-text-centered">
              <NavLink
                to="/logout"
                onClick={this.toggleBurgerClick}
                className="button is-danger is-outlined">
                Log out
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired
}

export default Header
