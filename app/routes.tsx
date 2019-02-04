import * as React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './containers/HomePage/HomePage';
import Home from './components/Home';
import { InstallerPage } from './containers/installer/installerPage';
const {  history, location, match} = require('./store/configureStore');

export default () => (

      <HomePage  history={history} location = {location} match ={match}>
    <Switch>
      <Route path="/installer" component={InstallerPage} />
      <Route path="/" component={Home} />
    </Switch>
      </HomePage>
);
