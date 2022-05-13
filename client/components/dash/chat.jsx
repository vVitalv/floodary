import React from 'react'

import Rooms from './rooms'
import Dialog from './dialog'
import UserList from './users'

const Chat = () => {
  return (
    <main className="flex h-full grow break-all w-screen bg-slate-50">
      <Rooms />
      <Dialog />
      <UserList />
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
