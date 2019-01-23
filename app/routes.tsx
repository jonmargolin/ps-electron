import * as React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './containers/HomePage/HomePage';
import CounterPage from './containers/CounterPage';
import Home from './components/Home';
//import Counter from './components/Counter';
const {  history, location, match} = require('./store/configureStore');

export default () => (

      <HomePage  history={history} location = {location} match ={match}>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={Home} />
    </Switch>
      </HomePage>
);
