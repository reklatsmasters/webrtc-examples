import React from 'react'
import Control from 'components/Control'

export default function FileControl() {
  return (
    <Control>
      <label className="button">
        <span>Send file...</span>
        <input type="file" hidden />
      </label>
    </Control>
  )
}
