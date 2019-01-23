import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.global.scss';
import {Layout} from './containers/layout/layout';
import {match} from 'react-router';
import {default as createHashHistory} from 'history/createHashHistory';
let match: match
const history = createHashHistory();
render(
  <AppContainer>
      <Layout match={match} location={{hash:'/',key:undefined,pathname:'/',search:'', state:null}}  history={history}  />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    render(
      <AppContainer>
          <Layout match={match} location={{hash:'/',key:undefined,pathname:'/',search:'', state:null}} history={history}  />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
