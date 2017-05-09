'use strict'

/* eslint-disable no-console */
const server = require('http').createServer(connectionHandler)
const io = require('socket.io')(server)
const fs = require('fs')

server.listen(7000, '0.0.0.0', () => {
  console.log('[http] server started')
})

io.sockets.on('connection', client => {
  console.log('new connection from', client.conn.remoteAddress)
  // #1
  // сообщаем всем участникам, что
  // подключился новый клиент
  client.broadcast.emit('client', {
    sender: client.id
  })

  // #2
  // после получения сообщения о новом участнике
  // клиент client создаёт объект RTCPeerConnection,
  // и отправляет offer этому новому участнику
  // old -> new
  client.on('offer', ({to, offer}) => {
    console.log('offer from', client.conn.remoteAddress)

    client.to(to).emit('offer', {
      sender: client.id,
      offer
    })
  })

  // #3
  // далее новый подключившийся участник
  // после получения offer от всех клиентов
  // создаёт для каждого из них RTCPeerConnection,
  // устанавливает setRemoteDescription и
  // отправляет answer инициатору
  // new -> old
  client.on('answer', ({to, answer}) => {
    console.log('answer from', client.conn.remoteAddress)

    client.to(to).emit('answer', {
      sender: client.id,
      answer
    })
  })

  // #4
  // после запроса к ICE серверу мы получаем
  // все свои IP адреса. для корректной работы
  // webrtc мы должны сообщить эти адреса
  // всем участникам, а также все участники
  // должны сообщить свои адреса
  client.on('candidate', ({to, candidate}) => {
    console.log('candidate from', client.conn.remoteAddress)

    client.to(to).emit('candidate', {
      sender: client.id,
      candidate
    })
  })

    client.on('disconnect', () => {
    console.log('client %s disconnected', client.conn.remoteAddress)
  })
})

function connectionHandler (req, res) {
  switch(req.url) {
    case '/':
      writeFile('index.html', res)
      return
    default:
      writeFile(req.url, res)
      break
  }
}

function writeFile(filename, res) {
  fs.readFile(__dirname + '/' + filename, function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end(`Error loading ${filename}`)
    }

    res.writeHead(200)
    res.end(data)
  })
}
