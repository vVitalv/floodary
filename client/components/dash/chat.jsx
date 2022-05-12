import React from 'react'
import { useSelector } from 'react-redux'

import Rooms from './rooms'
import UserList from './users'

const Chat = () => {
  const { token, user } = useSelector((store) => store.auth)
  return (
    <main className="flex h-full grow break-all w-screen bg-amber-200">
      <Rooms />
      <div className="basis-2/3">
        <div className="bg-slate-600 text-amber-300 w-fit rounded-br-xl px-6">
          {user.login.split('').join(' ')}
        </div>
        <div className="text-gray-500 px-6">{token}</div>
      </div>
      <UserList />
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
