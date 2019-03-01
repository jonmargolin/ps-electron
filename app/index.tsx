import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.global.scss';
import {match} from 'react-router';
import {default as createHashHistory} from 'history/createHashHistory';
import App from './App';
let match: match
const history = createHashHistory();
render(
  <AppContainer>
      <App match={match} location={{hash:'/',key:undefined,pathname:'/',search:'', state:null}}  history={history}  />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./Root', () => {
    render(
      <AppContainer>
          <App match={match} location={{hash:'/',key:undefined,pathname:'/',search:'', state:null}} history={history}  />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
