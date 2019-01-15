import * as  React from 'react';
let styles = require( './button.scss');
const Button = (props:any) => (
    <button
        onChange={props.submit}
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked }>{props.children}</button>
)
export default Button;
