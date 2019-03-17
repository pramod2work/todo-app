import { connect } from 'react-redux'

import { deleteTask, updateTask } from '../../reducers/todoReducer'
import { sortByNameAndPriority } from '../../utils/utils'

import ViewTaskComponent from './ViewTask'

export const mapStateToProps = ({ todoData = {} }) => {
  const { tasks } = todoData
  const showList = (tasks && tasks.length > 0) || false

  return ({
    showList,
    completedCount: (showList && tasks.filter(task => task.completed).length) || 0,
    tasks: (showList && sortByNameAndPriority(tasks)) || []
  })
}

export const mapDispatchToProps = dispatch => (
  {
    deleteTaskById: (taskId) => {
      dispatch(deleteTask(taskId))
    },
    updateTaskById: (task) => {
      dispatch(updateTask(task))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskComponent)
