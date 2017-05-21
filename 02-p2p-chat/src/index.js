/* global io */

import React from 'react'
import { render } from 'react-dom'
import App from 'components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import SignalClient from 'app/transport/signal-client'
import { signalServerChangeReadyState } from 'app/action_creators'

import 'css/styles.css'

const socket = io('/')
const signalClient = SignalClient(socket)

function reducer(state = {}) {
  return state
}

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(signalClient))
)

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)

signalClient.onOnline(() => {
  store.dispatch(signalServerChangeReadyState(true))
  console.log('[srv] online')
})

signalClient.onOffline(() => {
  store.dispatch(signalServerChangeReadyState(false))
  console.log('[srv] offline')
})
