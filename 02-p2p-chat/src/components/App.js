import React from 'react'
import { connect } from 'react-redux'

import FileControl from 'components/FileControl'
import TextInput from 'components/TextInput'
import SendButton from 'components/SendButton'
import User from 'components/User'
import UserList from 'components/UserList'
import MessageList from 'components/MessageList'
import Message from 'components/Message'

export function App() {
  return (
    <div className="column is-8-widescreen is-offset-2-widescreen">
      <div className="columns is-mobile">
        <div className="column is-9-desktop">
          <MessageList username="dtsvet">
            <Message author="john12" message="Hello, React Developers!" />
          </MessageList>
        </div>
        <div className="column is-3 is-hidden-touch">
          <UserList>
            <User username="John Smith" />
            <User username="John Doe" />
          </UserList>
        </div>
      </div>
      <div className="field has-addons">
        <FileControl />
        <TextInput />
        <SendButton />
      </div>
    </div>
  )
}

export default connect(null, null)(App)
