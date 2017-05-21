import { combineReducers } from 'redux'
import * as actionTypes from 'app/action_types'

const defaultSignalState = {
  isOnline: false,
}

/**
 * Обрабатывает состояние сигнального сервера.
 * @param state
 * @param action
 * @returns {{}}
 */
export function signalReducer(state = defaultSignalState, action) {
  switch (action.type) {
    case actionTypes.SIGNAL_READYSTATE_CHANGE:
      return {
        isOnline: action.isOnline,
      }
    default:
      break
  }
  return state
}

export default combineReducers({
  signal: signalReducer,
})
