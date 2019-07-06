import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Figure extends Component {
  state = {
    showModel: false
  }

  toggleShowModel = () => {
    this.setState(prevState => {
      return {
        showModel: !prevState.showModel
      }
    })
  }

  model = () => {
    return (
      <div className="modal is-active" onClick={this.toggleShowModel}>
        <div className="modal-background" />
        <div className="modal-content">
          <p className="image is-128x128 container">
            <img src={this.props.picture} alt="" />
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close" />
      </div>
    )
  }

  getImageClasses = () => {
    const size = this.props.size
    const classes = ['image']
    if (size) {
      classes.push(`is-${size}x${size}`)
    } else {
      classes.push('is-64x64')
    }
    return classes.join(' ')
  }

  render() {
    return (
      <Fragment>
        <figure className="media-left">
          <p className={this.getImageClasses()}>
            <img
              src={this.props.picture}
              onClick={this.toggleShowModel}
              alt="user"
            />
          </p>
        </figure>
        {this.state.showModel ? this.model() : null}
      </Fragment>
    )
  }
}

Figure.propTypes = {
  picture: PropTypes.string,
  size: PropTypes.number
}

export default Figure
