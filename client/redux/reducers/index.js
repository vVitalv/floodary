import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import messages from './messages'
import adminInformation from './adminInformation'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    messages,
    adminInformation
  })

export default createRootReducer
