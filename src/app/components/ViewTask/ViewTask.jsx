import React from 'react'
import propTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

const ViewTasks = ({
  showList,
  tasks,
  completedCount,
  deleteTaskById,
  updateTaskById,
  history
}) => (
  <div>
    <Row>
      <ButtonToolbar>
        <Button
          type='button'
          variant='primary'
          data-test-id='add-action'
          onClick={() => history.push('/task/add')}
        >
          Add Task
        </Button>
      </ButtonToolbar>
    </Row>
    <Row style={{ marginTop: '1rem' }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan='2'>Task</th>
            <th>High Priority</th>
            <th>Completed</th>
            <th colSpan='1' />
          </tr>
        </thead>
        <tbody>
          {
            showList && tasks.map((task, idx) => (
              <tr key={`${task.key}${task.name}`}>
                <td>{idx + 1}</td>
                <td colSpan='2'>
                  <Button
                    type='button'
                    variant='link'
                    data-test-id={`update-action-${idx}`}
                    onClick={() => history.push(`/task/${task.id}`)}
                  >
                    {task.name}
                  </Button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Form.Check
                    name='highPriority'
                    checked={task.highPriority}
                    inline
                    data-test-id={`update-priority-${idx}`}
                    onChange={() => updateTaskById({
                      ...task,
                      highPriority: !task.highPriority
                    })}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Form.Check
                    name='completed'
                    checked={task.completed}
                    inline
                    data-test-id={`update-completed-${idx}`}
                    onChange={() => updateTaskById({
                      ...task,
                      completed: !task.completed
                    })}
                  />
                </td>
                <td>
                  <Button
                    type='button'
                    variant='danger'
                    data-test-id={`delete-action-${idx}`}
                    onClick={() => deleteTaskById(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Row>
    <Row style={{ marginTop: '1rem' }}>
      <ButtonToolbar>
        <Button variant='success' style={{ marginRight: '1rem' }}>
          Completed&nbsp;
          <Badge variant='light' pill data-test-id='completed-count'>
            {completedCount}
          </Badge>
        </Button>
        <Button variant='info'>
          Total&nbsp;
          <Badge variant='light' pill data-test-id='total-count'>
            {tasks.length}
          </Badge>
        </Button>
      </ButtonToolbar>
    </Row>
  </div>
)

ViewTasks.propTypes = {
  showList: propTypes.bool.isRequired,
  completedCount: propTypes.number.isRequired,
  tasks: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      highPriority: propTypes.bool,
      id: propTypes.oneOfType([
        propTypes.number,
        propTypes.string
      ])
    })
  ).isRequired,
  deleteTaskById: propTypes.func.isRequired,
  updateTaskById: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired
}

export default ViewTasks
