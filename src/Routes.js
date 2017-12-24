import React from 'react';

import App from './App'
import Todo from './components/Todo';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

const Routes = (props) => (
  <HashRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/:_id" component={Todo} />
    </div>
  </HashRouter>
)

export default Routes