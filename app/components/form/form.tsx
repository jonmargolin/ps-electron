import * as React from 'react';
import Input from './../ui/input/input';
import { IButton, Button } from './../ui/button/button';
import { IInputChange } from '../ui/input/input.model';
let styles = require('./form.scss');

export interface IForm {
    input: IInputChange;
    button: IButton;
}

export  class Form extends React.Component<IForm> {
    constructor(props : IForm) {
        super(props);
    }
    render() {

        return (
            <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <Input
                        key={1}
                        elementType = {this.props.input.elementType}
                        elementConfig={this.props.input.elementConfig}
                        value={this.props.input.value}
                        invalid={this.props.input.invalid}
                        shouldValidate={this.props.input.shouldValidate.required}
                        touched={this.props.input.touched}
                        changed={ this.props.input.change}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Button
                        clicked = {this.props.button.submitOrder}>
                        submit </Button>
                </div>
            </div>
        )
    }
}
