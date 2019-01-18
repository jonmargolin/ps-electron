import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../../components/Home';
import Iform from '../../components/form/module';
import Iinput from '../../components/ui/input/module';
import {IState} from './module';

const inputFilde: Iinput ={
    elementConfig: {
        type: 'text',
        placeholder: 'please enter yours order number'
    },
    elementType: 'input',
    invalid: false,
    shouldValidate:{
        required: true
    },
    touched: false,
    value:'',
    }
export class HomePage extends React.Component< Iform, IState> {
    readonly state: IState = {input : inputFilde}
    inputChangedHandler = (event : any): void => {
        const input = {... this.state.input};
        input.value = event.target.value;
        input.touched = true;
        input.invalid =  this.checkValidity( input.value, input.shouldValidate);
        this.setState({input: input});
    }
    checkValidity(value: string, rules: any): boolean {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid
    }
    submitOrder = (): void => {
        console.log('test')
    }
    render() {
        return (
      <Home
          input= {{touched: this.state.input.touched,
          shouldValidate: this.state.input.shouldValidate,
          invalid: this.state.input.invalid,
          value: this.state.input.value,
          elementConfig: this.state.input.elementConfig,
          elementType: this.state.input.elementType,
          change:(event: any)=> this.inputChangedHandler(event)}}
          button={{submitOrder: () => this.submitOrder()}}

      />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
