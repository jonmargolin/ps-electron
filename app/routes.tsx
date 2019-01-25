import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage/HomePage';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={CounterPage} />
      <Route path="/counter" component={HomePage} />
    </Switch>
  </App>
);
