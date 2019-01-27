import * as React from 'react';
import {Layout} from './layout/layout';
import {match, Route, Switch} from 'react-router';

// import Counter from '../components/Counter';
// import Error from '../components/errors/error';
// import Home from '../components/Home';
import { createBrowserHistory } from 'history'
import Error from '../components/errors/error';
import Counter from '../components/Counter';
import Home from '../components/Home';

let match: match
export default class App extends React.Component<any> {
  render() {
      return (
      <div>
          <Layout history={createBrowserHistory()} location ={{hash:'',key:undefined,pathname:'',search:'', state:null}} match = {match}>
              <Switch>
                  <Route path="/error" render={(props) => <Error  {...props} test ={'test'}/>}/>
                  <Route path="/counter" component={Counter} />
                  <Route path="/" render ={(props) => <Home children={props} />}/>
              </Switch>
          </Layout>
      </div>
    );
  }
}
