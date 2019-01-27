import * as React from 'react';
import Form  from  './../components/form/form';
import Iform from './form/module';
let styles = require('./Home.scss');

export default class Home extends  React.Component<any> {
    constructor(props : Iform) {
        super(props);
    }
  render() {
    return (
      <div className={styles.homeContainer}>
            <Form
                input ={ this.props.input }
                button={this.props.button}
            />
      </div>
    );
  }
}
