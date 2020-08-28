import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'

const App = () => {
  return <h1>Hello World</h1>
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
  () => console.log('rendered')
)
