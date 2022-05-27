import React from 'react'

import UserList from './users'
import Rooms from './rooms'
import Dialog from './dialog'

const Chat = () => {
  return (
    <div className="relative flex grow">
      <UserList />
      <Rooms />
      <Dialog />
    </div>
  )
}

export default Chat
