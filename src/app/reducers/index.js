import { combineReducers } from 'redux'

import todoReducerData from './todoReducer'

const rootReducer = combineReducers({
  todoData: todoReducerData
})

export default rootReducer
