import * as React from 'react';
import { Counter, IProps } from '../components/Counter';
import { RouteComponentProps } from 'react-router';

export class CounterPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  counterProps: IProps = { 
    counter: 50,
    reset: () => {
      console.log('click');
      
      this.counterProps.counter = 0;
    }
  }

  render() {
    setInterval(() => {
      if (this.counterProps.counter < 100)
        this.counterProps.counter += 10;
    }, 1000)
    return (<Counter counter={this.counterProps.counter} reset={this.counterProps.reset}></Counter>);
  }
}

export default (CounterPage as any as React.StatelessComponent<RouteComponentProps<any>>);