import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import config from './config'
import mongoConnect from './services/mongoose'
import passportJWT from './services/passport'
import User from './model/user.model'
import Html from '../client/html'

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

mongoConnect()

const port = process.env.PORT
const server = express()

const middleware = [
  cors({
    origin: 'http://localhost:8087/'
  }),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser(),
  passport.initialize()
]

middleware.forEach((it) => server.use(it))

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

server.get('/api/v1/auth', async (req, res) => {
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

server.post('/api/v1/auth', async (req, res) => {
  try {
    const { token, user } = await getTokenAndUser(req.body)
    createCookie(token, user.login, res)
    res.send({ status: 'ok', token, user })
  } catch (e) {
    res.send({ status: 'error', message: 'Sign in error', errorMessage: e.message })
  }
})

server.post('/api/v1/regist', async (req, res) => {
  try {
    const isUserExist = await User.findOne({ login: req.body.login })
    if (isUserExist) throw new Error('Username already exists')
    const newUser = new User(req.body)
    await newUser.save()
    const { token, user } = await getTokenAndUser(req.body)
    createCookie(token, user.login, res)
    res.send({ status: 'ok', token, user })
  } catch (e) {
    res.send({ status: 'error', message: 'Registration error', errorMessage: e.message })
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Floodary'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
