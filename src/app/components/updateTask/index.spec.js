/* global describe test expect jest */

import { mapStateToProps, mapDispatchToProps } from './index'
import * as TodoReducer from '../../reducers/todoReducer'

TodoReducer.addTask = jest.fn()
TodoReducer.updateTask = jest.fn()

describe('Update Tasks Default', () => {
  test('mapStateToProps no value', () => {
    expect(mapStateToProps({})).toEqual({
      tasks: undefined
    })
  })

  test('mapStateToProps with tasks value', () => {
    const tasks = [{
      name: 'Test',
      highPriority: false,
      completed: true,
      id: 0
    }]
    expect(mapStateToProps({
      todoData: { tasks }
    })).toEqual({ tasks })
  })

  test('should call reducer action for update task', () => {
    const dispatch = jest.fn()
    const requestParam = { name: 'test', id: 0 }
    const dispatchToProps = mapDispatchToProps(dispatch)
    dispatchToProps.updateTaskById(requestParam)
    expect(dispatch).toHaveBeenCalled()
    expect(TodoReducer.updateTask).toHaveBeenCalledWith(requestParam)
  })

  test('should call reducer action for add task', () => {
    const dispatch = jest.fn()
    const requestParam = { name: 'test', id: 0 }
    const dispatchToProps = mapDispatchToProps(dispatch)
    dispatchToProps.addNewTask(requestParam)
    expect(dispatch).toHaveBeenCalled()
    expect(TodoReducer.addTask).toHaveBeenCalledWith(requestParam)
  })
})
