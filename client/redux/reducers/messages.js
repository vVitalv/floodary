const INPUT_MESSAGE = 'INPUT_MESSAGE'
const INPUT_ROOM = 'INPUT_ROOM'
const UPDATE_CURRENT_ROOM = 'UPDATE_CURRENT_ROOM'
const UPDATE_USERS = 'UPDATE_USERS'
const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE'
const CREATE_ROOM = 'CREATE_ROOM'
const PURGE_HISTORY = 'PURGE_HISTORY'
const lobby = 'Lobbio'

const initialState = {
  messages: '',
  newRoomName: '',
  currentRoom: lobby,
  rooms: [],
  messageHistory: [],
  usersOnline: []
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_HISTORY: {
      return {
        ...state,
        messageHistory: action.message
      }
    }
    case INPUT_MESSAGE: {
      return { ...state, messages: action.message }
    }
    case RECEIVE_NEW_MESSAGE: {
      return {
        ...state,
        messageHistory: [...state.messageHistory, ...action.message]
      }
    }
    case UPDATE_USERS: {
      return {
        ...state,
        usersOnline: action.usersOnline
      }
    }
    case INPUT_ROOM: {
      return { ...state, newRoomName: action.newRoomName }
    }
    case CREATE_ROOM: {
      return { ...state, rooms: [...state.rooms, ...action.newRoomName], newRoomName: '' }
    }
    case UPDATE_CURRENT_ROOM: {
      return {
        ...state,
        currentRoom: action.roomName
      }
    }
    case PURGE_HISTORY: {
      return initialState
    }
    default:
      return state
  }
}

export function receiveHistory(message) {
  return {
    type: RECEIVE_HISTORY,
    message
  }
}

export function inputMessage(message) {
  return {
    type: INPUT_MESSAGE,
    message
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

export function inputRoomName(newRoomName) {
  return {
    type: INPUT_ROOM,
    newRoomName
  }
}

export function createRoom(newRoomName) {
  return {
    type: CREATE_ROOM,
    newRoomName
  }
}

export function updateCurrentRoom(roomName) {
  return {
    type: UPDATE_CURRENT_ROOM,
    roomName
  }
}

export function purgeHistory() {
  return {
    type: PURGE_HISTORY
  }
}
