import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../redux/reducers/auth'

const Chat = () => {
  const dispatch = useDispatch()
  const { login, password, token, user } = useSelector((store) => store.auth)
  return (
    <main className="h-screen">
      <ul>
        <li>{login}</li>
        <li>{password}</li>
        <li>{token}</li>
        <li>{user.login}</li>
      </ul>
      <button type="button" onClick={() => dispatch(logOut())}>
        logaout
      </button>
    </main>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
