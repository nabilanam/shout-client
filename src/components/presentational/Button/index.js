import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, color, onClick, isLoading, isDisabled }) => (
  <div className="field">
    <div className="control">
      <button
        className={getClasses(color, isLoading)}
        onClick={onClick}
        disabled={isDisabled}>
        {text}
      </button>
    </div>
  </div>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default Button

const getClasses = (color, isLoading) => {
  const classes = ['button']
  if (color) {
    classes.push(color)
  }
  if (isLoading) {
    classes.push('is-loading')
  }
  return classes.join(' ')
}
