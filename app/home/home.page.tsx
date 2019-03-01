import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IHomeProps, HomeState } from './home.model';
import { IInputChange } from '../components/ui/input/input.model';
import { HomeHelper } from './home.helper';
import { Form } from '../components/form/form';

export class HomePage extends React.Component<
  RouteComponentProps<any> & IHomeProps,
  HomeState
> {
  private _inputField: IInputChange = {
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
    value: '',
    change: (event: any) => this.inputChangedHandler(event)
  };

  constructor(readonly props: RouteComponentProps<any> & IHomeProps) {
    super(props);
    this.state = {
      ...this.state,
      filePaths: props.filePaths,
      input: this._inputField,
      button: {
        submitOrder: this.submitOrder
      }
    };
  }
  private helper = new HomeHelper();

  inputChangedHandler = (event: any): void => {
    const input = this.helper.inputChangeHandler(
      event.target.value,
      this.state.input
    );

    this.setState({ input });
  };

  // TODO: add loader  when submit  the order number.
  private submitOrder = (): void => {
    this.helper.handleSubmitOrder(this.state.input.value).subscribe(
      res => {
        this.props.onDone([...(this.state.filePaths || []), ...res.response]);
      },
      err => {
        this.props.onError(err);
      },
      () => this.props.history.push('/installer')
    );
  };

  render() {
    return (
      <>
        <Form input={this.state.input} button={this.state.button} />
      </>
    );
  }
}
