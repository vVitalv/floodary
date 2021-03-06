import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  updateLoginField,
  updatePasswordField,
  signIn,
  signUp,
  signInAs
} from '../../redux/reducers/auth'

const MIN_PASSWORD_LENGTH = 5
const MIN_USERNAME_LENGTH = 2
const MAX_PASSWORD_LENGTH = 20
const MAX_USERNAME_LENGTH = 20

const LoginForm = () => {
  const dispatch = useDispatch()
  const { login } = useSelector((store) => store.auth)
  const { password } = useSelector((store) => store.auth)
  const { user } = useSelector((store) => store.auth)
  const { token } = useSelector((store) => store.auth)
  const { errorMessage } = useSelector((store) => store.auth.authErrMessage)
  const svgColor = (errType, label, minLength) => {
    if (errorMessage.includes(errType)) {
      return '#f87171'
    }
    if (label.length >= minLength) {
      return '#84cc16'
    }
    return '#fbbf24'
  }

  return (
    <main className="relative flex flex-col h-full w-full justify-center items-center font-mono font-semibold bg-slate-500">
      <p className="absolute bottom-2 right-2 text-amber-300">f l o o d a r y</p>
      <div className="w-min bg-slate-600 p-4 rounded-md shadow-lg shadow-amber-300">
        <form className="w-min text-gray-200">
          <div className="flex flex-col w-60">
            <div className="flex flex-col gap-y-1">
              <label className="self-end" htmlFor="nickname">
                Nickname
              </label>
              <div className="flex justify-between flex-nowrap">
                <svg className="h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="black"
                    fill={svgColor('User', login, MIN_USERNAME_LENGTH)}
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
                  className="bg-slate-100 text-gray-600 font-semibold px-2 rounded-sm outline-none"
                  id="nickname"
                  value={login}
                  onChange={(e) => {
                    dispatch(updateLoginField(e.target.value))
                  }}
                  type="text"
                  minLength={MIN_USERNAME_LENGTH}
                  maxLength={MAX_USERNAME_LENGTH}
                  placeholder="Nickname"
                  autoComplete="username"
                />
              </div>
              <p className="h-4 font-normal text-xs text-red-300">
                {errorMessage.includes('User') && errorMessage}
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="self-end" htmlFor="password">
                Password
              </label>
              <div className="flex justify-between flex-nowrap">
                <svg className="h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="black"
                    fill={svgColor('Pass', password, MIN_PASSWORD_LENGTH)}
                    d="M 25 90
                    A 45 45, 0, 1, 1, 75 90
                    v -30
                    h -5
                    v -10
                    A 1 1, 0, 1, 0, 30 50
                    v 10
                    h -5
                    z
                    M 38 60
                    h 24
                    v -10
                    A 1 1, 0, 1, 0, 38 50
                    z
                    "
                  />
                </svg>
                <input
                  className="bg-slate-100 text-gray-600 font-semibold px-2 rounded-sm outline-none"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    dispatch(updatePasswordField(e.target.value))
                  }}
                  type="password"
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={MAX_PASSWORD_LENGTH}
                  placeholder="**********"
                  autoComplete="current-password"
                />
              </div>
              <p className="h-4 font-normal text-xs text-red-300">
                {errorMessage.includes('Pass') && errorMessage}
              </p>
            </div>
            <div className="flex justify-between my-2">
              <button
                className="bg-slate-700 font-semibold text-xs rounded-md px-4 py-1 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-800"
                type="button"
                onClick={() => {
                  dispatch(signIn())
                }}
              >
                Sign In
              </button>
              <p className="p-1">or</p>
              <button
                className="bg-slate-700 font-semibold text-xs rounded-md px-4 py-1 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-800"
                type="button"
                onClick={() => {
                  dispatch(signUp())
                }}
              >
                Sign Up
              </button>
            </div>
            {token && (
              <button
                className="group bg-slate-700 grow font-semibold text-xs rounded-md px-4 py-1 transition-colors duration-200 hover:text-amber-300 hover:bg-slate-800"
                type="button"
                onClick={() => {
                  dispatch(signInAs())
                }}
              >
                Or continue as{' '}
                <span className="text-amber-300 transition-colors duration-200 group-hover:text-amber-500">
                  {user.login}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginForm
