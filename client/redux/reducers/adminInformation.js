const UPDATE_SOCKETS_INFO = 'UPDATE_SOCKETS_INFO'

const initialState = {
  socketsInfo: []
}

export default function socketInfoUsers(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SOCKETS_INFO:
      return {
        ...state,
        socketsInfo: action.socketUser
      }
    default:
      return state
  }
}

export function updateSocketsInfo(socketUser) {
  return {
    type: UPDATE_SOCKETS_INFO,
    socketUser
  }
}
