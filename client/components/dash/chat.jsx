import React from 'react'
import { useSelector } from 'react-redux'

import Rooms from './rooms'
import UserList from './users'

const Chat = () => {
  const { token, user } = useSelector((store) => store.auth)
  return (
    <main className="flex h-full grow break-all w-screen bg-slate-50">
      <Rooms />
      <div className="relative basis-2/3 border-x-2 border-x-amber-200">
        <div className="absolute bg-slate-200 w-fit rounded-br-xl px-6">
          {user.login.split('').join(' ')}
        </div>
        <div className="text-gray-500 p-6">{token}</div>
      </div>
      <UserList />
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
