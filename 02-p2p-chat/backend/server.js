/* eslint-disable no-console */
const server = require('http').createServer()
const io = require('socket.io')(server)

server.listen(7000, '0.0.0.0', () => {
  console.log('[http] server started')
})

io.sockets.on('connection', client => {
  console.log('new connection from', client.conn.remoteAddress)

  client.broadcast.emit('client', {
    sender: client.id,
  })

  client.on('offer', ({ to, offer }) => {
    console.log('offer from', client.conn.remoteAddress)

    client.to(to).emit('offer', {
      sender: client.id,
      offer,
    })
  })

  client.on('answer', ({ to, answer }) => {
    console.log('answer from', client.conn.remoteAddress)

    client.to(to).emit('answer', {
      sender: client.id,
      answer,
    })
  })

  client.on('candidate', ({ to, candidate }) => {
    console.log('candidate from', client.conn.remoteAddress)

    client.to(to).emit('candidate', {
      sender: client.id,
      candidate,
    })
  })

  client.on('disconnect', () => {
    console.log('client %s disconnected', client.conn.remoteAddress)
  })
})
