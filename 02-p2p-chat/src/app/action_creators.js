import * as actionTypes from 'app/action_types'

/**
 * Уведомляет об изменении состояния сигнального сервера.
 * @param isOnline
 * @returns {{type, isOnline: boolean}}
 */
export function signalServerChangeReadyState(isOnline) {
  return {
    type: actionTypes.SIGNAL_READYSTATE_CHANGE,
    isOnline: !!isOnline,
  }
}
