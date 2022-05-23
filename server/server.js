import express from 'express'
import path from 'path'
// import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import config from './config'
import mongoConnect from './services/mongoose'
import passportJWT from './services/passport'
import User from './model/user.model'
import Message from './model/message.model'
import Html from '../client/html'

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle')
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"')
}

// const connections = []
const userNames = {}
const onlineList = () => {
  return Object.keys(userNames).map((id) => {
    return userNames[id][0]
  })
}

mongoConnect()

const port = process.env.PORT || 8090
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const middleware = [
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser(),
  passport.initialize()
]

middleware.forEach((it) => app.use(it))

passport.use('jwt', passportJWT)

function createToken(user) {
  const payload = { uid: user.id }
  const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
  delete user.password
  return token
}

async function getTokenAndUser(data) {
  const user = await User.findAndValidateUser(data)
  const token = createToken(user)
  return { token, user }
}

function createCookie(token, userName, res) {
  return res
    .cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    .cookie('user-name', userName, { maxAge: 1000 * 60 * 60 * 48 })
}

app.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const token = createToken(user)
    createCookie(token, user.login, res)
    res.send({ status: 'ok', token, user })
  } catch (e) {
    res.send({ status: 'error', message: 'Authentification error', errorMessage: e.message })
  }
})

app.post('/api/v1/auth', async (req, res) => {
  try {
    const { token, user } = await getTokenAndUser(req.body)
    createCookie(token, user.login, res)
    res.send({ status: 'ok', token, user })
  } catch (e) {
    res.send({ status: 'error', message: 'Sign in error', errorMessage: e.message })
  }
})

app.post('/api/v1/regist', async (req, res) => {
  try {
    const isUserExist = await User.findOne({ login: req.body.login })
    if (isUserExist) throw new Error('Username already exists')
    const newUser = new User(req.body)
    await newUser.save()
    const { token, user } = await getTokenAndUser(req.body)
    createCookie(token, user.login, res)
    res.send({ status: 'ok', token, user })
  } catch (e) {
    if (e.name === 'ValidationError') {
      const doc = Object.keys(e.errors)[0]
      res.send({
        status: 'error',
        message: 'Registration error',
        errorMessage: e.errors[doc].message
      })
    } else {
      res.send({
        status: 'error',
        message: 'Registration error',
        errorMessage: e.message
      })
    }
  }
})

app.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Floodary'
}).split('separator')

app.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

app.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }
  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

io.on('connection', (socket) => {
  console.log(`Server: ${socket.id} socket connected`)

  socket.on('load history', async (roomName) => {
    try {
      const messages = await Message.find({ room: roomName })
      const messagesHistory = messages.map((it) => [it.userName, it.message, it.date])
      socket.emit('history messages', messagesHistory)
    } catch {
      console.log('No room history')
    }
  })

  socket.on('load rooms', async () => {
    try {
      const rooms = await Message.distinct('room')
      socket.emit('rooms list', rooms)
    } catch {
      console.log('Rooms load error')
    }
  })

  socket.on('new login', ({ login, role, currentRoom }) => {
    try {
      userNames[socket.id] = [login, role]
      socket.join(currentRoom)
      io.in(Array.from(socket.rooms)).emit('users online', onlineList())
    } catch {
      console.log('Joining room error')
    }
  })

  socket.on('send mess', async ({ messages, currentRoom, date }) => {
    try {
      const newMessage = new Message({
        userName: userNames[socket.id][0],
        message: messages,
        room: currentRoom,
        date
      })
      await newMessage.save()
      io.to(currentRoom).emit('new message', [
        [newMessage.userName, newMessage.message, newMessage.date]
      ])
    } catch (err) {
      console.log(`Send message error: ${err}`)
    }
  })

  socket.on('disconnect', (reason) => {
    console.log(`Socket ${socket.id} disconnected because: ${reason}`)
    delete userNames[socket.id]
    io.in(Array.from(socket.rooms)).emit('users online', onlineList())
  })
})

/*
io.on('connection', (socket) => {
  connections.push(socket)

  socket.on('new login', async ({ token, currentRoom }) => {
    try {
      const user = jwt.verify(token, config.secret)
      const { login, role } = await User.findById(user.uid)
      userNames[socket.id] = [login, role]
      if (role.indexOf('admin') !== -1) {
        socket.emit('all users', userNames)
      }
      socket.join(currentRoom)
    } catch {
      console.log('tried to login without token')
    }
  })

  socket.on('load history', async (roomName) => {
    const messages = getFormatMessages(await Message.find({ room: roomName }))
    io.to(socket.id).emit('history messages', messages)
  })

  socket.on('send mess', async ({ messages, currentRoom }) => {
    try {
      const newMessage = new Message({
        userName: userNames[socket.id][0],
        message: messages,
        room: currentRoom
      })
      await newMessage.save()
    } catch (err) {
      console.log(`err${err}`)
    }
    io.to(currentRoom).emit('new message', { [userNames[socket.id][0]]: messages })
  })

  socket.on('disconnect', () => {
    delete userNames[socket.id]
  })

  socket.on('get clients', () => {
    if (
      typeof userNames[socket.id] !== 'undefined' &&
      userNames[socket.id].indexOf('admin') !== -1
    ) {
      socket.emit('all users', userNames)
    }
  })

  socket.on('disconnect user', (id) => {
    io.to(id).emit('delete cookie')
    io.of('/').in(id).disconnectSockets()
    delete userNames[id]
  })
})
*/

httpServer.listen(port)
console.log(`Serving at http://localhost:${port}`)
