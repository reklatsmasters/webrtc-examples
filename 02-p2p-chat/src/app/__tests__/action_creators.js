import { signalServerChangeReadyState } from 'app/action_creators'
import * as actionTypes from 'app/action_types'

describe('signalServerChangeReadyState', () => {
  it('online', () => {
    const expectedAction = {
      type: actionTypes.SIGNAL_READYSTATE_CHANGE,
      isOnline: true,
    }

    expect(signalServerChangeReadyState(true)).toEqual(expectedAction)
  })

  it('offline', () => {
    const expectedAction = {
      type: actionTypes.SIGNAL_READYSTATE_CHANGE,
      isOnline: false,
    }

    expect(signalServerChangeReadyState(false)).toEqual(expectedAction)
  })
})
