import Cookies from 'universal-cookie'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const AUTH_ERR = 'AUTH_ERR'
const REGIST_ERR = 'REGIST_ERR'
const LOGIN_ERR = 'LOGIN_ERR'

const cookies = new Cookies()

const initialState = {
  login: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  authErrMessage: '',
  registErrMessage: '',
  loginErrMessage: ''
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
    case REGIST_ERR: {
      return { ...state, registErrMessage: action.registErrMessage }
    }
    case LOGIN_ERR: {
      return { ...state, loginErrMessage: action.loginErrMessage }
    }
    case AUTH_ERR: {
      return { ...state, authErrMessage: action.authErrMessage }
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
          dispatch({ type: LOGIN_ERR, loginErrMessage: `${data.message}: ${data.errorMessage}` })
          setTimeout(() => {
            dispatch({
              type: LOGIN_ERR,
              loginErrMessage: ''
            })
          }, 5000)
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
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
            type: REGIST_ERR,
            registErrMessage: `${data.message}: ${data.errorMessage}`
          })
          setTimeout(() => {
            dispatch({
              type: REGIST_ERR,
              registErrMessage: ''
            })
          }, 5000)
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
        }
      })
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch({
            type: AUTH_ERR,
            authErrMessage: `${data.message}: ${data.errorMessage}`
          })
        } else {
          dispatch({ type: LOGIN, token: data.token, user: data.user })
        }
      })
  }
}

export function logOut() {
  return { type: LOGOUT }
}
