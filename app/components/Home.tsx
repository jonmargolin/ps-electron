import * as React from 'react';
import Form  from  './../components/form/form';
let styles = require('./Home.scss');

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.homeContainer}>
            <Form/>
      </div>
    );
  }
}
