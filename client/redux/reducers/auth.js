import Cookies from 'universal-cookie'
import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const AUTH_ERR = 'AUTH_ERR'

const cookies = new Cookies()

const initialState = {
  login: '',
  password: '',
  token: cookies.get('token'),
  user: {
    login: cookies.get('user-name')
  },
  authErrMessage: { message: '', errorMessage: '' }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, login: action.login }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token, password: '', user: action.user }
    }
    case LOGOUT: {
      return { ...state, token: '', user: {} }
    }
    case AUTH_ERR: {
      return {
        ...state,
        authErrMessage: { message: action.message, errorMessage: action.errorMessage }
      }
    }
    default:
      return state
  }
}

export function updateLoginField(login) {
  return { type: UPDATE_LOGIN, login }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function signIn() {
  return (dispatch, getState) => {
    const { login, password } = getState().auth
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch({ type: AUTH_ERR, message: data.message, errorMessage: data.errorMessage })
          setTimeout(() => {
            dispatch({
              type: AUTH_ERR,
              message: '',
              errorMessage: ''
            })
          }, 5000)
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
          history.replace('/dashboard')
        }
      })
  }
}

export function signUp() {
  return (dispatch, getState) => {
    const { login, password } = getState().auth
    fetch('/api/v1/regist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch({
            type: AUTH_ERR,
            message: data.message,
            errorMessage: data.errorMessage
          })
          setTimeout(() => {
            dispatch({
              type: AUTH_ERR,
              message: '',
              errorMessage: ''
            })
          }, 5000)
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
          history.replace('/dashboard')
        }
      })
  }
}

export function signInAs() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch({
            type: AUTH_ERR,
            message: data.message,
            errorMessage: data.errorMessage
          })
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
          history.replace('/dashboard')
        }
      })
  }
}

export function logOut() {
  return { type: LOGOUT }
}
