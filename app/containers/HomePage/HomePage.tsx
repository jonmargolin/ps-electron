import * as React from 'react';
import Home from '../../components/Home';
import Iform from '../../components/form/module';
import Iinput from '../../components/ui/input/module';
import {IState} from './module';
import { RouteComponentProps} from 'react-router-dom';
const WooCommerceAPI = require('woocommerce-api');
const WooCommerce = new WooCommerceAPI({
    url:"http://psdev.pskiss.com",
    consumerKey: "ck_3b7e4a7386f90018f5aa0427d40380fcd0f31d92",
    consumerSecret: "cs_0a05dc92c5ddd8c3b84a1a5bd73fd91ac2be358c",
    wpAPI: true,
    version: 'wc/v1'
})
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
export class HomePage extends React.Component<RouteComponentProps<any>,IState, Iform> {
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
       // this.props.history.push('/counter')
         WooCommerce.getAsync(`orders/${this.state.input.value}?filter[meta]=true`).then((result: any) => {
            const res =  JSON.parse(result.body);
         if (res.data && res.data.status === 404){

           this.props.history.push('/error', res)
         }
         }).error((err: any)=>{
           console.log(err)
         })
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

export default  (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
