import * as React from 'react';
import { Layout } from './layout/layout';
import { Route, Switch, Router, RouteComponentProps } from 'react-router';

import { InstallerPage, FilePath, IInstallerProps } from './installer';
import { HomePage } from './home';
import { ErrorPage } from './error/error.page';

export interface RootState {
  filePaths: FilePath[];
  error: any;
}
export default class App extends React.Component<
  RouteComponentProps<any>,
  RootState
> {
  constructor(readonly props: RouteComponentProps<any>) {
    super(props);
    this.state = {
      filePaths: [],
      error: {
        message: null
      }
    };
  }

  setFilePaths = (filePaths: FilePath[]) => {
    this.setState({ filePaths });
  };

  handleError = (error: any) => {
    this.setState({ error });
    this.props.history.push('/error');
  };

  render() {
    return (
      <div>
        <Layout {...this.props}>
          <div>
            <Router {...this.props}>
              <Switch>
                <Route
                  exact
                  path="/error"
                  render={props => (
                    <ErrorPage {...props} error={this.state.error.message} />
                  )}
                />
                <Route
                  path="/installer"
                  render={(
                    props: RouteComponentProps<any> & IInstallerProps
                  ) => (
                    <InstallerPage
                      {...props}
                      {...this.state}
                      onError={this.handleError}
                    />
                  )}
                />
                <Route
                  path="/"
                  render={props => (
                    <HomePage
                      {...this.state}
                      {...props}
                      onDone={this.setFilePaths}
                      onError={this.handleError}
                    />
                  )}
                />
              </Switch>
            </Router>
          </div>
        </Layout>
      </div>
    );
  }
}
