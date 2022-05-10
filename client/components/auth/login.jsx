import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLoginField, updatePasswordField, signIn, signUp } from '../../redux/reducers/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password, loginErrMessage } = useSelector((store) => store.auth)

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-slate-400">
      <div className="w-min bg-slate-500 p-4 rounded-md shadow-lg shadow-amber-300">
        <form className="w-min font-bold text-gray-800">
          <div className="flex flex-col gap-y-3 w-56">
            <div className="flex flex-col gap-y-1">
              <label className="self-end" htmlFor="nickname">
                Nickname
              </label>
              <div className="flex justify-between flex-nowrap">
                <svg className="h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="black"
                    fill="#fbbf24"
                    d="M 25 90
                  A 45 45, 0, 1, 1, 75 90
                  A 12 16, -40, 0, 0, 57 70
                  v -5
                  A 15 17, 0, 1, 0, 43 65
                  v 5
                  A 16 12, -60, 0, 0, 25 90
                  z
                  "
                  />
                </svg>
                <input
                  className="bg-amber-100 px-2 rounded-sm outline-none"
                  id="nickname"
                  value={username}
                  onChange={(e) => {
                    dispatch(updateLoginField(e.target.value))
                  }}
                  type="text"
                  maxLength={20}
                  placeholder="Nickname"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="self-end" htmlFor="password">
                Password
              </label>
              <div className="flex justify-between flex-nowrap">
                <svg className="h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="black"
                    fill="#fbbf24"
                    d="M 25 90
                  A 45 45, 0, 1, 1, 75 90
                  A 12 16, -40, 0, 0, 57 70
                  v -5
                  A 15 17, 0, 1, 0, 43 65
                  v 5
                  A 16 12, -60, 0, 0, 25 90
                  z
                  "
                  />
                </svg>
                <input
                  className="bg-amber-100 px-2 rounded-sm outline-none"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    dispatch(updatePasswordField(e.target.value))
                  }}
                  type="password"
                  maxLength={20}
                  placeholder="******************"
                />
              </div>
            </div>
            <div className="flex justify-around">
              <button
                className="border border-gray-300 rounded-md px-4 py-1"
                type="button"
                onClick={() => {
                  dispatch(signIn())
                }}
              >
                Sign In
              </button>
              <p className="p-1">or</p>
              <button
                className="border border-gray-300 rounded-md px-4 py-1"
                type="button"
                onClick={() => {
                  dispatch(signUp())
                }}
              >
                Sign Up
              </button>
            </div>
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
