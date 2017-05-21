import React from 'react'

export default function Message({ author, message }) {
  let from

  if (author) {
    from = (
      <p className="content is-small">
        <em>{author}</em>&nbsp;says:
      </p>
    )
  }
  return (
    <article className="message is-transparent">
      <div className="message-body">
        {from}
        {message}
      </div>
    </article>
  )
}
