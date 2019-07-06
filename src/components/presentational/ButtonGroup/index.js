import React from 'react'
import PropTypes from 'prop-types'

const ButtonGroup = ({
  submitText,
  isLoading,
  cancelText,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <button
          onClick={onSubmit}
          className={'button is-primary' + (isLoading ? ' is-loading' : '')}>
          {submitText ? submitText : 'Submit'}
        </button>
      </p>
      <p className="control">
        <button
          onClick={onCancel}
          className="button is-danger"
          disabled={isLoading}>
          {cancelText ? cancelText : 'Cancel'}
        </button>
      </p>
    </div>
  )
}

ButtonGroup.propTypes = {
  cancelText: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string
}

export default ButtonGroup
