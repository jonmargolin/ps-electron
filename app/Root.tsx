import * as React from 'react';
import * as Redux from 'react-redux';
import { History } from 'history';
import {BrowserRouter, match} from 'react-router-dom';
import { Layout } from './layout/layout';

interface IRootType {
  store: Redux.Store<any>;
  history: History
};
let match: match
export default function Root({ store, history }: IRootType) {
  return (
      <BrowserRouter>
          <Layout match={match} location={{hash:'/',key:undefined,pathname:'/',search:'', state:null}} history={history}  />
      </BrowserRouter>
  );
}
