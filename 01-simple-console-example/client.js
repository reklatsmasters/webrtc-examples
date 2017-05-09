/* eslint-env browser */
/* global io */

const socket = io('/')

const pcconfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
}

const peers = window.$peers = new Map()

socket.on('connect', () => {
  console.log('[ws] connected')
})

socket.on('client', ({sender}) => {
  console.log('[ws] client')

  if (peers.has(sender)) {
    return
  }

  const pc = new RTCPeerConnection(pcconfig)
  peers.set(sender, pc)

  pc.addEventListener('icecandidate', ({candidate}) => addIceCandidate(candidate, sender))
  pc.addEventListener('negotiationneeded', () => negotiation(pc, sender))

  const channel = pc.createDataChannel('console')

  channel.addEventListener('open', () => {
    console.log('[dc] channel to %s is ready', sender)

    channel.send(`Hello, ${sender}!`)
  })

  channel.addEventListener('close', () => {
    console.log('[dc] channel to %s is closed', sender)
  })

  channel.addEventListener('message', ({data}) => {
    console.log("<%s>", sender, data.toString())
  })
})

socket.on('offer', async ({sender, offer}) => {
  console.log('[ws] offer')

  if (!peers.has(sender)) {
    const pc = new RTCPeerConnection(pcconfig)

    pc.addEventListener('icecandidate', ({candidate}) => addIceCandidate(candidate, sender))
    peers.set(sender, pc)
  }

  const pc = peers.get(sender)

  try {
    await pc.setRemoteDescription(offer)

    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    socket.emit('answer', {
      to: sender,
      answer
    })
  } catch(e) {
    console.error('[ws] error', e.message)
  }

  pc.addEventListener('datachannel', ({channel}) => {
    channel.addEventListener('open', () => {
      console.log('[dc] channel to %s is ready', sender)

      channel.send(`Hello, ${sender}!`)
    })

    channel.addEventListener('close', () => {
      console.log('[dc] channel to %s is closed', sender)
    })

    channel.addEventListener('message', ({data}) => {
      console.log("<%s>", sender, data.toString())
    })
  })
})

socket.on('answer', async ({sender, answer}) => {
  console.log('[ws] answer')

  if (!peers.has(sender)) {
    return
  }

  const pc = peers.get(sender)

  try {
    await pc.setRemoteDescription(answer)
  } catch(e) {
    console.error('[ws] error', e.message)
  }
})

socket.on('candidate', async ({sender, candidate}) => {
  console.log('[ws] candidate')

  if (!peers.has(sender)) {
    const pc = new RTCPeerConnection(pcconfig)

    pc.on('icecandidate', ({candidate}) => addIceCandidate(candidate, sender))
    peers.set(sender, pc)
  }

  const pc = peers.get(sender)

  try {
    await pc.addIceCandidate(candidate)
  } catch (e) {
    console.error('[ws] error', e.message)
  }
})

socket.on('disconnect', () => {
  console.log('[ws] disconnected')
})

function addIceCandidate(candidate, to) {
  console.log('[pc] icecandidate')

  if (!candidate) {
    return
  }

  socket.emit('candidate', {candidate, to})
}

async function negotiation(pc, to) {
  console.log('[pc] negotiationneeded')

  try {
    const offer = await pc.createOffer()

    await pc.setLocalDescription(offer)
    socket.emit('offer', {to, offer})
  } catch (e) {
    console.error('[pc] error', e.message)
  }
}
