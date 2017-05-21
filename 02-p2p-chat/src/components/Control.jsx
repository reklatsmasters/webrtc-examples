import React from 'react'
import classNames from 'classnames'

export default function Control({ children, className }) {
  return (
    <p className={classNames('control', className)}>
      {children}
    </p>
  )
}
