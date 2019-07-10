import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputMedia from '../InputMedia'
import Figure from '../Figure'

class Editable extends Component {
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    const classes = 'box'

    return (
      <div className={this.props.isBox ? classes : ''}>
        <article
          className="media"
          style={{ padding: this.props.isBox ? 0 : '20px 0 20px 0' }}>
          <Figure picture={this.props.picture} />
          <InputMedia
            defaultText={this.props.defaultText}
            isLoading={this.props.isLoading || false}
            onSubmit={this.props.onSubmit}
            maxLength={this.props.maxLength || CONFIG.postMaxLength}
            showCancel={this.props.showCancel}
            onCancel={this.props.onCancel}
          />
        </article>
      </div>
    )
  }
}

Editable.propTypes = {
  maxLength: PropTypes.number,
  defaultText: PropTypes.string,
  isBox: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  showCancel: PropTypes.bool
}

export default Editable
