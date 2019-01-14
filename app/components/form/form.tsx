import * as React from 'react';
import Input from './../ui/input/input';
import Button from './../ui/button/button';
import {IProps} from '../Counter';
let styles = require('./form.scss');

const eltype = {type: 'text',
    placeholder: 'Your Name'}
    const validation = {
            required: true
        }
export interface IProps extends  React.Component<any>{}
export  class Form extends React.Component<any> {
    render() {
        return (
            <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <Input
                        key={1}
                        elementType={'input'}
                        elementConfig={eltype}
                        value={''}
                        invalid={true}
                        shouldValidate={validation}
                        touched={false}/>
                </div>
                <div className={styles.inputContainer}>
                    <Button>submit </Button>
                </div>
            </div>
        )
    }
}
export  default  Form
