import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../components/Home';
import Iform from '../components/form/module';
import Iinput from '../components/ui/input/module';

export class HomePage extends React.Component<Iform> {

    render() {
        const inputFilde: Iinput ={
            elementConfig: {
                type: 'text',
                placeholder: 'please enter yours order number'
            },
            elementType: 'input',
            invalid: true,
            shouldValidate:{
                required: true
            },
            touched: false,
            value:''
        }
        return (
      <Home
          input={
              inputFilde
          }
      />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
