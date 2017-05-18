import React, { Children } from 'react'
import {Level, LevelLeft, LevelRight} from 'components/Level'
import Message from 'components/Message'

export default function MessageList({children, username}) {
  const placeholder = <Message message='History is empty...'/>
  const history = Children.count(children) ? children : placeholder

  return (
    <div className="panel workspace-body scroll-panel">
      <div className="panel-heading">
        <Level>
          <LevelLeft>History</LevelLeft>
          <LevelRight>Logged in as&nbsp;<em>{username}</em></LevelRight>
        </Level>
      </div>
      {Children.map(history, (child) => (
        <div className="panel-block panel-control">
          {child}
        </div>
      ))}
    </div>
  )
}
