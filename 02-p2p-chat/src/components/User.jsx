import React from 'react'

export default function User({username}) {
  return (
    <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-user" />
      </span>
      {username}
    </a>
  )
}
