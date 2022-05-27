import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../redux/reducers/auth'
import { purgeHistory } from '../../redux/reducers/messages'

const Header = () => {
  const dispatch = useDispatch()
  const { login } = useSelector((store) => store.auth.user)
  const logOutAndPurge = () => {
    dispatch(purgeHistory())
    dispatch(logOut())
  }
  return (
    <header className="flex justify-between items-center h-10 px-4 w-full font-semibold text-amber-500 bg-slate-700">
      f l o o d a r y
      <p>
        {login}
        <button
          className="ml-2 text-xs text-gray-400 transition-colors duration-200 hover:text-amber-300"
          type="button"
          onClick={logOutAndPurge}
        >
          logaout
        </button>
      </p>
    </header>
  )
}

export default Header
