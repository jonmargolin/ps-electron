import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {Route, HashRouter as Router, Switch} from "react-router-dom";
import Iinput from '../../components/ui/input/module';
import {IState} from '../HomePage/module';
import Iform from '../../components/form/module';
import Error from '../../components/errors/error';
import Home from '../../components/Home';
import Counter from '../../components/Counter';
import WooCommerceApi from '../../utils/wooCommerceApi';
import RequestModule from '../../utils/requestModule';
import {FilePath} from '../../utils/module';


const Aux = (props: any) => {
    return props.children;
};
const inputFilde: Iinput = {
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
}

export class Layout extends React.Component <RouteComponentProps<any>, IState, Iform> {
    readonly state: IState = {input: inputFilde}
    inputChangedHandler = (event: any): void => {
        const input = {...this.state.input};
        input.value = event.target.value;
        input.touched = true;
        input.invalid = this.checkValidity(input.value, input.shouldValidate);
        this.setState({input: input});
    }
     // check  input validation
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
 // check order number if order number is invalid  change the route to error page
    //  if order number is valid get the product path form the json in the server. and crate array of product detailed.
    // Todo add loader  when submit  the order number.
    submitOrder = (): void => {
     const orderNumber: Promise<number | number[]>  =  WooCommerceApi.checkOrder(this.state.input.value);
        orderNumber.then(value => {
            // Todo crate  the error page and show the msg.
            if(value === 404 ) {
                this.props.history.replace('/error');
            }
            else {
                // Todo handel error respond of 404 and update the state when get the resound.
               const order : number[] = value as number[];
               const filePaths: FilePath [] = []
               order.forEach((order)=>{
                   const filePath : Promise<string > = RequestModule.getFilesPath(order);
                   filePath.then(data => {
                       filePaths.push(JSON.parse(data as string))
                   })
               })
            }
        });
    }
    render() {
        return (
            <Aux>
                <div>
                    <Router>
                        <Switch>
                            <Route exact path="/error" render={(props) => <Error  {...props} test={'test'}/>}/>
                            <Route path="/counter" component={Counter}/>
                            <Route path='/' render={(props) => <Home {...props} input={{
                                touched: this.state.input.touched,
                                shouldValidate: this.state.input.shouldValidate,
                                invalid: this.state.input.invalid,
                                value: this.state.input.value,
                                elementConfig: this.state.input.elementConfig,
                                elementType: this.state.input.elementType,
                                change: (event: any) => this.inputChangedHandler(event)
                            }} button={{submitOrder: () => this.submitOrder()}}/>}/>
                        </Switch>
                    </Router>
                </div>
            </Aux>
        )
    }
}

export default (Layout as any as React.StatelessComponent<RouteComponentProps<any>>);
