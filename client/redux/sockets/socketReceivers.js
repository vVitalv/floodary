import { io } from 'socket.io-client'
/*
import Cookies from 'universal-cookie'

import { receivedNewMessage, deleteReceivedMessages } from '../reducers/messages'
import { updateSocketsInfo } from '../reducers/adminInformation'
import { logOut } from '../reducers/auth'
import store from '../index'

export const socket = io('http://localhost:8090', {
  transports: ['websocket'],
  withCredentials: true
})
*/
import store from '../index'
import { receiveNewMessage, updateUsersOnline } from '../reducers/messages'

export const socket = io({ transports: ['websocket'] })

socket.on('connect', () => {
  console.log('Socket client connected')
  socket.emit('load history', 'Lobbio')
})

socket.on('history messages', (msgs) => {
  store.dispatch(receiveNewMessage(msgs))
})

export function socketLogin(token, currentRoom) {
  socket.emit('new login', { token, currentRoom })
}

socket.on('users online', (onlineList) => {
  store.dispatch(updateUsersOnline(onlineList))
})

export function sendMessage(messages, currentRoom) {
  socket.emit('send mess', { messages, currentRoom, date: Date.now() })
}

socket.on('new message', (msg) => {
  store.dispatch(receiveNewMessage(msg))
})

export function socketLogout() {
  socket.disconnect()
}

socket.on('disconnect', (reason) => {
  console.log(`Socket disconnected: ${reason}`)
  if (reason === 'io client disconnect') {
    socket.connect()
  }
})
/*
function wsInit() {
  socket.on('connect', () => {
    const { token } = store.getState().auth
    const { currentRoom } = store.getState().messages
    store.dispatch(deleteReceivedMessages())
    socket.emit('new login', { token, currentRoom })
    socket.emit('load history', currentRoom)
  })
console.log(socket.id)
  socket.on('new message', (msg) => {
    store.dispatch(receivedNewMessage(msg))
  })

  socket.on('disconnect', (reason) => {
    if (reason === 'server namespace disconnect') {
      socket.connect()
    }
  })

  socket.on('history messages', (messages) => {
    store.dispatch(receivedNewMessage(messages))
  })

  socket.on('all users', (socketUser) => {
    store.dispatch(updateSocketsInfo(socketUser))
  })

  socket.on('delete cookie', () => {
    const cookie = new Cookies()
    cookie.set('token', 0, { path: '/', expires: new Date(Date.now() - 2592000) })
    store.dispatch(logOut())
  })
}
*/
