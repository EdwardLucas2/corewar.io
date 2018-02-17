import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import parser from '../features/parser/reducer'
import simulator from '../features/simulator/reducer'
import notification from '../features/notifications/reducer'

export default combineReducers({
  routing: routerReducer,
  parser,
  simulator,
  notification
})