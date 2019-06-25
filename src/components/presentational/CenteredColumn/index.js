import React from 'react'
import PropTypes from 'prop-types'

const CenteredColumn = ({ children, size = 4 }) => {
  return (
    <div className="columns is-centered">
      <div className={'column is-' + size}>{children}</div>
    </div>
  )
}

CenteredColumn.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number
}

export default CenteredColumn
