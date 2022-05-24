import { io } from 'socket.io-client'

import store from '../index'
import {
  createRoom,
  receiveHistory,
  receiveNewMessage,
  updateCurrentRoom,
  updateUsersOnline
} from '../reducers/messages'

export const socket = io({ transports: ['websocket'] })

socket.on('connect', async () => {
  console.log('Socket client connected')
  const { currentRoom } = await store.getState().messages
  socket.emit('load history', currentRoom)
  socket.emit('load rooms')
})

socket.on('history messages', (msgs) => {
  store.dispatch(receiveHistory(msgs))
})

socket.on('rooms list', (rooms) => {
  store.dispatch(createRoom(rooms))
})

export function socketLogin(login, role, currentRoom) {
  socket.emit('new login', login, role, currentRoom)
}

socket.on('users online', (onlineList) => {
  store.dispatch(updateUsersOnline(onlineList))
})

export function sendMessage(messages, currentRoom) {
  socket.emit('send mess', messages, currentRoom, Date.now())
}

socket.on('new message', (msg) => {
  store.dispatch(receiveNewMessage(msg))
})

export function changeRoom(currentRoom, newRoom) {
  socket.emit('change room', currentRoom, newRoom)
}

socket.on('new current room', (newRoom) => {
  store.dispatch(updateCurrentRoom(newRoom))
  socket.emit('load history', newRoom)
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
