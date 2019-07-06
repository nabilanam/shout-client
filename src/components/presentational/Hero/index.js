import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Hero extends Component {
  componentWillMount() {
    document.body.classList.remove('has-navbar-fixed-top')
  }

  componentWillUnmount() {
    document.body.classList.add('has-navbar-fixed-top')
  }

  render() {
    return (
      <div>
        <section className="hero is-success">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Shout Social Media</h1>
            </div>
          </div>
        </section>

        <div className="section">{this.props.children}</div>
      </div>
    )
  }
}

Hero.propTypes = {
  children: PropTypes.node.isRequired
}

export default Hero
