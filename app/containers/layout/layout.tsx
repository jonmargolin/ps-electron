import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Iinput from '../../components/ui/input/module';
import { IState } from '../HomePage/module';
import Error from '../../components/errors/error';
import Home from '../../components/Home';
import WooCommerceApi from '../../utils/wooCommerceApi';
import { InstallerPage } from '../installer/installerPage';
import { HttpClient } from '../../utils/httpClient';
import { concat } from 'rxjs';

const Aux = (props: any) => {
  return props.children;
};
const inputField: Iinput = {
  elementConfig: {
    type: 'text',
    placeholder: 'please enter yours order number'
  },
  elementType: 'input',
  invalid: false,
  shouldValidate: {
    required: true
  },
  touched: false,
  value: ''
};

export class Layout extends React.Component<RouteComponentProps<any>, IState> {
  http = new HttpClient();
  readonly state: IState = {
    input: inputField,
    filePaths: []
  };
  inputChangedHandler = (event: any): void => {
    const input = { ...this.state.input };
    input.value = event.target.value;
    input.touched = true;
    input.invalid = this.checkValidity(input.value, input.shouldValidate);
    this.setState({ input: input });
  };
  // check  input validation
  checkValidity(value: string, rules: any): boolean {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }
  // check order number if order number is invalid  change the route to error page
  //  if order number is valid get the product path form the json in the server. and crate array of product detailed.
  // Todo add loader  when submit  the order number.
  submitOrder = (): void => {
    const orderNumber: Promise<number | number[]> = WooCommerceApi.checkOrder(
      this.state.input.value
    );
    orderNumber.then(value => {
      // Todo crate  the error page and show the msg.
      if (value === 404) {
        this.props.history.replace('/error');
      } else {
        // TODO: handel error respond of 404 and update the state when get the resound.
        const orders: number[] = value as number[];
        const orders$ = orders.map(
          order => this.http.get(
            `http://psdev.pskiss.com/wp-content/installer/winPath/${order}.json`
          )
        );

        concat(...orders$).subscribe(
          (res) => {
            return this.setState({
              filePaths: [...this.state.filePaths, ...res.response]
            });
          },
          (err) => {
            console.log('err:', err)
            this.props.history.push('/error')
          },
          () => this.props.history.push('/installer')
        );        
      }
    });
  };
  render() {
    return (
      <Aux>
        <div>
          <Router>
            <Switch>
              <Route
                exact
                path="/error"
                render={props => <Error {...props} test={'test'} />}
              />
              <Route
                path="/installer"
                render={props => (
                  <InstallerPage {...props} filePaths={this.state.filePaths} />
                )}
              />
              <Route
                path="/"
                render={props => (
                  <Home
                    {...props}
                    input={{
                      touched: this.state.input.touched,
                      shouldValidate: this.state.input.shouldValidate,
                      invalid: this.state.input.invalid,
                      value: this.state.input.value,
                      elementConfig: this.state.input.elementConfig,
                      elementType: this.state.input.elementType,
                      change: (event: any) => this.inputChangedHandler(event)
                    }}
                    button={{ submitOrder: () => this.submitOrder() }}
                  />
                )}
              />
            </Switch>
          </Router>
        </div>
      </Aux>
    );
  }
}

export default (Layout as any) as React.StatelessComponent<RouteComponentProps<any>>;
