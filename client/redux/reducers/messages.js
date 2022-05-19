const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_CURRENT_ROOM = 'UPDATE_CURRENT_ROOM'
const UPDATE_USERS = 'UPDATE_USERS'
const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE'
const PURGE_HISTORY = 'PURGE_HISTORY'

const initialState = {
  messages: '',
  currentRoom: 'Lobbio',
  messageHistory: [],
  usersOnline: []
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return { ...state, messages: action.message }
    }
    case RECEIVE_NEW_MESSAGE: {
      return {
        ...state,
        messageHistory: [...state.messageHistory, ...action.message]
      }
    }
    case UPDATE_CURRENT_ROOM: {
      return {
        ...state,
        currentRoom: action.roomName
      }
    }
    case UPDATE_USERS: {
      return {
        ...state,
        usersOnline: action.usersOnline
      }
    }
    case PURGE_HISTORY: {
      return {
        ...state,
        messageHistory: [],
        usersOnline: []
      }
    }
    default:
      return state
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function updateCurrentRoom(roomName) {
  return {
    type: UPDATE_CURRENT_ROOM,
    roomName
  }
}

export function receiveNewMessage(message) {
  return {
    type: RECEIVE_NEW_MESSAGE,
    message
  }
}

export function updateUsersOnline(usersOnline) {
  return {
    type: UPDATE_USERS,
    usersOnline
  }
}

export function purgeHistory() {
  return {
    type: PURGE_HISTORY
  }
}
