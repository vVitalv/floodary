const LOG = 'LOG'

const initialState = {
  log: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG: {
      return { ...state, log: action.log }
    }

    default:
      return state
  }
}
