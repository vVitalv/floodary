import React from 'react'
import { useSelector } from 'react-redux'

const Chat = () => {

  const { login, password, token, user } = useSelector((store) => store.auth)
  return (
    <main className="w-full h-screen bg-slate-400">
      <ul>
        <li>{login}</li>
        <li>{password}</li>
        <li>{token}</li>
        <li>{user.login}</li>
      </ul>
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
