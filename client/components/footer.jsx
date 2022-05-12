import React from 'react'
import { useDispatch } from 'react-redux'

import { logOut } from '../../redux/reducers/auth'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <header className=" bg-slate-700">
      <button type="button" onClick={() => dispatch(logOut())}>
        logaout
      </button>
    </header>
  )
}

Header.propTypes = {}

export default React.memo(Header)
