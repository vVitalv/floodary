import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../redux/reducers/auth'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  return (
    <header className="flex justify-between items-center h-10 px-4 w-full bg-slate-700">
      f l o o d a r y
      <p>
        {user.login}
        <button
          className="ml-2 text-xs text-gray-400 transition-colors duration-200 hover:text-amber-300 "
          type="button"
          onClick={() => dispatch(logOut())}
        >
          logaout
        </button>
      </p>
    </header>
  )
}

Header.propTypes = {}

export default React.memo(Header)
