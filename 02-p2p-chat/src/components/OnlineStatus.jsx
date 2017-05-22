import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default function OnlineStatus({ status }) {
  const statusText = status ? 'Online' : 'Offline'
  const classes = classNames('tag', 'is-small', {
    'is-success': status,
    'is-danger': !status,
  })
  return <span className={classes}>{statusText}</span>
}

OnlineStatus.propTypes = {
  status: PropTypes.bool,
}
