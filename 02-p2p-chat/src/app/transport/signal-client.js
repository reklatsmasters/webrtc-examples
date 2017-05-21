/**
 * A client for signal server.
 */
export default class SignalClient {
  constructor(socketClient) {
    this.socketClient = socketClient
  }

  sendOffer(request) {
    this.socketClient.emit('offer', request)
  }

  sendAnswer(request) {
    this.socketClient.emit('answer', request)
  }

  sendIceCandidate(request) {
    this.socketClient.emit('answer', request)
  }

  onOnline(cb) {
    this.socketClient.on('connect', cb)
  }

  onOffline(cb) {
    this.socketClient.on('disconnect', cb)
  }

  onOffer(cb) {
    this.socketClient.on('offer', cb)
  }

  onAnswer(cb) {
    this.socketClient.on('answer', cb)
  }

  onIceCandidate(cb) {
    this.socketClient.on('candidate', cb)
  }

  onClientList(cb) {
    this.socketClient.on('client_list', cb)
  }
}
