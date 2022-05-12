import React from 'react'
import { useSelector } from 'react-redux'

import Rooms from './rooms'
import UserList from './users'

const Chat = () => {
  const { login, password, token, user } = useSelector((store) => store.auth)
  return (
    <main className="flex h-full grow break-all w-screen bg-slate-400">
      <Rooms />
      <div className="basis-2/3 break-words">
        <div>{login}</div>
        <div>{password}</div>
        <div>{token}</div>
        <div>{user.login}</div>
      </div>
      <UserList />
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
