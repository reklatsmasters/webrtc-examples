import EventEmitter from 'events'

/**
 * A wrapper around RTCPeerConnection.
 */
export default class PeerConnection extends EventEmitter {
  constructor(peerConnection) {
    super()
    this.pc = peerConnection
  }

  openDataChannel() {}

  onDataChannel() {}
}
