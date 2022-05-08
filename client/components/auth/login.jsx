import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLoginField, updatePasswordField, signIn, signUp } from '../../../redux/reducers/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password, loginErrMessage } = useSelector((store) => store.auth)

  return (
    <main className="backing">
      <div className="login-modal">
        <form className="login-modal-form">
          <div className="username-field">
            <label className="username-field-label" htmlFor="username">
              Username
            </label>
            <input
              className="username-field-input"
              id="username"
              value={username}
              onChange={(e) => {
                dispatch(updateLoginField(e.target.value))
              }}
              type="text"
              placeholder="username"
            />
          </div>
          <div className="pass-field">
            <label className="pass-field-label" htmlFor="password">
              Password
            </label>
            <input
              className="pass-field-input"
              id="password"
              value={password}
              onChange={(e) => {
                dispatch(updatePasswordField(e.target.value))
              }}
              type="password"
              placeholder="******************"
            />
            <div className="pass-field-err">
              <p>{loginErrMessage}</p>
            </div>
          </div>
          <div className="btn-field">
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
    </main>
  )
}

export default LoginForm
