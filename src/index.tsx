import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import App from './app';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
  () => console.log('rendered')
);
