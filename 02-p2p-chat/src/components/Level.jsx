import React from 'react'

export function Level({ children }) {
  return (
    <div className="level">
      {children}
    </div>
  )
}

export function LevelLeft({ children }) {
  return (
    <div className="level-left">
      <div className="level-item">
        {children}
      </div>
    </div>
  )
}

export function LevelRight({ children }) {
  return (
    <div className="level-right">
      <div className="level-item">
        {children}
      </div>
    </div>
  )
}
