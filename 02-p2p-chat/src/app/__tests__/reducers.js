import reducers, { signalReducer } from 'app/reducers'
import * as actionTypes from 'app/action_types'

describe('signalReducer', () => {
  it('init state', () => {
    const initState = signalReducer(void 0, {})
    const expectedState = {
      isOnline: false,
    }

    expect(initState).toEqual(expectedState)
  })

  it('default state', () => {
    const state = signalReducer({ x: 1 }, {})
    const expectedState = {
      x: 1,
    }

    expect(state).toEqual(expectedState)
  })

  it('handle signal server online', () => {
    const state = signalReducer(
      {},
      {
        type: actionTypes.SIGNAL_READYSTATE_CHANGE,
        isOnline: true,
      }
    )

    const expectedState = {
      isOnline: true,
    }

    expect(state).toEqual(expectedState)
  })

  it('handle signal server offline', () => {
    const state = signalReducer(
      {},
      {
        type: actionTypes.SIGNAL_READYSTATE_CHANGE,
        isOnline: false,
      }
    )

    const expectedState = {
      isOnline: false,
    }

    expect(state).toEqual(expectedState)
  })
})

test('combine', () => {
  const state = reducers({}, {})

  expect(Object.keys(state)).toEqual(['signal'])
})
