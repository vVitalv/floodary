const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_CURRENT_ROOM = 'UPDATE_CURRENT_ROOM'
const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE'
const DELETE_RECEIVED_MESSAGES = 'DELETE_RECEIVED_MESSAGES'

const initialState = {
  messages: '',
  currentRoom: 'general',
  receivedMess: []
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return { ...state, messages: action.message }
    }
    case RECEIVED_NEW_MESSAGE: {
      return {
        ...state,
        receivedMess: [...state.receivedMess, ...action.message]
      }
    }
    case UPDATE_CURRENT_ROOM: {
      return {
        ...state,
        currentRoom: action.roomName
      }
    }
    case DELETE_RECEIVED_MESSAGES: {
      return {
        ...state,
        receivedMess: []
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

export function updateCurrencyRoom(roomName) {
  return {
    type: UPDATE_CURRENT_ROOM,
    roomName
  }
}

export function receivedNewMessage(message) {
  return {
    type: RECEIVED_NEW_MESSAGE,
    message
  }
}

export function deleteReceivedMessages() {
  return {
    type: DELETE_RECEIVED_MESSAGES
  }
}
