import * as React from 'react';
import { RouteComponentProps } from 'react-router';
let styles = require('./layout.scss');

export class Layout extends React.Component<RouteComponentProps<any>> {
  
  render() {
    return (
      <div className={styles.homeContainer}>
        {this.props.children}
      </div>
    );
  }
}
