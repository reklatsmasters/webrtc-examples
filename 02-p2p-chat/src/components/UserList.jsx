import React, { Children } from 'react'
import { connect } from 'react-redux'
import { Level, LevelLeft, LevelRight } from 'components/Level'
import OnlineStatus from 'components/OnlineStatus'

/**
 * Панель со списком пользователей чата.
 * @param children
 * @returns {XML}
 * @constructor
 */
export function UserList({ children, isOnline }) {
  return (
    <div className="panel workspace-body scroll-panel">
      <div className="panel-heading">
        <Level>
          <LevelLeft>Users&nbsp;<OnlineStatus status={isOnline} /></LevelLeft>
          <LevelRight><em>{Children.count(children)}</em></LevelRight>
        </Level>
      </div>
      {children}
    </div>
  )
}

function mapStateToProps(state) {
  const { isOnline } = state.signal

  return {
    isOnline,
  }
}

export default connect(mapStateToProps, null)(UserList)
