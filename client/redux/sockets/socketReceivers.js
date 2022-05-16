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
export const socket = io()

export function wsInit() {
socket.on('connect', () => {
  console.log(`${socket.id} client connected`)
})
}

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
    if (reason === 'io server disconnect') {
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

