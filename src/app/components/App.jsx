import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Container from 'react-bootstrap/Container'

import ViewTaskComponent from './ViewTask'
import UpdateTaskComponent from './updateTask'
import store from '../store'

const Root = () => (
  <Provider store={store}>
    <Router>
      <Container style={{ marginTop: '1rem' }}>
        <Route path='/task/:taskId(add|\d{0,9})' exact component={UpdateTaskComponent} />
        <Route path='/' exact component={ViewTaskComponent} />
      </Container>
    </Router>
  </Provider>
)

export default hot(module)(Root)
