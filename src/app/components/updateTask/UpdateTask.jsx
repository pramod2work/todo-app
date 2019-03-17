import React from 'react'
import propTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class UpdateTaskForm extends React.Component {
  constructor (props) {
    super(props)

    const { match, tasks } = this.props

    // check if tasks already exisits to decide its an update of Add action
    const task = tasks[match.params.taskId]

    // Based on action prepopulate values as necessary
    this.state = {
      name: (task && task.name) || '',
      highPriority: (task && task.highPriority) || false,
      completed: (task && task.completed) || false,
      validated: false,
      isUpdateForm: !!task,
      taskId: match.params.taskId
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // Use common method to store field value in state
  handleInputChange (event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [target.name]: value })
  }

  handleSubmit (event) {
    // prevent default html form submit event
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      const {
        isUpdateForm,
        taskId,
        name,
        highPriority,
        completed
      } = this.state
      const { updateTaskById, addNewTask, history } = this.props

      // create task data object as it can be used for update or Add
      const taskData = { name, highPriority, completed }

      // Call appropriate reducer action
      if (isUpdateForm) {
        updateTaskById({
          ...taskData,
          id: taskId
        })
      } else {
        addNewTask({ ...taskData })
      }

      // redirect user to view once task is added/updated
      history.push('/')
    }

    this.setState({ validated: true })
  }

  render () {
    const {
      validated,
      isUpdateForm,
      name,
      highPriority,
      completed
    } = this.state

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Group as={Row} controlId='formHorizontalTask'>
          <Form.Label column sm={2}>
            Task
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type='text'
              name='name'
              data-test-id='task-name'
              placeholder='task'
              value={name}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formHorizontalCheck'>
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              name='highPriority'
              label='High Priority'
              data-test-id='task-priority'
              checked={highPriority}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formHorizontalCompleted'>
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              name='completed'
              label='Mark Complete'
              data-test-id='task-status'
              checked={completed}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit' data-test-id='submit-action'>
              {!isUpdateForm ? 'Add' : 'Update'}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    )
  }
}

UpdateTaskForm.defaultProps = {
  tasks: []
}

UpdateTaskForm.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      taskId: propTypes.oneOfType([
        propTypes.number,
        propTypes.string
      ]).isRequired
    })
  }).isRequired,
  tasks: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      highPriority: propTypes.bool,
      id: propTypes.number
    })
  ),
  updateTaskById: propTypes.func.isRequired,
  addNewTask: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired
}

export default UpdateTaskForm
