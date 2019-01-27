import * as React from 'react';
import { Counter, IProps } from '../components/Counter';
import { RouteComponentProps } from 'react-router';

interface State {
  counter: number;
  reset: () => void;
}

export class CounterPage extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      counter: 0,
      reset: this.reset
    }
  }

  reset = () => {
    this.setState({
      counter: 0
    });
  }

  updateCounter(counter: number) {
    this.setState({
      counter
    });
  }

  render() {
    setInterval(() => {
      if (this.state.counter < 100)
        this.updateCounter(this.state.counter + 1);
    }, 1000)
    return (
      <>
        <Counter counter={this.state.counter} reset={this.reset}></Counter>
      </>
    );
  }
}

export default (CounterPage as any as React.StatelessComponent<RouteComponentProps<any>>);