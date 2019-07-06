import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, color, onClick, isLoading, isDisabled }) => (
  <div className="field">
    <div className="control">
      <button
        className={getClasses(color, isLoading)}
        onClick={onClick}
        disabled={isDisabled}>
        {text ? text : 'Submit'}
      </button>
    </div>
  </div>
)

Button.propTypes = {
  color: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
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
