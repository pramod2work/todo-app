import { connect } from 'react-redux'

import { updateTask, addTask } from '../../reducers/todoReducer'

import UpdateTaskComponent from './UpdateTask'

export const mapStateToProps = ({ todoData: { tasks } = {} }) => ({ tasks })

export const mapDispatchToProps = dispatch => (
  {
    updateTaskById: (task) => {
      dispatch(updateTask(task))
    },
    addNewTask: (task) => {
      dispatch(addTask(task))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskComponent)
