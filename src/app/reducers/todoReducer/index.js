import { handleActions, createAction } from 'redux-actions'

// Actions
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'

const initialState = {
  tasks: []
}

export const addTask = createAction(ADD_TASK)
export const updateTask = createAction(UPDATE_TASK)
export const deleteTask = createAction(DELETE_TASK)

const todoDataReducer = handleActions({
  [addTask]: (state, action) => ({
    tasks: [
      ...state.tasks,
      {
        ...action.payload,
        // keeping it simaple to use index as key
        id: state.tasks.length
      }
    ]
  }),
  [updateTask]: (state, action) => {
    const { tasks } = state
    tasks[action.payload.id] = {
      ...action.payload
    }

    return { tasks }
  },
  [deleteTask]: (state, action) => {
    const { tasks } = state
    tasks.splice(action.payload, 1)

    // as index is id re-populate id
    const updateTasks = tasks.map((task, index) => ({
      ...task,
      id: index
    }))
    return { tasks: updateTasks }
  }
}, initialState)

export default todoDataReducer
