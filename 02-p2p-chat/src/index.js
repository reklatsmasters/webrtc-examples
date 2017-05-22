/* global io */

import React from 'react'
import { render } from 'react-dom'
import App from 'components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import io from 'socket.io-client'

import SignalClient from 'app/transport/signal-client'
import { signalServerChangeReadyState } from 'app/action_creators'
import reducer from 'app/reducers'

import 'css/styles.css'

const socket = io('/')
const signalClient = new SignalClient(socket)

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
})

signalClient.onOffline(() => {
  store.dispatch(signalServerChangeReadyState(false))
})
