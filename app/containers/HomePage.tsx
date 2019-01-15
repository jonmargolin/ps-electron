import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../components/Home';
import Iform from '../components/form/module';
import Iinput from '../components/ui/input/module';
import Ibutton from '../components/ui/button/moudle';

export class HomePage extends React.Component<Iform> {
    submitOrder = (): void => {
    console.log('testt');
    }
    inputChangedHandler = (event: any, inputIdentifier: any): void => {
    console.log(event);
    }
    render() {
        const fromBtn: Ibutton ={
            submitOrder(): void {
            console.log('testt');
        }
        }
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
            value:'',
            change: (event: any) => this.inputChangedHandler(event, 1)
        }
        return (
      <Home
          input={
              inputFilde
          }
          button={fromBtn}

      />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
