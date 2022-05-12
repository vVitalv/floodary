import React from 'react'
import { useDispatch } from 'react-redux'

import { logOut } from '../redux/reducers/auth'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <header className="h-20 w-full bg-slate-700">
      header
      <button type="button" onClick={() => dispatch(logOut())}>
        logaout
      </button>
    </header>
  )
}

Header.propTypes = {}

export default React.memo(Header)
