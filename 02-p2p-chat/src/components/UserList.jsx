import React, { Children } from 'react'
import { Level, LevelLeft, LevelRight } from 'components/Level'

export default function UserList({ children }) {
  return (
    <div className="panel workspace-body scroll-panel">
      <div className="panel-heading">
        <Level>
          <LevelLeft>Users</LevelLeft>
          <LevelRight><em>{Children.count(children)}</em></LevelRight>
        </Level>
      </div>
      {children}
    </div>
  )
}
