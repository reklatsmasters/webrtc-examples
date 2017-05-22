import React from 'react'

/**
 * Блок с именем пользователя в общем списке пользователей.
 * @param username
 * @returns {XML}
 * @constructor
 */
export default function User({ username }) {
  return (
    <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-user" />
      </span>
      {username}
    </a>
  )
}
