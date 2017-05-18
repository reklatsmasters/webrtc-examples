import React from 'react'
import Control from 'components/Control'

export default function TextInput() {
  return (
    <Control className="is-expanded">
      <input className="input" type="text" placeholder="Message..." />
    </Control>
  )
}
