/* global describe test expect beforeAll jest */

import React from 'react'
import { shallow } from 'enzyme'

import UpdateTasksComponent from './UpdateTask'

describe('Test for View Tasks Component', () => {
  let component
  const propValues = {
    match: {
      params: { taskId: 'add' }
    },
    tasks: [{
      name: 'test',
      completed: false,
      highPriority: false,
      id: 0,
      key: 0
    }],
    addNewTask: jest.fn(),
    updateTaskById: jest.fn(),
    history: { push: jest.fn() }
  }

  beforeAll(() => {
    component = shallow(<UpdateTasksComponent {...propValues} />)
  })

  test('Check snapshot for add', () => {
    expect(component).toMatchSnapshot()
  })

  test('Check snapshot for update', () => {
    const updateProps = {
      ...propValues,
      match: {
        params: { taskId: 0 }
      }
    }
    const updateComponent = shallow(<UpdateTasksComponent {...updateProps} />)
    expect(updateComponent).toMatchSnapshot()
  })

  test('check for update task name', () => {
    const event = {
      target: {
        type: 'text',
        value: 'Test',
        name: 'name'
      }
    }
    component.instance().handleInputChange(event)
    expect(component.state().name).toBe('Test')
  })

  test('check for complete status change', () => {
    const event = {
      target: {
        type: 'checkbox',
        checked: true,
        name: 'completed'
      }
    }
    component.instance().handleInputChange(event)
    expect(component.state().completed).toBeTruthy()
  })

  test('check for highPriority status change', () => {
    component.setState({
      ...component.state(),
      highPriority: true
    })

    const event = {
      target: {
        type: 'checkbox',
        checked: false,
        name: 'highPriority'
      }
    }
    component.instance().handleInputChange(event)
    expect(component.state().highPriority).toBeFalsy()
  })

  test('check for Invalid Form Submit', () => {
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      currentTarget: {
        checkValidity: jest.fn(() => false)
      }
    }
    component.instance().handleSubmit(event)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(event.stopPropagation).toHaveBeenCalled()
    expect(propValues.updateTaskById).not.toHaveBeenCalled()
    expect(propValues.addNewTask).not.toHaveBeenCalled()
    expect(component.state().validated).toBeTruthy()
  })

  test('check for valid Form Submit for update', () => {
    const updateProps = {
      ...propValues,
      match: {
        params: { taskId: 0 }
      }
    }
    const updateComponent = shallow(<UpdateTasksComponent {...updateProps} />)

    const formData = {
      name: 'Test',
      highPriority: true,
      completed: false
    }
    updateComponent.setState({
      ...updateComponent.state(),
      ...formData,
      taskId: 0
    })
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      currentTarget: {
        checkValidity: jest.fn(() => true)
      }
    }
    updateComponent.instance().handleSubmit(event)

    expect(propValues.updateTaskById).toHaveBeenCalledWith({
      ...formData, id: 0
    })
    expect(propValues.addNewTask).not.toHaveBeenCalled()
  })

  test('check for valid Form Submit for update', () => {
    const formData = {
      name: 'Test',
      highPriority: true,
      completed: false
    }
    component.setState({
      ...component.state(),
      ...formData
    })
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      currentTarget: {
        checkValidity: jest.fn(() => true)
      }
    }
    component.instance().handleSubmit(event)

    expect(propValues.addNewTask).toHaveBeenCalledWith({
      ...formData
    })
  })
})
