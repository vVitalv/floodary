import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLoginField, updatePasswordField, signIn, signUp } from '../../redux/reducers/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password, loginErrMessage } = useSelector((store) => store.auth)

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-slate-400">
      <div className="w-min bg-slate-500 p-2 rounded-md shadow-lg shadow-amber-300">
        <form className="w-min">
          <div className="flex flex-col w-48">
            <label className="username-field-label" htmlFor="nickname">
              Nickname
            </label>
            <div className="flex flex-nowrap bg-amber-100">
              <span>{'\uD83D\uDDFF'}</span>
              <input
                className="outline-none"
                id="nickname"
                value={username}
                onChange={(e) => {
                  dispatch(updateLoginField(e.target.value))
                }}
                type="text"
                placeholder="Nickname"
              />
            </div>
          </div>
          <div className="flex flex-col w-48">
            <label className="pass-field-label" htmlFor="password">
              Password
            </label>
            <div className="flex flex-nowrap bg-amber-100">
              <span>{'\uD83D\uDDDD'}</span>
              <input
                className="outline-none"
                id="password"
                value={password}
                onChange={(e) => {
                  dispatch(updatePasswordField(e.target.value))
                }}
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex justify-between w-48">
            <button
              className="btn-field-button"
              type="button"
              onClick={() => {
                dispatch(signIn())
              }}
            >
              Sign In
            </button>
            <p className="btn-field-p">or</p>
            <button
              className="btn-field-button"
              type="button"
              onClick={() => {
                dispatch(signUp())
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="pass-field-err">
        <p>{loginErrMessage}</p>
      </div>
    </main>
  )
}

export default LoginForm
