import React from 'react'
import PropTypes from 'prop-types'
import { isPrimary, isSuccess, isDanger } from '../../_constants/bulma-colors'

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  labelText,
  leftIcon,
  successText,
  errorText
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
        />
        {showLeftIcon(leftIcon)}
      </div>
      {showHelpText(successText, errorText)}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  labelText: PropTypes.string,
  leftIcon: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string
}

export default Input

const getInputClasses = (successText, errorText) => {
  const inputClasses = ['input']

  if (successText) {
    inputClasses.push(isSuccess)
  } else if (errorText) {
    inputClasses.push(isDanger)
  } else {
    inputClasses.push(isPrimary)
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
  return labelText ? <label className="label">{labelText}</label> : null
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
    helpClasses.push(isSuccess)
  } else if (errorText) {
    helpClasses.push(isDanger)
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
