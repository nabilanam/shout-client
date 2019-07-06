import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'

class InputMedia extends Component {
  state = {
    text: ''
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.text.trim())
    this.setState({ text: '' })
  }

  componentDidMount() {
    if (this.props.defaultText) {
      this.setState({ text: this.props.defaultText })
    }
  }

  render() {
    return (
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              maxLength={this.props.maxLength}
              placeholder="What are you thinking..."
            />
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              {this.props.showCancel ? (
                <ButtonGroup
                  submitText={this.props.submitText}
                  cancelText={this.props.cancelText}
                  isLoading={this.props.isLoading}
                  onSubmit={this.onSubmit}
                  onCancel={this.props.onCancel}
                />
              ) : (
                <Button
                  color="is-info"
                  isLoading={this.props.isLoading}
                  text={this.props.submitText}
                  onClick={this.onSubmit}
                />
              )}
            </div>
          </div>
          <div className="level-right">
            <p className="level-item">
              {this.state.text.length}/{this.props.maxLength}
            </p>
          </div>
        </nav>
      </div>
    )
  }
}

export default InputMedia

InputMedia.propTypes = {
  cancelText: PropTypes.string,
  defaultText: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  maxLength: PropTypes.number.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  submitText: PropTypes.string
}
