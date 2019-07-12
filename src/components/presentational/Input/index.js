import PropTypes from 'prop-types'
import React from 'react'

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  labelText,
  leftIcon,
  successText,
  errorText,
  maxLength
}) => {
  return (
    <div className="field">
      {showLabel(labelText)}
      <div className={getControlClasses(leftIcon)}>
        <input
          className={getInputClasses(successText, errorText)}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          maxLength={maxLength}
        />
        {showLeftIcon(leftIcon)}
      </div>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {showHelpText(successText, errorText)}
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {value && maxLength ? `${value.length}/${maxLength}` : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input

Input.propTypes = {
  errorText: PropTypes.string,
  labelText: PropTypes.string,
  leftIcon: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  successText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string
}

const getInputClasses = (successText, errorText) => {
  const inputClasses = ['input']

  if (successText) {
    inputClasses.push('is-success')
  } else if (errorText) {
    inputClasses.push('is-danger')
  } else {
    inputClasses.push('is-primary')
  }

  return inputClasses.join(' ')
}

const getControlClasses = leftIcon => {
  const controlClasses = ['control']

  if (leftIcon) {
    controlClasses.push('has-icons-left')
  }

  return controlClasses.join(' ')
}

const showLabel = labelText => {
  return labelText ? (
    <label className="label" style={{ textTransform: 'capitalize' }}>
      {labelText}
    </label>
  ) : null
}

const showLeftIcon = icon => {
  return icon ? (
    <span className="icon is-small is-left">
      <i className={icon} />
    </span>
  ) : null
}

const getHelpClasses = (successText, errorText) => {
  const helpClasses = ['help']

  if (successText) {
    helpClasses.push('is-success')
  } else if (errorText) {
    helpClasses.push('is-danger')
  }

  return helpClasses.join(' ')
}

const showHelpText = (successText, errorText) => {
  const classes = getHelpClasses(successText, errorText)
  return successText ? (
    <p className={classes}>{successText}</p>
  ) : errorText ? (
    <p className={classes}>{errorText}</p>
  ) : null
}
